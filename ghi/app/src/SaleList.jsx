import React, { useEffect, useState } from 'react';

function SaleList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
          const data = await response.json();
          setSales(Array.isArray(data.sales) ? data.sales : []);
        } else {
          console.error('Failed to fetch sales:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Sales</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Employee ID</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
              <td>{sale.salesperson.employee_id}</td>
              <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
              <td>{sale.automobile.vin}</td>
              <td>${sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SaleList;
