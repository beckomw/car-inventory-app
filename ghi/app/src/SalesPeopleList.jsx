import React, { useEffect, useState } from 'react';

function SalesPeopleList() {
  const [salesPeople, setSalesPeople] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchSalesPeople = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
          const data = await response.json();
          // Check if data is an array, if not, look for a salespeople property
          setSalesPeople(Array.isArray(data) ? data : data.salespeople || []);
        } else {
          console.error('Failed to fetch salespeople:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchSalesPeople();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Salespeople</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(salesPeople) && salesPeople.map((salesPerson) => (
            <tr key={salesPerson.employee_id}>
              <td>{salesPerson.employee_id}</td>
              <td>{salesPerson.first_name}</td>
              <td>{salesPerson.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPeopleList;
