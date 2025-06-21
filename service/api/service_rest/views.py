from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, AutomobileVO, Appointment
import json
import logging

# Create your views here.


# Serializer class to convert model instances to JSON
class TechnicianDetailEncoder:
    def encode(self, technician):
        return {
            "id": technician.id,
            "first_name": technician.first_name,
            "last_name": technician.last_name,
            "employee_id": technician.employee_id,
        }

class AutomobileDetailEncoder:
    def encode(self, automobile):
        return {
            "vin": automobile.vin,
            "sold": automobile.sold,
        }

class AppointmentDetailEncoder:
    def encode(self, appointment):
        return {
            "id": appointment.id,
            "date_time": appointment.date_time,
            "reason": appointment.reason,
            "status": appointment.status,
            "vin": appointment.vin,
            "customer": appointment.customer,
            "technician": appointment.technician.id,
        }

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": [technician_to_dict(technician) for technician in technicians]},
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(
                first_name=content["first_name"],
                last_name=content["last_name"],
                employee_id=content["employee_id"],
            )
            return JsonResponse(
                technician_to_dict(technician),
                safe=False,
                status=201,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            response = JsonResponse({"message": "Invalid JSON"})
            response.status_code = 400
            return response
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            response = JsonResponse({"message": f"Missing key: {str(e)}"})
            response.status_code = 400
            return response
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            response = JsonResponse({"message": "Could not create the technician"})
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_list_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": [automobile_to_dict(automobile) for automobile in automobiles]},
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.create(
                vin=content["vin"],
                sold=content["sold"],
            )
            return JsonResponse(
                automobile_to_dict(automobile),
                safe=False,
                status=201,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            response = JsonResponse({"message": "Invalid JSON"})
            response.status_code = 400
            return response
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            response = JsonResponse({"message": f"Missing key: {str(e)}"})
            response.status_code = 400
            return response
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            response = JsonResponse({"message": "Could not create the automobile"})
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": [appointment_to_dict(appointment) for appointment in appointments]},
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = get_object_or_404(Technician, id=content["technician"])
            appointment = Appointment.objects.create(
                date_time=content["date_time"],
                reason=content["reason"],
                status="created",
                vin=content["vin"],
                customer=content["customer"],
                technician=technician,
            )
            return JsonResponse(
                appointment_to_dict(appointment),
                safe=False,
                status=201,
            )
        except json.JSONDecodeError as e:
            logging.error(f"JSON decode error: {str(e)}")
            response = JsonResponse({"message": "Invalid JSON"})
            response.status_code = 400
            return response
        except Technician.DoesNotExist as e:
            logging.error(f"Technician does not exist: {str(e)}")
            response = JsonResponse({"message": "Technician not found"})
            response.status_code = 400
            return response
        except KeyError as e:
            logging.error(f"Missing key: {str(e)}")
            response = JsonResponse({"message": f"Missing key: {str(e)}"})
            response.status_code = 400
            return response
        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            response = JsonResponse({"message": "Could not create the appointment"})
            response.status_code = 400
            return response

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technician(request, pk):
    technician = get_object_or_404(Technician, id=pk)

    if request.method == "GET":
        return JsonResponse(TechnicianDetailEncoder().encode(technician), safe=False)

    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for key, value in content.items():
                setattr(technician, key, value)
            technician.save()
            return JsonResponse(TechnicianDetailEncoder().encode(technician), safe=False)
        except Exception as e:
            response = JsonResponse({"message": "Could not update the technician", "error": str(e)})
            response.status_code = 400
            return response

    elif request.method == "DELETE":
        technician.delete()
        return JsonResponse({"message": "Technician deleted successfully"}, status=204)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_automobile(request, vin):
    automobile = get_object_or_404(AutomobileVO, vin=vin)

    if request.method == "GET":
        return JsonResponse(AutomobileDetailEncoder().encode(automobile), safe=False)

    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for key, value in content.items():
                setattr(automobile, key, value)
            automobile.save()
            return JsonResponse(AutomobileDetailEncoder().encode(automobile), safe=False)
        except Exception as e:
            response = JsonResponse({"message": "Could not update the automobile", "error": str(e)})
            response.status_code = 400
            return response

    elif request.method == "DELETE":
        automobile.delete()
        return JsonResponse({"message": "Automobile deleted successfully"}, status=204)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, pk):
    appointment = get_object_or_404(Appointment, id=pk)

    if request.method == "GET":
        return JsonResponse(AppointmentDetailEncoder().encode(appointment), safe=False)

    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            technician = get_object_or_404(Technician, id=content["technician"])
            for key, value in content.items():
                setattr(appointment, key, value)
            appointment.technician = technician
            appointment.save()
            return JsonResponse(AppointmentDetailEncoder().encode(appointment), safe=False)
        except Technician.DoesNotExist as e:
            logging.error(f"Technician does not exist: {str(e)}")
            response = JsonResponse({"message": "Technician not found"})
            response.status_code = 400
            return response
        except Exception as e:
            response = JsonResponse({"message": "Could not update the appointment", "error": str(e)})
            response.status_code = 400
            return response

    elif request.method == "DELETE":
        appointment.delete()
        return JsonResponse({"message": "Appointment deleted successfully"}, status=204)

# @require_http_methods(["GET"])
# def api_list_locations(request):
#     locations = LocationVO.objects.all()
#     return JsonResponse({"locations": [location.to_dict() for location in locations]})

def technician_to_dict(technician):
    return {
        "id": technician.id,
        "first_name": technician.first_name,
        "last_name": technician.last_name,
        "employee_id": technician.employee_id,
    }

def automobile_to_dict(automobile):
    return {
        "vin": automobile.vin,
        "sold": automobile.sold,
    }

def appointment_to_dict(appointment):
    return {
        "id": appointment.id,
        "date_time": appointment.date_time,
        "reason": appointment.reason,
        "status": appointment.status,
        "vin": appointment.vin,
        "customer": appointment.customer,
        "technician": {
            "id": appointment.technician.id,
            "first_name": appointment.technician.first_name,
            "last_name": appointment.technician.last_name
        }
    }


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = get_object_or_404(Appointment, id=pk)

    try:
        # Update appointment status to 'canceled'
        appointment.status = 'canceled'
        appointment.save()
        return JsonResponse({"message": "Appointment canceled successfully"}, status=200)
    except Exception as e:
        logging.error(f"Error canceling appointment: {str(e)}")
        return JsonResponse({"error": "Failed to cancel appointment"}, status=400)

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = get_object_or_404(Appointment, id=pk)

    try:
        # Update appointment status to 'finished'
        appointment.status = 'finished'
        appointment.save()
        return JsonResponse({"message": "Appointment marked as finished successfully"}, status=200)
    except Exception as e:
        logging.error(f"Error marking appointment as finished: {str(e)}")
        return JsonResponse({"error": "Failed to mark appointment as finished"}, status=400)
