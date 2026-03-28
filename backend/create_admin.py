import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = 'admin'
password = 'admin123'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email='admin@example.com', password=password)
    print("Superuser created")
else:
    u = User.objects.get(username=username)
    u.set_password(password)
    u.save()
    print("Superuser password reset")
