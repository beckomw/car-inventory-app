from django.urls import path
from .views import (
    api_list_salespeople,
    api_show_salesperson,
    api_list_customers,
    api_show_customer,
    api_list_sales,
    api_show_sale,
    api_salesperson_history,  
)

urlpatterns = [
    # Salespeople endpoints
    path('salespeople/', api_list_salespeople, name="api_list_salespeople"),
    path('salespeople/<int:pk>/', api_show_salesperson, name="api_show_salesperson"),
    path('salespeople/<int:pk>/history/', api_salesperson_history, name='api_salesperson_history'),  # New endpoint

    # Customers endpoints
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:pk>/', api_show_customer, name="api_show_customer"),

    # Sales endpoints
    path('sales/', api_list_sales, name="api_list_sales"),
    path('sales/<int:pk>/', api_show_sale, name="api_show_sale"),
]
