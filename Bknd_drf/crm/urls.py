from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('totals/', views.dashboard_counters, name='dashboard-counters'),
    path("managers/", views.ManagerListCreateAPIView.as_view(), name="managers"),
    path("staffs/", views.StaffListCreateAPIView.as_view(), name="staffs"),
    path("customers/", views.CustomerListCreateAPIView.as_view(), name="customers"),
    path('departments/', DepartmentListCreateView.as_view(), name='departments'),
    path("staffs/<int:pk>/", StaffStatusUpdateAPIView.as_view(), name="staff-status-update"),
    path("managers/<int:pk>/", ManagerStatusUpdateAPIView.as_view(), name="staff-status-update"),
]

