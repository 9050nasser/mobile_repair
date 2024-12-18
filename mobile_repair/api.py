import frappe
import json
@frappe.whitelist()
def get_data(barcode):
    order = frappe.get_doc("Device Maintenance", barcode)
    return order

@frappe.whitelist()
def add_issue_row(barcode, issues, table):
    issues = json.loads(issues)
    order = frappe.get_doc("Device Maintenance", barcode)
    for issue in issues:
        order.append(table, {
            "issue_type": issue.get("item_code"),
            "description": issue.get("desc"),
            "notes": issue.get("notes"),
            "expected_cost": issue.get("cost")
        })
    order.save()

@frappe.whitelist()
def add_item_row(barcode, items, table, report, status):
    items = json.loads(items)
    order = frappe.get_doc("Device Maintenance", barcode)
    for item in items:
        order.append(table, {
            "item": item.get("item_code"),
            "qty": item.get("qty")
        })
    order.technician_report = report
    order.status = status
    order.save()

@frappe.whitelist()
def get_employee(user_id):
    employee = frappe.db.get_value("Employee", {"user_id": user_id}, "name")
    return employee
 