from django.contrib import admin
from .models import PurchaseRequest, PurchaseRequestItem, PurchaseOrder
from .models import Supplier

admin.site.register(PurchaseRequest)
admin.site.register(PurchaseRequestItem)
admin.site.register(PurchaseOrder)
admin.site.register(Supplier)