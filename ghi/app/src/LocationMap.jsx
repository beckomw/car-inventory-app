import React from 'react';

function LocationMap() {
  const handleDirectionsClick = () => {
    // Replace with your dealership coordinates
    const destination = "1233 E Camelback Rd, Phoenix, AZ 85014";

    // URL to open Google Maps with directions from current location to destination
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

    // Open the URL in a new tab/window
    window.open(mapsUrl, '_blank');
  };

  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.7330766970167!2d-112.05774987518232!3d33.50832114625656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12991f469ebd%3A0x4483d32151dc5dbb!2s1233%20E%20Camelback%20Rd%2C%20Phoenix%2C%20AZ%2085014!5e0!3m2!1sen!2sus!4v1722562052755!5m2!1sen!2sus"
        width="100%"
        height="300"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      ></iframe>
      <button className="btn btn-primary mt-3" onClick={handleDirectionsClick}>
        Get Directions
      </button>
    </div>
  );
}

export default LocationMap;
