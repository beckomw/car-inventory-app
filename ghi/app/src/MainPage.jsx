import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function MainPage() {
  const [showModal, setShowModal] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://s3-prod.autonews.com/s3fs-public/RETAIL03_180219982_AR_0_HNTMJQNLXHIG.jpg',
    'https://media.mauinow.com/file/mauinow/2021/11/Paula-Fuga-1-1024x533.png',
    'https://s3.amazonaws.com/subarumedia.iconicweb.com/mediasite/libraryImages/STL_PR_Compilation_Image_smaller__mid.jpg'
  ];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="px-4 py-1 my-5 mt-0 text-center p-0" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        {showModal && (
          <div
            id="modal"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90%'
              }}
            >
              <img
                src="https://prnewswire2-a.akamaihd.net/p/1893751/sp/189375100/thumbnail/entry_id/0_hmydnc94/def_height/2700/def_width/2700/version/100012/type/1" // Replace with your image URL
                alt="Pop-up"
                style={{ width: '100%', height: 'auto' }}
              />
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '5px',
                  cursor: 'pointer'
                }}
              >
                X
              </button>
            </div>
          </div>
        )}

        <div id="mainContent" style={{ display: showModal ? 'none' : 'block' }}>
          <div className="hero bg-light py-5">
            <div className="container text-center">
              <h2 className="display-4 fw-bold mb-4" style={{
                fontSize: '2.5rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' // Adjusted shadow color and size
              }}>
                Welcome to Subaru of Denver
              </h2>
              <p className="lead mb-4">The premiere solution for buying the Subaru of your dreams!</p>
            </div>
          </div>

          <div className="hero bg-light py-5 mt-4">
            <div className="container">
              <h2 className="display-5 fw-bold text-center mb-4">Share the love with Subaru</h2>
              <div
                id="slideshow"
                className="card mx-auto position-relative overflow-hidden"
                style={{
                  width: '100%',
                  maxWidth: '600px', // Set max width for slideshow
                  margin: 'auto', // Center slideshow
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Add card shadow
                  transition: 'transform 0.5s ease-in-out', // Smooth scaling effect
                }}
              >
                <img
                  src={slides[currentSlide]}
                  alt="Slide"
                  style={{
                    width: '100%',
                    height: 'auto',
                    transition: 'transform 0.5s ease-in-out', // Smooth scaling effect
                    borderRadius: '8px'
                  }}
                />
                <button
                  onClick={prevSlide}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    borderRadius: '50%'
                  }}
                >
                  &lt;
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    borderRadius: '50%'
                  }}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          <div className="hero bg-light py-5 mt-4">
            <div className="container">
              <h3 className="display-5 fw-bold text-center mb-4">Hours of Operation</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Opening Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>9:00 AM - 6:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <footer className="text-center mt-5">
            <p>We are committed to providing the best service during our operating hours. Please schedule an appointment with one of our technicians to ensure the best experience!</p>
          </footer>
        </div>
      </div>
      <style jsx>{`
        #slideshow:hover {
          transform: scale(1.45); /* Slightly enlarge the slideshow */
        }
      `}</style>
    </div>
  );
}

export default MainPage;
