import React from 'react';
import { FaCogs, FaUsers, FaGasPump } from 'react-icons/fa';

const VehicleCard = ({ car }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 h-100">
      {/* Vehicle Image */}
      <div className="text-center mb-3">
        <img 
          src={car.image || "https://via.placeholder.com/200x120"} 
          alt={car.model} 
          className="img-fluid" 
          style={{ maxHeight: '150px', objectFit: 'contain' }}
        />
      </div>

      {/* Title & Price */}
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <h6 className="fw-bold mb-0">{car.model}</h6>
          <small className="text-muted">{car.type}</small>
        </div>
        <div className="text-end">
          <p className="fw-bold mb-0 text-dark small">{car.price} <br/> <span className="text-muted fw-normal" style={{ fontSize: '10px' }}>Per day</span></p>
        </div>
      </div>

      {/* Specs Icons */}
      <div className="d-flex justify-content-between my-3 text-muted" style={{ fontSize: '12px' }}>
        <span className="d-flex align-items-center"><FaCogs className="me-1"/> {car.transmission}</span>
        <span className="d-flex align-items-center"><FaUsers className="me-1"/> {car.seats}</span>
        <span className="d-flex align-items-center"><FaGasPump className="me-1"/> {car.fuel}</span>
      </div>

      {/* Action Button */}
      <button className="btn btn-warning w-100 rounded-3 fw-bold py-2 shadow-sm" style={{ backgroundColor: '#D39E00', border: 'none' }}>
        Show Details
      </button>
    </div>
  );
};

export default VehicleCard;