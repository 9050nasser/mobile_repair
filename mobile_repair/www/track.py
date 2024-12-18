import frappe

def get_context(context):
    try:
        # Ensure `order` exists in `frappe.form_dict` and fetch it safely
        order = frappe.form_dict.get("order")
        if not order:
            raise ValueError("Order ID is not provided or invalid.")

        # Fetch the status field value for the specified order
        context.status = frappe.get_doc("Device Maintenance", order)
        if context.status is None:
            raise frappe.DoesNotExistError(f"Device Maintenance record for order {order} does not exist.")

    except frappe.DoesNotExistError as e:
        context.status = "not found"
        frappe.log_error(message=str(e), title="Device Maintenance Lookup Error")

    except Exception as e:
        context.status = "error"
        frappe.log_error(message=str(e), title="General Error in get_context")

    return context
