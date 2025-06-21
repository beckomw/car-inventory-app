import React, { useEffect, useState } from 'react';

const Models = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = 'http://localhost:8100/api/models/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonResponse = await response.json();
                console.log('Fetched data:', jsonResponse); // Debugging line
                setModels(jsonResponse.models);
            } catch (error) {
                console.error('Error fetching data:', error); // Debugging line
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ccc",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            color: "#333",
        }}>
            <h1 style={{color:"#898980"}}>Vehicle Models</h1>
            <ul style={{padding:"50px",}}>
                {models.map((model, index) => (
                    <li
                        key={model.id}
                        style={{
                            padding: "10px",
                            border: "1px solid blue",
                            borderRadius: "5px",
                            backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <img src={model.picture_url} alt={model.name} style={{ borderRadius: "5px", width: '100px', marginRight: '20px' }} />
                        <div>
                            <div>{model.name} (Model ID: {model.id})</div>
                            <div>Manufacturer: {model.manufacturer.name}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Models;
