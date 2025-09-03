



from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([AllowAny])
def main(request):

    urls = [
        "admin"
        "api/users/register",
        "api/users/login",
        "api/users/verify-token/"
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
