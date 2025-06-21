import React, { useEffect, useState } from 'react';

const Automobiles = () => {
    const [automobiles, setAutomobiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = 'http://localhost:8100/api/automobiles/';

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
                setAutomobiles(jsonResponse.autos);
            } catch (error) {
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
            <h1 style={{ color: "#898980" }}>Automobiles</h1>
            <ul style={{ padding: "50px", listStyleType: "none", paddingLeft: 0 }}>
                {automobiles.map((automobile, index) => (
                    <li
                        key={automobile.vin}
                        style={{
                            padding: "10px",
                            border: "1px solid blue",
                            borderRadius: "5px",
                            backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white',
                            display: 'flex',
                            flexDirection: 'row', // Align text and image horizontally
                            alignItems: 'center', // Vertically center the content
                            marginBottom: '10px'
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <div>VIN: {automobile.vin}</div>
                            <div>Color: {automobile.color}</div>
                            <div>Year: {automobile.year}</div>
                            <div>Model: {automobile.model.name}</div>
                            <div>Manufacturer: {automobile.model.manufacturer.name}</div>
                            <div>Sold: {automobile.sold ? "Yes":"No"}</div>
                        </div>
                        <img
                            src={automobile.model.picture_url}
                            alt={automobile.model.name}
                            style={{ 
                                borderRadius: "5px", // Rounded corners
                                width: '200px', // Fixed width
                                height: 'auto', // Maintain aspect ratio
                                marginLeft: 'auto' // Align image to the right
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Automobiles;
