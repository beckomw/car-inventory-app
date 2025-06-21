import React, { useState, useEffect } from 'react';

function RecordSaleForm() {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedAutomobile, setSelectedAutomobile] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAutomobiles();
    fetchSalespeople();
    fetchCustomers();
  }, []);

  const fetchAutomobiles = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAutomobiles(Array.isArray(data.autos) ? data.autos.filter(auto => !auto.sold) : []);
      } else {
        console.error('Failed to fetch automobiles:', response.status);
      }
    } catch (error) {
      console.error('Error fetching automobiles:', error);
    }
  };

  const fetchSalespeople = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalespeople(Array.isArray(data.salespeople) ? data.salespeople : []);
      } else {
        console.error('Failed to fetch salespeople:', response.status);
      }
    } catch (error) {
      console.error('Error fetching salespeople:', error);
    }
  };

  const fetchCustomers = async () => {
    const url = 'http://localhost:8090/api/customers/';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCustomers(Array.isArray(data.customers) ? data.customers : []);
      } else {
        console.error('Failed to fetch customers:', response.status);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedAutomobile || !selectedSalesperson || !selectedCustomer || !price) {
      setMessage('All fields are required');
      return;
    }

    const data = {
      automobile: selectedAutomobile,
      salesperson: parseInt(selectedSalesperson, 10),
      customer: parseInt(selectedCustomer, 10),
      price: parseFloat(price),
    };

    console.log('Sending data:', data); // for debugging

    const url = 'http://localhost:8090/api/sales/';
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
        setSelectedAutomobile('');
        setSelectedSalesperson('');
        setSelectedCustomer('');
        setPrice('');
        setMessage('Sale recorded successfully');
      } else {
        console.error('Response error:', responseData);
        setMessage(`Failed to record sale: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Failed to record sale: Network error');
    }
  }
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Record a New Sale</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="automobile" className="form-label">Automobile VIN</label>
                <select
                  id="automobile"
                  className="form-select"
                  value={selectedAutomobile}
                  onChange={(e) => setSelectedAutomobile(e.target.value)}
                  required
                >
                  <option value="">Choose an automobile VIN</option>
                  {Array.isArray(automobiles) && automobiles.map((auto) => (
                    <option key={auto.vin} value={auto.vin}>
                      {auto.vin}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="salesperson" className="form-label">Salesperson</label>
                <select
                  id="salesperson"
                  className="form-select"
                  value={selectedSalesperson}
                  onChange={(e) => setSelectedSalesperson(e.target.value)}
                  required
                >
                  <option value="">Choose a salesperson</option>
                  {Array.isArray(salespeople) && salespeople.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.first_name} {person.last_name} (ID: {person.employee_id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="customer" className="form-label">Customer</label>
                <select
                  id="customer"
                  className="form-select"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  required
                >
                  <option value="">Choose a customer</option>
                  {Array.isArray(customers) && customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <button type="submit" className="btn btn-primary">Record Sale</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}
export default RecordSaleForm;
