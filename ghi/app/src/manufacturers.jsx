import React, { useEffect, useState } from 'react';

const Manufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = 'http://localhost:8100/api/manufacturers/';

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
                setManufacturers(jsonResponse.manufacturers);
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
        <div className="container mt-4">
            <h1 className="text-center" style={{ color: "#898980" }}>Manufacturers we carry</h1>
            <ul className="list-group">
                {manufacturers.map((manufacturer) => (
                    <li className="list-group-item" key={manufacturer.id}>
                        {manufacturer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Manufacturers;
