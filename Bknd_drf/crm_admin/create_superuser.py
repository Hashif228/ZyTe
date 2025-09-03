import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crm_admin.settings")
django.setup()

User = get_user_model()

USERNAME = os.environ.get("DJANGO_SUPERUSER_USERNAME")
EMAIL = os.environ.get("DJANGO_SUPERUSER_EMAIL")
PASSWORD = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

if not User.objects.filter(username=USERNAME).exists():
    User.objects.create_superuser(
        username=USERNAME,
        email=EMAIL,
        password=PASSWORD
    )
    print(f"Superuser {USERNAME} created!")
else:
    print(f"Superuser {USERNAME} already exists.")
