from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('totals/', views.dashboard_counters, name='dashboard-counters'),
    path("managers/", views.ManagerListCreateAPIView.as_view(), name="managers"),
    path("staffs/", views.StaffListCreateAPIView.as_view(), name="staffs"),
    path("customers/", views.CustomerListCreateAPIView.as_view(), name="customers"),
    path('departments/', DepartmentListCreateView.as_view(), name='departments'),
    path("crm/staffs/<int:pk>/status/", StaffStatusUpdateAPIView.as_view(), name="staff-status-update"),
]

