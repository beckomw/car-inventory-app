import React, { useState, useEffect } from 'react';

function ServiceAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
          const data = await response.json();
          setAppointments(Array.isArray(data) ? data : data.appointments || []);
        } else {
          console.error('Failed to fetch appointments:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`;
      const fetchConfig = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        console.log(`Appointment with ID ${appointmentId} canceled successfully`);
        const updatedAppointments = appointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, status: 'canceled' } : appointment
        );
        setAppointments(updatedAppointments);
      } else {
        console.error('Error canceling appointment:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleFinishAppointment = async (appointmentId) => {
    try {
      const url = `http://localhost:8080/api/appointments/${appointmentId}/finish/`;
      const fetchConfig = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        console.log(`Appointment with ID ${appointmentId} marked as finished`);
        const updatedAppointments = appointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, status: 'finished' } : appointment
        );
        setAppointments(updatedAppointments);
      } else {
        console.error('Error marking appointment as finished:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const activeAppointments = appointments.filter(appointment =>
    appointment.status !== 'canceled' && appointment.status !== 'finished'
  );

  const renderAppointmentsTable = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(activeAppointments) && activeAppointments.map(appointment => {
            const dateTime = new Date(appointment.date_time);
            const date = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;
            const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            // Ensure technician is defined and has first_name and last_name
            const technicianName = appointment.technician
              ? `${appointment.technician.first_name} ${appointment.technician.last_name}`
              : 'Not Assigned';

            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                <td>{appointment.customer}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>{technicianName}</td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleFinishAppointment(appointment.id)}
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4">Service Appointments</h2>
      {renderAppointmentsTable()}
    </div>
  );
}

export default ServiceAppointments;
