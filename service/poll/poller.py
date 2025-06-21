import django
import os
import sys
import time
import traceback
import json
import requests

# Add your Django project's root directory to Python's path
sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import your Django models
from service_rest.models import AutomobileVO #noqa

def update_automobiles():
    try:
        print("Updating AutomobileVOs...")

        # Simulate fetching updated VINs from the Inventory service
        updated_vins = fetch_updated_vins_from_inventory()

        # Update AutomobileVOs in the database
        for vin in updated_vins:
            try:
                automobile = AutomobileVO.objects.get(vin=vin)
                automobile.sold = True  # Assuming marking as sold based on updated VINs
                automobile.save()
                print(f"AutomobileVO with VIN {vin} updated successfully.")
            except AutomobileVO.DoesNotExist:
                print(f"AutomobileVO with VIN {vin} not found in the database.")

    except Exception as e:
        traceback.print_exc()
        print(f"Error in updating AutomobileVOs: {e}", file=sys.stderr)

def fetch_updated_vins_from_inventory():
    # Simulate fetching updated VINs from the Inventory service
    # Replace this with actual API call or data retrieval logic
    return []


def poll():
    while True:
        print("Service poller polling for data...")
        try:
            update_automobiles()

        except Exception as e:
            traceback.print_exc()
            print(f"Error in poller: {e}", file=sys.stderr)

        time.sleep(60)

if __name__ == "__main__":
    poll()
