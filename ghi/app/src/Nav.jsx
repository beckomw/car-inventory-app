import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  const subaruLogoUrl = 'https://www.hsfn.org/wp-content/uploads/2021/11/png-transparent-subaru-legacy-car-subaru-impreza-subaru-wrx-subaru-text-trademark-logo.png'; // Replace with your actual image URL

  const navbarStyle = {
    backgroundColor: '#605770',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
    padding: '0 20px',
  };

  const logoStyle = {
    width: '40px',
    height: 'auto',
    borderRadius: '50%',
    border: '3px solid #605770',
  };

  const navLinkStyle = {
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#7a6f8f',
    transform: 'scale(1.05)',
  };

  const navListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src={subaruLogoUrl}
            alt="Subaru Logo"
            style={logoStyle}
          />
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={navListStyle}>
            {[
              { to: '/Manufacturers', text: 'Manufacturers' },
              { to: '/ManufacturersForm', text: 'Create Manufacturer' },
              { to: '/Models', text: 'Models' },
              { to: '/ModelsForm', text: 'Create a Model' },
              { to: '/Automobiles', text: 'Automobiles' },
              { to: '/AutomobilesForm', text: 'Create an Automobile' },
              { to: '/SalesPeopleList', text: 'Salespeople' },
              { to: '/AddSalesPersonForm', text: 'Add a Salesperson' },
              { to: '/CustomerList', text: 'Customers' },
              { to: '/AddCustomerForm', text: 'Add a Customer' },
              { to: '/SaleList', text: 'Sales List' },
              { to: '/RecordSaleForm', text: 'Add a Sale' },
              { to: '/SalespersonHistory', text: 'Sales History' },
              { to: '/TechniciansList', text: 'Technicians' },
              { to: '/AddTechnicianForm', text: 'Add a Technician' },
              { to: '/ServiceAppointments', text: 'Service Appointments' },
              { to: '/CreateServiceAppointmentForm', text: 'Create a Service Appointment' },
              { to: '/ServiceHistory', text: 'Service History' },
            ].map(({ to, text }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className="nav-link"
                  to={to}
                  style={navLinkStyle}
                  activeStyle={navLinkHoverStyle}
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
