from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Salesperson, Customer, Sale, AutomobileVO
import json
import logging

# Serializer classes to convert model instances to JSON
class SalespersonDetailEncoder:
    def encode(self, salesperson):
        return {
            "id": salesperson.id,
            "first_name": salesperson.first_name,
            "last_name": salesperson.last_name,
            "employee_id": salesperson.employee_id,
        }

class CustomerDetailEncoder:
    def encode(self, customer):
        return {
            "id": customer.id,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "address": customer.address,
            "phone_number": customer.phone_number,
        }

class SaleDetailEncoder:
    def encode(self, sale):
        return {
            "id": sale.id,
            "automobile": {
                "vin": sale.automobile.vin,
                "sold": sale.automobile.sold
            },
            "salesperson": {
                "id": sale.salesperson.id,
                "first_name": sale.salesperson.first_name,
                "last_name": sale.salesperson.last_name,
                "employee_id": sale.salesperson.employee_id,
            },
            "customer": {
                "id": sale.customer.id,
                "first_name": sale.customer.first_name,
                "last_name": sale.customer.last_name,
            },
            "price": str(sale.price),
        }

# View functions
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": [SalespersonDetailEncoder().encode(salesperson) for salesperson in salespeople]},
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(
                first_name=content["first_name"],
                last_name=content["last_name"],
                employee_id=content["employee_id"],
            )
            return JsonResponse(
                SalespersonDetailEncoder().encode(salesperson),
                safe=False,
                status=201,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            return JsonResponse({"message": f"Missing key: {str(e)}"}, status=400)
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"message": "Could not create the salesperson"}, status=400)

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": [CustomerDetailEncoder().encode(customer) for customer in customers]},
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(
                first_name=content["first_name"],
                last_name=content["last_name"],
                address=content["address"],
                phone_number=content["phone_number"],
            )
            return JsonResponse(
                CustomerDetailEncoder().encode(customer),
                safe=False,
                status=201,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            return JsonResponse({"message": f"Missing key: {str(e)}"}, status=400)
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"message": "Could not create the customer"}, status=400)

@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    sale = get_object_or_404(Sale, id=pk)
    if request.method == "GET":
        return JsonResponse(SaleDetailEncoder().encode(sale), safe=False)
    elif request.method == "DELETE":
        sale.delete()
        return JsonResponse({"message": "Sale deleted successfully"}, status=204)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):
    customer = get_object_or_404(Customer, id=pk)
    if request.method == "GET":
        return JsonResponse(CustomerDetailEncoder().encode(customer), safe=False)
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for key, value in content.items():
                setattr(customer, key, value)
            customer.save()
            return JsonResponse(CustomerDetailEncoder().encode(customer), safe=False)
        except Exception as e:
            return JsonResponse({"message": "Could not update the customer", "error": str(e)}, status=400)
    elif request.method == "DELETE":
        customer.delete()
        return JsonResponse({"message": "Customer deleted successfully"}, status=204)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_salesperson(request, pk):
    salesperson = get_object_or_404(Salesperson, id=pk)
    if request.method == "GET":
        return JsonResponse(SalespersonDetailEncoder().encode(salesperson), safe=False)
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for key, value in content.items():
                setattr(salesperson, key, value)
            salesperson.save()
            return JsonResponse(SalespersonDetailEncoder().encode(salesperson), safe=False)
        except Exception as e:
            return JsonResponse({"message": "Could not update the salesperson", "error": str(e)}, status=400)
    elif request.method == "DELETE":
        salesperson.delete()
        return JsonResponse({"message": "Salesperson deleted successfully"}, status=204)

@require_http_methods(["GET", "POST", "PUT"])
def api_list_sales(request):
    if request.method == "GET":
        salesperson_id = request.GET.get('salesperson_id')
        if salesperson_id:
            sales = Sale.objects.filter(salesperson_id=salesperson_id)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": [SaleDetailEncoder().encode(sale) for sale in sales]},
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            automobile = get_object_or_404(AutomobileVO, vin=content["automobile"])
            salesperson = get_object_or_404(Salesperson, id=content["salesperson"])
            customer = get_object_or_404(Customer, id=content["customer"])
            if automobile.sold:
                return JsonResponse({"message": "Automobile already sold"}, status=400)
            sale = Sale.objects.create(
                automobile=automobile,
                salesperson=salesperson,
                customer=customer,
                price=content["price"],
            )
            automobile.sold = True
            automobile.save()
            return JsonResponse(
                SaleDetailEncoder().encode(sale),
                safe=False,
                status=201,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            return JsonResponse({"message": f"Missing key: {str(e)}"}, status=400)
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"message": "Could not create the sale"}, status=400)
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            sale_id = content.get("id")
            sale = get_object_or_404(Sale, id=sale_id)
            automobile = get_object_or_404(AutomobileVO, vin=content["automobile"])
            salesperson = get_object_or_404(Salesperson, id=content["salesperson"])
            customer = get_object_or_404(Customer, id=content["customer"])
            if automobile.sold and automobile != sale.automobile:
                return JsonResponse({"message": "Automobile already sold"}, status=400)
            sale.automobile = automobile
            sale.salesperson = salesperson
            sale.customer = customer
            sale.price = content["price"]
            sale.save()
            if automobile != sale.automobile:
                sale.automobile.sold = True
                sale.automobile.save()
            return JsonResponse(
                SaleDetailEncoder().encode(sale),
                safe=False,
                status=200,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            return JsonResponse({"message": "Invalid JSON"}, status=400)
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            return JsonResponse({"message": f"Missing key: {str(e)}"}, status=400)
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"message": "Could not update the sale"}, status=400)

@require_http_methods(["GET"])
def api_salesperson_history(request, pk):
    try:
        salesperson = get_object_or_404(Salesperson, id=pk)
        sales = Sale.objects.filter(salesperson=salesperson)
        return JsonResponse({
            "salesperson": SalespersonDetailEncoder().encode(salesperson),
            "sales": [SaleDetailEncoder().encode(sale) for sale in sales],
        }, safe=False)
    except Salesperson.DoesNotExist:
        return JsonResponse({"error": "Salesperson not found"}, status=404)
