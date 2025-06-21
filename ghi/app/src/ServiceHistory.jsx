import React, { useState, useEffect } from 'react';

function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchVIN, setSearchVIN] = useState('');

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

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchVIN.trim().toLowerCase();
    if (searchTerm === '') {
      setFilteredAppointments([]);
    } else {
      const filtered = appointments.filter(appointment => appointment.vin.toLowerCase().includes(searchTerm));
      setFilteredAppointments(filtered);
    }
  };

  const renderAppointmentsTable = (appointments) => {
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(appointments) && appointments.map(appointment => {
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
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4">Service History</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by VIN"
            value={searchVIN}
            onChange={(e) => setSearchVIN(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
      {renderAppointmentsTable(searchVIN ? filteredAppointments : appointments)}
    </div>
  );
}

export default ServiceHistory;
