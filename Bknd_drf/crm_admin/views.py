



from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def main(request):
    urls = [
        "api/users/register",
        "api/users/login",
        "api/crm/totals",
        "api/crm/dashboard",
        "api/crm/managers",
        "api/crm/customers",
        "api/crm/staffs",
        "api/crm/departments",
    ]
    return Response({
        "message": "Available URLs",
        "urls": urls
    })
