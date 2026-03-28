import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_student():
    student_username = 'student1'
    student_password = 'student123'
    
    # Check if student exists
    if User.objects.filter(username=student_username).exists():
        print(f"Student '{student_username}' already exists. Password is likely '{student_password}'.")
        # Ensure password is reset to student123 just in case
        user = User.objects.get(username=student_username)
        user.set_password(student_password)
        # Ensure role is student if that field exists
        if hasattr(user, 'role'):
            user.role = 'student'
        user.save()
        print("Password reset successfully.")
        return

    # Create the student
    user = User.objects.create_user(
        username=student_username,
        email='student1@example.com',
        password=student_password
    )
    
    # Save student role if the custom user model supports it
    if hasattr(user, 'role'):
        user.role = 'student'
        user.save()
        
    print(f"Successfully created student account '{student_username}'.")

if __name__ == '__main__':
    create_student()
