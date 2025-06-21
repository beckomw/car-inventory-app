import React, { useState } from 'react';

const ManufacturersForm = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const url = 'http://localhost:8100/api/manufacturers/';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSuccess('Manufacturer added successfully!');
            setName(''); // Clear the form input
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
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
        }}>
            <h1 style={{ color: "#898980" }}>Add Manufacturer</h1>
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
                <button 
                    type="submit" 
                    style={{
                        position: 'relative',
                        border: 'none',
                        background: 'transparent',
                        padding: '0',
                        cursor: 'pointer',
                        outlineOffset: '4px',
                        transition: 'filter 250ms',
                        userSelect: 'none',
                        fontSize: '1.1rem',
                        borderRadius: '12px',
                    }}
                    className="button-82-pushable"
                >
                    <span style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px',
                        background: 'rgba(0, 0, 0, 0.25)',
                        transform: 'translateY(2px)',
                        transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
                    }}></span>
                    <span style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px',
                        background: 'linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%)',
                    }}></span>
                    <span style={{
                        display: 'block',
                        position: 'relative',
                        padding: '12px 27px',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        color: 'white',
                        background: 'hsl(345deg 100% 47%)',
                        transform: 'translateY(-4px)',
                        transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
                    }}>
                        {loading ? 'Adding...' : 'Add Manufacturer'}
                    </span>
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
        </div>
    );
};

export default ManufacturersForm;
