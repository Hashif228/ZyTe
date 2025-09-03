from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import *


urlpatterns = [
    path('totals/', views.dashboard_counters, name='dashboard-counters'),
    path("managers/", views.ManagerListCreateAPIView.as_view(), name="managers"),
    path("staffs/", views.StaffListCreateAPIView.as_view(), name="staffs"),
    path("customers/", views.CustomerListCreateAPIView.as_view(), name="customers"),
    path('departments/', DepartmentListCreateView.as_view(), name='departments')

]

