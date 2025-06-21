import React from 'react';

function OperationHours() {
  return (
    <div className="col-lg-12 text-center">
      <h2>Hours of Operation</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4">
          <h4>Sales</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Monday</td>
                <td>8:00 AM - 9:00 PM</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>8:00 AM - 9:00 PM</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>8:00 AM - 9:00 PM</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>8:00 AM - 9:00 PM</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>8:00 AM - 9:00 PM</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>8:00 AM - 8:00 PM</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>10:00 AM - 6:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <h4>Service</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Monday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>8:00 AM - 3:00 PM</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>CLOSED</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <h4>Courtesy Service</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Monday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>7:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>8:00 AM - 3:00 PM</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>CLOSED</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mt-4 justify-content-center align-items-center">
        <div className="col-md-12 text-center">
          <h4>Contact CarCar</h4>
        </div>
        <div className="col-md-12 text-center mt-2">
          <p className="mb-0">SALES: (602) 635-2559</p>
          <p className="mb-0">SERVICE: (602) 714-3120</p>
          <p className="mb-0">COMMERCIAL PARTS: (602) 248-7710</p>
          <p className="mb-0">NON-COMMERCIAL PARTS: (602) 798-2963</p>
        </div>
      </div>
    </div>
  );
}

export default OperationHours;

