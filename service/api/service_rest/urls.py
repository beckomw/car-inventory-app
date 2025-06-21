from django.urls import path
from .views import (
    api_list_technicians,
    api_show_technician,
    api_list_automobiles,
    api_show_automobile,
    api_list_appointments,
    api_show_appointment,
    api_cancel_appointment,
    api_finish_appointment,
)

urlpatterns = [
    # Technicians endpoints
    path('technicians/', api_list_technicians, name="api_list_technicians"),
    path('technicians/<int:pk>/', api_show_technician, name="api_show_technician"),

    # Automobiles endpoints
    path('automobiles/', api_list_automobiles, name="api_list_automobiles"),
    path('automobiles/<str:vin>/', api_show_automobile, name="api_show_automobile"),

    # Appointments endpoints
    path('appointments/', api_list_appointments, name="api_list_appointments"),
    path('appointments/<int:pk>/', api_show_appointment, name="api_show_appointment"),
    path('appointments/<int:pk>/cancel/', api_cancel_appointment, name="api_cancel_appointment"),
    path('appointments/<int:pk>/finish/', api_finish_appointment, name="api_finish_appointment"),
]
