from rest_framework import serializers
from .models import Customer, Manager, Staff, Department

class CustomerSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(use_url=True)

    class Meta:
        model = Customer
        fields='__all__'



class ManagerSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True) 

    class Meta:
        model = Manager
        fields = ['id', 'name', 'phone', 'email', 'team', 'created_at', 'department', 'department_name']


class StaffSerializer(serializers.ModelSerializer):
    manager_name = serializers.CharField(source="manager.name", read_only=True)
    manager = serializers.PrimaryKeyRelatedField(queryset=Manager.objects.all())

    class Meta:
        model = Staff
        fields = "__all__"

class StaffStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ["is_active"]


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"   