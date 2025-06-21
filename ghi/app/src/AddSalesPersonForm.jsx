import React, { useState } from 'react';

function AddSalesPersonForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    const url = 'http://localhost:8090/api/salespeople/';
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
        // Clear form inputs after successful submission
        setFirstName('');
        setLastName('');
        setEmployeeId('');
        // Set success message
        setMessage('Salesperson added successfully');
        console.log('Salesperson added successfully');
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
        // Handle error response
        setMessage('Failed to add salesperson');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch error
      setMessage('Failed to add salesperson');
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Add a Salesperson</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSalesPersonForm;
