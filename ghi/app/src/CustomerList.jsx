import React, { useEffect, useState } from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
          const data = await response.json();
          // Check if data is an array, if not, look for a customers property
          setCustomers(Array.isArray(data) ? data : data.customers || []);
        } else {
          console.error('Failed to fetch customers:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Customers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
