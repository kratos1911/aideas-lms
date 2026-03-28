import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from courses.models import Course, Module, Lesson

User = get_user_model()

def seed():
    try:
        admin_user = User.objects.get(username='admin')
    except User.DoesNotExist:
        print("Admin user does not exist. Please run createsuperuser first.")
        return

    # Check if courses already exist
    if Course.objects.filter(instructor=admin_user).exists():
        print("Courses already exist. Skipping seeding.")
        return

    # Create Course 1
    course1 = Course.objects.create(
        title="Python Backend _2601_10AM",
        description="Comprehensive Python Backend course covering Django, APIs, and Best Practices.",
        instructor=admin_user,
    )
    
    # Create Modules for Course 1
    c1_module1 = Module.objects.create(course=course1, title="Python Fundamentals", order=1)
    c1_module2 = Module.objects.create(course=course1, title="Django ORM Deep Dive", order=2)

    # Create Lessons for Modules (using content as a placeholder for links/topics)
    Lesson.objects.create(
        module=c1_module1, 
        title="02-Feb-26", 
        content="Introduction to Python Variables and Types.", 
        video_url="https://chatgpt.com/c/6985958f-75b8-83aa",
        order=1
    )
    Lesson.objects.create(
        module=c1_module1, 
        title="04-Feb-26", 
        content="Control Structures and Loops.", 
        video_url="https://chatgpt.com/c/6985958f-75b8-83aa",
        order=2
    )

    # Create Course 2
    course2 = Course.objects.create(
        title="React Advanced Front-End",
        description="Master React functional components, hooks, and advanced state management.",
        instructor=admin_user,
    )

    # Create Modules for Course 2
    c2_module1 = Module.objects.create(course=course2, title="Advanced Hooks", order=1)
    
    Lesson.objects.create(
        module=c2_module1, 
        title="10-Mar-26", 
        content="Deep Dive into useEffect.", 
        video_url="https://react.dev/reference/react/useEffect",
        order=1
    )

    print("Successfully seeded database with 2 courses and multiple modules/lessons.")

if __name__ == '__main__':
    seed()
