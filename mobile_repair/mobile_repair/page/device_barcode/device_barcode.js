frappe.pages['device-barcode'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Barcode Scan',
        single_column: true
    });



    $(page.body).html(`
        <div class="input-group mb-3">
        <div class="input-group-prepend">
        <button id="button" class="btn btn-outline-secondary" type="button">${__("Search")}</button>
        </div>
        <input id="barcode" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
        </div>
        <div>
            <button id="start-scanner" class="btn btn-primary">${__("Open Camera")}</button>
            <div id="scanned-data" style="margin-top: 20px;"></div>
        </div>

    `);

    // Initialize scanner when button is clicked
    $('#start-scanner').on('click', function () {
        const scanner = new frappe.ui.Scanner({
            dialog: true,          // Opens the scanner in a dialog
            multiple: false,       // Stops after scanning one value
            on_scan(data) {
                // handle_scanned_barcode(data.decodedText);
                get_order(data.decodedText)
            }
        });
    });

    // Function to handle scanned barcode data
    function handle_scanned_barcode(scannedData) {
        $('#scanned-data').html(`Scanned Code: <b>${scannedData}</b>`);
        frappe.msgprint(`Scanned Code: ${scannedData}`);

        frappe.set_route("Form", "Device Maintenance", scannedData)
        scanner.stop_scan();
    }
    function get_order(scannedData) {
        frappe.call({
            method: 'mobile_repair.api.get_data',
            args: {
                'barcode': scannedData
            },
            callback: function (r) {
                if (!r.exc) {
                    console.log(r.message)
                    // Check if r.message is an object
                    if (typeof r.message === 'object') {
                        let data = r.message;
                        // Create main table for the order data
                        let orderTable = `
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>${__("Order")}</th>
                                        <th>${__("Date")}</th>
                                        <th>${__("Expected Delivery Date")}</th>
                                        <th>${__("Customer")}</th>
                                        <th>${__("Serial No")}</th>
                                        <th>${__("Device")}</th>
                                        <th>${__("Attachments")}</th>
                                        <th>${__("Status")}</th>
                                        ${data.technician ? `<th>${__("Technician")}</th>` : ''}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${data.name}</td>
                                        <td>${data.date}</td>
                                        <td>${data.expected_delivery_date || ""}</td>
                                        <td>${data.customer}</td>
                                        <td>${data.device}</td>
                                        <td>${data.device_name}</td>
                                        <td>${data.attachments || ""}</td>
                                        <td>${__(data.status)}</td>
                                        ${data.technician ? `<td>${data.technician}</td>` : ''}
                                    </tr>
                                </tbody>
                            </table>
                        `;

                        // Create sub-table for issues
                        let issuesTable = `
                            <h3>${__("Issues:")}</h3>
                            <table class="table table-hover border="1">
                                <thead>
                                    <tr>
                                        <th>${__("Description")}</th>
                                        <th>${__("Notes")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;

                        // Loop through the issues and add rows to the table
                        data.issue.forEach(issue => {
                            issuesTable += `
                                <tr>
                                    <td>${issue.description}</td>
                                    <td>${issue.notes || __("No Notes")}</td>
                                </tr>
                            `;
                        });

                        issuesTable += `</tbody></table>`;
                        let startButton = "";
                        let issueButton = "";

                        if (data.status == "Completed") {

                            issueButton = __("<h2 style='color: red'><b><center>هذا الطلب مكتمل<center></b></h2>");
                        }


                        


                        if (data.status == "Not Started") {
                            startButton = `<br><button id="startButton" type="button" class="btn btn-primary">${__("Start Order")}</button>`;
                        }
                        if (data.status != "Completed" && data.status != "Not Started") {

                            issueButton = `<button id="addIssue" type="button" class="btn btn-warning">${__("Add Issue")}</button>`;
                        }

                        if (data.status != "Completed" && data.status != "Not Started") {
                            startButton = `<br><button id="deliverButton" type="button" class="btn btn-primary">${__("Deliver")}</button>`
                        }
                        if (data.status == "Delivered") {

                            issueButton = __("<h2 style='color: red'><b><center>تم تسليم الجهاز<center></b></h2>");
                            startButton =""
                        }
                        // Combine both tables and display in the HTML
                        $('#scanned-data').html(orderTable + issuesTable + startButton + issueButton);
                        $('#startButton').on('click', function (event) {
                            frappe.call({
                                method: 'mobile_repair.api.get_employee',
                                args: {
                                    user_id: frappe.session.user_email,
                                },
                                callback: function(res) {
                                    console.log(res)
                                    if (res.message) {
                                        frappe.call({
                                            method: 'frappe.client.set_value',
                                            args: {
                                                doctype: 'Device Maintenance',
                                                name: data.name,
                                                fieldname: {
                                                    technician: res.message,
                                                    status: "In Progress"
                                                }
                                            },
                                            callback: function(r) {
                                                if (!r.exc) {
                                                    get_order(data.name);
                                                    frappe.msgprint("تم تغيير حالة الطلب وتعيينك");
                                                } else {
                                                    frappe.msgprint("حدث خطأ أثناء تحديث الطلب.");
                                                }
                                            }
                                        });
                                    } else {
                                        frappe.msgprint("لا يوجد موظف مرتبط بهذا اليوزر.");
                                    }
                                }
                            });
                            
                            

                        });
                        $('#addIssue').on('click', function (event) {
                            issue_dia(data.name, "issue");

                        });
                        $('#deliverButton').on('click', function (event) {
                            dia(data.name, "items")
                        });

                    } else {
                        // If it's not an object, just display the message as is
                        $('#scanned-data').html(`<p>${r.message}</p>`);
                    }
                } else {
                    console.error('Error fetching order data:', r.exc);
                    $('#scanned-data').html('<p>Error fetching data. Please try again.</p>');
                }
            },
            error: function (err) {
                console.error('AJAX error:', err);
                $('#scanned-data').html('<p>Network error. Please check your connection.</p>');
            }
        });
    }

    function dia(name, table) {
        const dialog = new frappe.ui.Dialog({
            title: __("Select Items"),
            fields: [
                {
                    fieldname: "items",
                    fieldtype: "Table",
                    label: __("Items"),
                    in_place_edit: true,
                    reqd: 0,
                    fields: [
                        {
                            fieldname: "item_code",
                            label: __("Item"),
                            fieldtype: "Link",
                            options: "Item",
                            in_list_view: 1,
                            reqd: 1,
                            get_query: function () {
                                return {
                                    filters: {
                                        custom_maintenance_item: 1        // Example filter for active items
                                    },
                                };
                            },
                        },
                        {
                            fieldname: "qty",
                            label: __("Qty"),
                            fieldtype: "Float",
                            in_list_view: 1,
                            reqd: 1,
                            default: 1
                        }
                    ]
                },
                {
                    fieldname: "report",
                    fieldtype: "Small Text",
                    label: __("Technician Report"),
                    in_place_edit: true,
                    reqd: 1,
                }
            ],
            primary_action_label: __("Create"),
            primary_action: (values) => {
                frappe.call({
                    method: 'mobile_repair.api.add_item_row',
                    args: {
                        'barcode': name,
                        'items': values.items,
                        'table': table,
                        'report': values.report,
                        'status': "Completed"
                    },
                    callback: function (r) {
                        if (!r.exc) {
                            get_order(name)
                            
                        }
                    }
                });
                // frappe.call({
                //     doc: "Device Maintenance",
                //     method: "mobile_repair.doctype.device_maintenance.device_maintenance.make_stock_entry",
                //     callback: function (res) {
                //         if (!res.exc) {
                //             console.log("Stock Entry Done")
                //         }
                //     }

                // })
                dialog.hide()
            },
        });

        dialog.show()

    }
    function issue_dia(name, table) {
        const dialog = new frappe.ui.Dialog({
            title: __("Select Items"),
            fields: [
                {
                    fieldname: "issue_items",
                    fieldtype: "Table",
                    label: __("Items"),
                    in_place_edit: true,
                    reqd: 1,
                    fields: [
                        {
                            fieldname: "item_code",
                            label: __("Issue Type"),
                            fieldtype: "Link",
                            options: "Item",
                            in_list_view: 1,
                            reqd: 1,
                        },
                        {
                            fieldname: "desc",
                            label: __("Description"),
                            fieldtype: "Data",
                            in_list_view: 1,
                            reqd: 1,
                        },
                        {
                            fieldname: "notes",
                            label: __("Notes"),
                            fieldtype: "Data",
                            in_list_view: 1,
                            reqd: 0,
                        },
                        {
                            fieldname: "cost",
                            label: __("Expected Cost"),
                            fieldtype: "Currency",
                            in_list_view: 1,
                            reqd: 1,
                        }
                    ]
                },
            ],
            primary_action_label: __("Create"),
            primary_action: (values) => {
                console.log(values.issue_items)
                frappe.call({
                    method: 'mobile_repair.api.add_issue_row',
                    args: {
                        'barcode': name,
                        'issues': values.issue_items,
                        'table': table
                    },
                    callback: function (r) {
                        if (!r.exc) {
                            frappe.msgprint("تمت الاضافة بنجاح")
                            get_order(name)
                        }
                    }
                });

                dialog.hide()

            },
        });

        dialog.show()

    }



    $('#barcode').on('keypress', function (event) {
        if (event.key === 'Enter') {
            const inputData = $(this).val().trim();
            if (inputData) {
                // handle_scanned_barcode(inputData);
                get_order(inputData)
            }
        }
    });


    $('#button').on('click', function (event) {
        const inputData = $('#barcode').val().trim();
        if (inputData) {
            // handle_scanned_barcode(inputData);
            get_order(inputData)
        }

    });
}