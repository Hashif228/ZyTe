from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
import json
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.permissions import AllowAny

User = get_user_model()


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return JsonResponse({
                    "message": "Login successful",
                    "username": user.username,
                    "access": str(refresh.access_token), 
                    "refresh": str(refresh),            
                })
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Only POST allowed"}, status=405)



@csrf_exempt
def verify_token(request):
    auth = JWTAuthentication()
    header = auth.get_header(request)
    if header is None:
        return JsonResponse({"valid": False})
    raw_token = auth.get_raw_token(header)
    if raw_token is None:
        return JsonResponse({"valid": False})
    try:
        validated_token = auth.get_validated_token(raw_token)
        user = auth.get_user(validated_token)
        return JsonResponse({"valid": True, "username": user.username})
    except (InvalidToken, TokenError):
        return JsonResponse({"valid": False})
