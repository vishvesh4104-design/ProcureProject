from django.urls import path
from .views import (
    PurchaseRequestListCreateView,
    PurchaseRequestApproveView,
    PurchaseOrderCreateView,
    PurchaseOrderListView,
    PurchaseOrderDetailView,
    PurchaseOrderStatusUpdateView,
    DashboardView,
)

urlpatterns = [
    path('pr/', PurchaseRequestListCreateView.as_view()),
    path('pr/<int:pk>/approve/', PurchaseRequestApproveView.as_view()),
    path('pr/<int:pr_id>/create-po/', PurchaseOrderCreateView.as_view()),
    path('po/', PurchaseOrderListView.as_view()),
    path('po/<int:pk>/', PurchaseOrderDetailView.as_view()),
    path('po/<int:pk>/status/', PurchaseOrderStatusUpdateView.as_view()),
    path("dashboard/", DashboardView.as_view()),
]
