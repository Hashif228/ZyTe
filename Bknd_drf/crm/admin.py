from django.contrib import admin
from users.models import AdminUser 
from .models import Customer,Staff,Department,Manager



admin.site.register(AdminUser)
admin.site.register(Department)
admin.site.register(Manager)
admin.site.register(Staff)
admin.site.register(Customer)



