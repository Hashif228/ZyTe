from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CustomerSerializer, ManagerSerializer, StaffSerializer, DepartmentSerializer,StaffStatusSerializer
from rest_framework import generics, status
from rest_framework.generics import ListCreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q
from django.utils.dateparse import parse_date
from .models import Customer, Manager, Staff, Department
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser


@api_view(['GET'])
def dashboard_counters(request):
    data = {
        "totalManagers": Manager.objects.count(),
        "totalStaff": Staff.objects.count(),
        "totalCustomers": Customer.objects.count(),
        "totalDepartments": Department.objects.count(),
    }
    return Response(data)



class ManagerListAPIView(generics.ListAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer



class DepartmentListCreateView(ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    


class CustomerListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CustomerSerializer
    parser_classes = [MultiPartParser, FormParser] 
    def get_queryset(self):
        queryset = Customer.objects.all()
        search = self.request.query_params.get('search')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if search:
            queryset = queryset.filter(name__icontains=search)
        if start_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(start_date))
        if end_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(end_date))
        return queryset
    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StaffListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = StaffSerializer
    parser_classes = [MultiPartParser, FormParser]
    def get_queryset(self):
        queryset = Staff.objects.all()
        search = self.request.query_params.get('search')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search)
            )
        if start_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(start_date))
        if end_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(end_date))
        return queryset

    def post(self, request, *args, **kwargs):
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class ManagerListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ManagerSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]  # include JSONParser
    def get_queryset(self):
        queryset = Manager.objects.all()
        search = self.request.query_params.get('search')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search)
            )
        if start_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(start_date))
        if end_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(end_date))
        return queryset
    def post(self, request, *args, **kwargs):
        serializer = ManagerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StaffUpdateAPIView(generics.UpdateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffStatusSerializer
    http_method_names = ['patch']
