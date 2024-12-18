frappe.ui.form.on('Company', {
	refresh: function (frm) {
		frm.set_query("custom_spare_parts_warehouse", function() {
            return {
                "filters": {
                    "company": frm.doc.name
                }
            };
        });

	}
});