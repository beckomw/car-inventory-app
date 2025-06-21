import React, { useState, useEffect } from 'react';

function CreateServiceForm() {
  const [vin, setVIN] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [reason, setReason] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
          const data = await response.json();
          setTechnicians(Array.isArray(data) ? data : data.technicians || []);
        } else {
          console.error('Failed to fetch technicians:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!vin || !customerName || !date || !time || !technician || !reason) {
      setFormError('All fields are required.');
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    const data = {
      vin,
      customer: customerName,
      date_time: dateTime.toISOString(), // Send ISO string to backend
      technician: parseInt(technician), // Ensure technician ID is parsed as integer
      reason,
    };

    const url = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        console.log('Service appointment created successfully');
        // Clear form inputs after successful submission
        setVIN('');
        setCustomerName('');
        setDate('');
        setTime('');
        setTechnician('');
        setReason('');
        setFormError('');
        // Handle successful creation (e.g., redirect, show success message)
      } else {
        const errorData = await response.json(); // server returns JSON error details
        console.error('Error:', response.status, errorData);
        setFormError(`Error: ${response.status} ${errorData.message || 'Unknown error'}`);
        // Handle error response (e.g., show error message)
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setFormError('Fetch error: Unable to connect to the server.');
      // Handle fetch error (e.g., show error message)
    }
  };

  const getTechnicianFullName = (techId) => {
    const selectedTech = technicians.find(tech => tech.id === parseInt(techId));
    if (selectedTech) {
      return `${selectedTech.first_name} ${selectedTech.last_name}`;
    }
    return '';
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    const startTime = 8; // 8 AM
    const endTime = 17; // 5 PM

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) { // 30-minute intervals
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeString = `${formattedHour}:${formattedMinute}`;
        timeOptions.push(
          <option key={timeString} value={timeString}>{timeString}</option>
        );
      }
    }

    return timeOptions;
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Create a Service Appointment</h2>
            <form onSubmit={handleSubmit}>
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="vin" className="form-label">VIN</label>
                <input
                  type="text"
                  className="form-control"
                  id="vin"
                  value={vin}
                  onChange={(e) => setVIN(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">Time</label>
                <select
                  className="form-select"
                  id="time"
                  value={time}
                  onChange={handleTimeChange}
                  required
                >
                  <option value="">Choose a time</option>
                  {generateTimeOptions()}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="technician" className="form-label">Assigned Technician</label>
                {loading ? (
                  <p>Loading technicians...</p>
                ) : (
                  <select
                    className="form-select"
                    id="technician"
                    value={technician}
                    onChange={(e) => setTechnician(e.target.value)}
                    required
                  >
                    <option value="">Choose a technician</option>
                    {technicians.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.first_name} {tech.last_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="reason" className="form-label">Reason for Service</label>
                <textarea
                  className="form-control"
                  id="reason"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateServiceForm;
