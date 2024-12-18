# Copyright (c) 2024, Mohammed Nasser and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class Device(Document):
	def autoname(self):
		self.title = f"{self.brand} {self.model}"

		if self.imei:
			self.name = self.imei
		else:
			self.name = f"{self.brand} {self.model}"
