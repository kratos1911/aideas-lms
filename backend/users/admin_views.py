from rest_framework import views, permissions, status, generics
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from courses.models import Course, Enrollment
from .serializers import UserSerializer

User = get_user_model()

class AdminStatsView(views.APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_students = User.objects.filter(role='student').count()
        total_teachers = User.objects.filter(role='teacher').count()
        total_courses = Course.objects.count()
        total_enrollments = Enrollment.objects.count()
        
        return Response({
            'total_students': total_students,
            'total_teachers': total_teachers,
            'total_courses': total_courses,
            'total_enrollments': total_enrollments,
        })

class AdminStudentListView(generics.ListAPIView):
    queryset = User.objects.filter(role='student')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
