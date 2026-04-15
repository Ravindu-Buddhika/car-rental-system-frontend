import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCar } from 'react-icons/fa';

const Navbar = ({ role }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* Logo - d-flex and align-items-center added */}
        <Link className="navbar-brand fw-bold d-flex align-items-center m-0" to="/" style={{ fontSize: '1.4rem' }}>
          <FaCar className="me-2" style={{ color: '#000' }} /> 
          <span style={{ color: '#000' }}>Drive</span>
          <span style={{ color: '#D39E00' }}>ME</span>
        </Link>

        {/* Mobile Toggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {role === 'customer' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3 fw-medium text-dark" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 fw-medium text-dark" to="/cars">Vehicle</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 fw-medium text-dark" to="/about">About us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 fw-medium text-dark" to="/contact">Contact us</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Profile Icon - d-flex added to keep it centered with others */}
        <div className="d-flex align-items-center">
          <Link to="/profile" className="text-dark fs-4 d-flex align-items-center">
            <FaUserCircle />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;