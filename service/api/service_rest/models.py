from django.db import models

# Create your models here.

# Technician model
class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# AutomobileVO model
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)  # Assuming VINs are 17 characters long
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"AutomobileVO - VIN: {self.vin}, Sold: {self.sold}"

# Appointment model
class Appointment(models.Model):
    STATUS_CHOICES = (
        ('created', 'Created'),
        ('canceled', 'Canceled'),
        ('finished', 'Finished'),
    )

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='created')
    vin = models.CharField(max_length=17)  # Assuming VINs are stored as strings
    customer = models.CharField(max_length=255)  # Assuming customer's name stored as a string
    technician = models.ForeignKey(
        Technician,
        on_delete=models.CASCADE,
        related_name='appointments'
    )

    def __str__(self):
        return f"Appointment - ID: {self.id}, VIN: {self.vin}, Technician: {self.technician}"

    def to_dict(self):
        return {
            "id": self.id,
            "date_time": self.date_time,
            "reason": self.reason,
            "status": self.status,
            "vin": self.vin,
            "customer": self.customer,
            "technician": f"{self.technician.first_name} {self.technician.last_name}"
        }
