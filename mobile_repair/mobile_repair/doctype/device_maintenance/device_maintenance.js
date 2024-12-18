// Copyright (c) 2024, Mohammed Nasser and contributors
// For license information, please see license.txt

frappe.ui.form.on('Device Maintenance', {
	refresh: function (frm) {
		invoiceButton(frm)

	},
	issue(frm) {
		calculate_total(frm)
	},
	validate(frm) {
		calculate_total(frm)
	},
	on_submit(frm) {
		openLinksSequentially(frm)
	}
});

function invoiceButton(frm) {
	frm.add_custom_button(__('Sales Invoice'), function () {
		if (frm.doc.issue && frm.doc.issue.length > 0 && frm.doc.docstatus == 1) {
			frappe.call({
				method: 'frappe.client.insert',
				args: {
					doc: {
						doctype: 'Sales Invoice',
						company: frm.doc.company,
						customer: frm.doc.customer,
						items:
							frm.doc.issue.map(function (item) {
								return {
									item_code: item.issue_type, // Ensure this maps to an actual item code
									qty: 1, // Default quantity for each item
									rate: item.expected_cost, // Map the expected cost field
									description: item.description
								};
							})




					},
				},
				callback: function (r) {
					frappe.call({
						method: "make_stock_entry",
						doc: frm.doc,
						callback: function(res) {
						   console.log(res.message)
						}
					});
					frappe.set_route("Form", "Sales Invoice", r.message.name)

				}
			});
			frm.set_value("status", "Delivered")
			frm.save("Update")
		} else {
			frappe.msgprint(__('No items to add in the Sales Invoice.'));
		}
	});
}


function openLinksSequentially(frm) {
	// Open the first link
	const firstWindow = window.open(
		`/printview?doctype=Device%20Maintenance&name=${frm.doc.name}&trigger_print=1&format=Device%20Barcode&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=ar`,
		'_blank'
	);

	if (firstWindow) {
		// Wait for the first window to close
		const checkInterval = setInterval(() => {
			if (firstWindow.closed) {
				clearInterval(checkInterval); // Stop checking
				// Open the second link
				window.open(
					`/printview?doctype=Device%20Maintenance&name=${frm.doc.name}&trigger_print=1&format=Reciept&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=ar`,
					'_blank'
				);
			}
		}, 500); // Check every 500ms
	} else {
		console.error('Failed to open the first window, possibly blocked by a popup blocker.');
	}
}



frappe.ui.form.on('Maintenance Details Table', {
	issue_add(frm, cdt, cdn) {
		calculate_total(frm)
	}
});


function calculate_total(frm) {
	let total = 0
	frm.doc.issue.forEach(function (row) {
		total += row.expected_cost
		frm.set_value("total_cost", total)
		frm.refresh_field("total_cost")
	})
}
