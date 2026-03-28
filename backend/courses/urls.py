from django.urls import path
from .views import CourseListView, StudentDashboardView, CourseDetailView, AdminCourseListCreateView, AdminCourseDetailView

urlpatterns = [
    path('', CourseListView.as_view(), name='course_list'),
    path('dashboard/', StudentDashboardView.as_view(), name='student_dashboard'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('admin/', AdminCourseListCreateView.as_view(), name='admin_course_list'),
    path('admin/<int:pk>/', AdminCourseDetailView.as_view(), name='admin_course_detail'),
]
