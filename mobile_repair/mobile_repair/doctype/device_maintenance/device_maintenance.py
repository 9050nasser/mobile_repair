# Copyright (c) 2024, Mohammed Nasser and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today, now
from frappe import _

class DeviceMaintenance(Document):
    @frappe.whitelist()
    def make_stock_entry(self):
        if self.items and not self.stock_entry:
            if not self.spare_parts_warehouse:
                frappe.throw(_("Please specify the Spare Parts Warehouse"))
            if not self.company:
                frappe.throw(_("Please specify the Company"))
            
            for itema in self.items:
                if not itema.item:
                    frappe.throw(_("Item code is missing for one of the entries"))
                if not itema.qty or itema.qty <= 0:
                    frappe.throw(_("Quantity must be greater than 0 for item {0}").format(itema.item))
            
            try:
                stock_entry = frappe.get_doc({
                    "doctype": "Stock Entry",
                    "company": self.company,
                    "stock_entry_type": "Material Issue",
                    "custom_device_maintenance_order": self.name,
                    "items": [
                    {
                        "s_warehouse": self.spare_parts_warehouse,
                        "item_code": item_data.item,
                        "qty": item_data.qty,
                        "allow_zero_valuation_rate": 1
                    }
                    for item_data in self.items
                    ]
                })
                stock_entry.insert(ignore_permissions=True)
                stock_entry.submit()
                frappe.db.commit()

            except Exception as e:
                frappe.db.rollback()
                frappe.log_error(frappe.get_traceback(), "Stock Entry Creation Error")
                frappe.throw(_("An error occurred while creating the Stock Entry: {0}").format(str(e)))
    