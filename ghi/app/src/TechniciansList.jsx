import React, { useEffect, useState } from 'react';

function TechniciansList() {
  const [technicians, setTechnicians] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
          const data = await response.json();
          // Check if data is an array, if not, look for a technicians property
          setTechnicians(Array.isArray(data) ? data : data.technicians || []);
        } else {
          console.error('Failed to fetch technicians:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <div className="container mt-4">
      <h2>List of Technicians</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(technicians) && technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.employee_id}</td>
              <td>{technician.first_name}</td>
              <td>{technician.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TechniciansList;
