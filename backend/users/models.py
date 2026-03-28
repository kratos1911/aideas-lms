from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    IS_STUDENT = 'student'
    IS_TEACHER = 'teacher'
    IS_ADMIN = 'admin'
    
    ROLE_CHOICES = [
        (IS_STUDENT, 'Student'),
        (IS_TEACHER, 'Teacher'),
        (IS_ADMIN, 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=IS_STUDENT)
    
    # Metadata
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
