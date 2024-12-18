app_name = "mobile_repair"
app_title = "Mobile Repair"
app_publisher = "Mohammed Nasser"
app_description = "Mobile Repair Module"
app_email = "nasser@nasserx.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/mobile_repair/css/mobile_repair.css"
# app_include_js = "/assets/mobile_repair/js/mobile_repair.js"

# include js, css files in header of web template
# web_include_css = "/assets/mobile_repair/css/mobile_repair.css"
# web_include_js = "/assets/mobile_repair/js/mobile_repair.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "mobile_repair/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Company" : "public/js/company.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "mobile_repair.utils.jinja_methods",
# 	"filters": "mobile_repair.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "mobile_repair.install.before_install"
# after_install = "mobile_repair.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "mobile_repair.uninstall.before_uninstall"
# after_uninstall = "mobile_repair.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "mobile_repair.utils.before_app_install"
# after_app_install = "mobile_repair.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "mobile_repair.utils.before_app_uninstall"
# after_app_uninstall = "mobile_repair.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "mobile_repair.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"mobile_repair.tasks.all"
# 	],
# 	"daily": [
# 		"mobile_repair.tasks.daily"
# 	],
# 	"hourly": [
# 		"mobile_repair.tasks.hourly"
# 	],
# 	"weekly": [
# 		"mobile_repair.tasks.weekly"
# 	],
# 	"monthly": [
# 		"mobile_repair.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "mobile_repair.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "mobile_repair.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "mobile_repair.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["mobile_repair.utils.before_request"]
# after_request = ["mobile_repair.utils.after_request"]

# Job Events
# ----------
# before_job = ["mobile_repair.utils.before_job"]
# after_job = ["mobile_repair.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"mobile_repair.auth.validate"
# ]
