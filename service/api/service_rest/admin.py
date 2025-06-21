from django.contrib import admin
from .models import Technician, AutomobileVO, Appointment

# Register your models here.

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'employee_id')
    search_fields = ('first_name', 'last_name', 'employee_id')

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ('vin', 'sold')
    search_fields = ('vin',)
    list_filter = ('sold',)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_time', 'reason', 'status', 'vin', 'customer', 'technician')
    search_fields = ('vin', 'customer', 'technician__first_name', 'technician__last_name')
    list_filter = ('status', 'date_time')
    autocomplete_fields = ['technician']
