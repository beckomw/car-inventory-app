import React, { useState, useEffect } from 'react';

const AutomobileForm = () => {
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [modelId, setModelId] = useState('');
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:8100/api/models/');
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await response.json();
        setModels(data.models);
      } catch (error) {
        setError('Failed to fetch models. Please try again.');
      }
    };

    fetchModels();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { color, year: parseInt(year), vin, model_id: parseInt(modelId) };

    try {
      const response = await fetch('http://localhost:8100/api/automobiles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create automobile');
      }

      setSuccess('Automobile created successfully');
      setColor('');
      setYear('');
      setVin('');
      setModelId('');
      setError(null);
    } catch (error) {
      setError('Failed to create automobile. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a New Automobile</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                value={color}
                onChange={e => setColor(e.target.value)}
                placeholder="Color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="Year"
                required
                type="number"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={vin}
                onChange={e => setVin(e.target.value)}
                placeholder="VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select
                value={modelId}
                onChange={e => setModelId(e.target.value)}
                required
                name="model"
                id="model"
                className="form-select"
              >
                <option value="">Choose a model</option>
                {models.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AutomobileForm;
