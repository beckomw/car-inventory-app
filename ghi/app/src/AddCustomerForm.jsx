import React, { useState } from 'react';

function AddCustomerForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data according to the expected JSON format
    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber,
    };

    const url = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, fetchConfig);
      const responseData = await response.json();

      if (response.ok) {
        // Clear form inputs after successful submission
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
        // Set success message
        setMessage('Customer added successfully');
        console.log('Customer added successfully');
      } else {
        console.error('Error:', responseData); // Log the response data for debugging
        setMessage('Failed to add customer');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Failed to add customer');
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Add a Customer</h2>
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
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

export default AddCustomerForm;
