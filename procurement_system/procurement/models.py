from django.db import models
from django.conf import settings
from inventory.models import InventoryItem

User = settings.AUTH_USER_MODEL

class PurchaseRequest(models.Model):

    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PENDING', 'Pending Approval'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    requested_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='purchase_requests'
    )
    department = models.CharField(max_length=100)
    total_estimated_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='DRAFT'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"PR-{self.id} ({self.status})"


class PurchaseRequestItem(models.Model):
    purchase_request = models.ForeignKey(
        PurchaseRequest,
        on_delete=models.CASCADE,
        related_name='items'
    )
    item = models.ForeignKey(
        InventoryItem,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()
    estimated_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.item.name} x {self.quantity}"

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact_email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name


class PurchaseOrder(models.Model):
    purchase_request = models.OneToOneField(
        PurchaseRequest,
        on_delete=models.CASCADE,
        related_name="purchase_order"
    )
    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.PROTECT,
        null=True,   # important
        blank=True
    )
    final_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        default="CREATED"
    )



