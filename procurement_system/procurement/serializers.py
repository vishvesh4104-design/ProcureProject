from rest_framework import serializers
from .models import (
    PurchaseRequest,
    PurchaseRequestItem,
    PurchaseOrder
)
from inventory.models import InventoryItem

class PurchaseRequestItemSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source='item.name')

    class Meta:
        model = PurchaseRequestItem
        fields = [
            'id',
            'item',
            'item_name',
            'quantity',
            'estimated_price'
        ]

class PurchaseRequestSerializer(serializers.ModelSerializer):
    items = PurchaseRequestItemSerializer(many=True, write_only=True)
    requested_by_username = serializers.ReadOnlyField(
        source='requested_by.username'
    )

    class Meta:
        model = PurchaseRequest
        fields = [
    'id',
    'requested_by_username',
    'department',
    'total_estimated_cost',
    'status',
    'created_at',
    'items'
]

        read_only_fields = [
    'status',
    'total_estimated_cost',
    'created_at'
]



    def create(self, validated_data):
    # get request safely
        request = self.context.get('request')

        if request is None or request.user.is_anonymous:
           raise serializers.ValidationError("Authentication required")

    # extract nested items
        items_data = validated_data.pop('items')

    # create purchase request
        purchase_request = PurchaseRequest.objects.create(
           requested_by=request.user,
           department=validated_data.get('department')
    )

        total_cost = 0
        for item_data in items_data:
           quantity = item_data['quantity']
           estimated_price = item_data['estimated_price']
           total_cost += quantity * estimated_price

           PurchaseRequestItem.objects.create(
               purchase_request=purchase_request,
               item=item_data['item'],
               quantity=quantity,
               estimated_price=estimated_price
        )

        purchase_request.total_estimated_cost = total_cost
        purchase_request.status = 'PENDING'
        purchase_request.save()

        return purchase_request



class PurchaseOrderSerializer(serializers.ModelSerializer):
    supplier_name = serializers.ReadOnlyField(source="supplier.name")

    class Meta:
        model = PurchaseOrder
        fields = [
            "id",
            "purchase_request",
            "supplier_name",
            "final_cost",
            "status",
        ]

        read_only_fields = [
            'status',
            'created_at'
        ]
