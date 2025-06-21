from django.contrib import admin
from .models import Salesperson, Customer, Sale, AutomobileVO

# Register your models here.

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'employee_id']
    search_fields = ['first_name', 'last_name', 'employee_id']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'address', 'phone_number']
    search_fields = ['first_name', 'last_name', 'address', 'phone_number']

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['automobile', 'salesperson', 'customer', 'price']
    search_fields = ['automobile__vin', 'salesperson__first_name', 'salesperson__last_name',
                     'customer__first_name', 'customer__last_name']
    list_filter = ['salesperson', 'customer']

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ['vin', 'sold']
    search_fields = ['vin']
    list_filter = ['sold']
