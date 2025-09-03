from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from rest_framework import generics
from .serializers import RegisterSerializer,LoginSerializer
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
User = get_user_model()


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

@csrf_exempt
class LoginView(APIView):
    permission_classes = [AllowAny]  # public access

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "username": user.username,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

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
