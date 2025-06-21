import React, { useState, useEffect } from 'react';

function SalespersonHistory() {
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    fetchSalespeople();
  }, []);

  useEffect(() => {
    if (selectedSalesperson) {
      fetchSalesHistory(selectedSalesperson);
    } else {
      setSalesHistory([]);
    }
  }, [selectedSalesperson]);

  const fetchSalespeople = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/salespeople/');
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salespeople);
      } else {
        console.error('Failed to fetch salespeople');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSalesHistory = async (salespersonId) => {
    try {
      const response = await fetch(`http://localhost:8090/api/sales/?salesperson_id=${salespersonId}`);
      if (response.ok) {
        const data = await response.json();
        setSalesHistory(data.sales);
      } else {
        console.error('Failed to fetch sales history');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSalespersonChange = (event) => {
    setSelectedSalesperson(event.target.value);
  };

  return (
    <div className="container mt-4">
      <h1>Salesperson History</h1>
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedSalesperson}
          onChange={handleSalespersonChange}
        >
          <option value="">Select a salesperson</option>
          {salespeople.map(person => (
            <option key={person.id} value={person.id}>
              {person.first_name} {person.last_name}
            </option>
          ))}
        </select>
      </div>
      {selectedSalesperson && (
        <div>
          {salesHistory.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Salesperson</th>
                  <th>Customer</th>
                  <th>VIN</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {salesHistory.map(sale => (
                  <tr key={sale.id}>
                    <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                    <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>${sale.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Sales</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SalespersonHistory;
