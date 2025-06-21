import React, { useState, useEffect } from 'react';

const ModelsForm = () => {
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const modelsUrl = 'http://localhost:8100/api/models/';
    const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';

    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await fetch(manufacturersUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch manufacturers');
                }
                const data = await response.json();
                setManufacturers(data.manufacturers);
            } catch (error) {
                console.error('Error fetching manufacturers:', error);
            }
        };

        fetchManufacturers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(modelsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, picture_url: pictureUrl, manufacturer_id: manufacturerId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSuccess('Model added successfully!');
            setName('');
            setPictureUrl('');
            setManufacturerId('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ccc",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            color: "#333",
        }}>
            <h1 style={{ color: "#898980" }}>Add Model</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="name" style={{ marginBottom: '10px' }}>
                    Name:
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            marginLeft: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </label>
                <label htmlFor="picture_url" style={{ marginBottom: '10px' }}>
                    Picture URL:
                    <input
                        type="text"
                        id="picture_url"
                        value={pictureUrl}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        required
                        style={{
                            marginLeft: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </label>
                <label htmlFor="manufacturer_id" style={{ marginBottom: '10px' }}>
                    Manufacturer:
                    <select
                        id="manufacturer_id"
                        value={manufacturerId}
                        onChange={(e) => setManufacturerId(e.target.value)}
                        required
                        style={{
                            marginLeft: '10px',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <option value="">Select a manufacturer</option>


                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" style={{
                    padding: '10px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    {loading ? 'Adding...' : 'Add Model'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
        </div>
    );
};

export default ModelsForm;
