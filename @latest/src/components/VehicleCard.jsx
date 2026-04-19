import React from 'react';
import { FaCogs, FaUsers, FaGasPump } from 'react-icons/fa';

const VehicleCard = ({ car, onShowDetails }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 h-100">
      <div className="text-center mb-3">
        <img
          /* car.image_url වෙනුවට car.imageUrl */
          src={car.imageUrl
            ? `http://localhost:8080/uploads/cars/${car.imageUrl}`
            : "https://via.placeholder.com/200x120"}
          alt={car.carModel}
          className="img-fluid"
          style={{ maxHeight: '150px', objectFit: 'contain' }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          {/* car.car_model වෙනුවට car.carModel */}
          <h6 className="fw-bold mb-0">{car.carModel}</h6>
          {/* car.category?.category_name වෙනුවට car.categoryName */}
          <small className="text-muted">{car.categoryName || 'Vehicle'}</small>
        </div>
        <div className="text-end">
          <p className="fw-bold mb-0 text-dark small">
            {/* car.daily_rate වෙනුවට car.dailyRate */}
            LKR {car.dailyRate?.toLocaleString()} <br />
            <span className="text-muted fw-normal" style={{ fontSize: '10px' }}>Per day</span>
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-between my-3 text-muted" style={{ fontSize: '12px' }}>
        <span className="d-flex align-items-center">
          <FaCogs className="me-1" /> {car.transmissionType || 'Auto'}
        </span>
        <span className="d-flex align-items-center">
          <FaUsers className="me-1" /> {car.seatingCapacity || '4'} Seats
        </span>
        <span className="d-flex align-items-center">
          {/* car.fuel_type?.type_name වෙනුවට car.fuelTypeName */}
          <FaGasPump className="me-1" /> {car.fuelTypeName || 'Petrol'}
        </span>
      </div>

      <button
        className="btn btn-warning w-100 rounded-3 fw-bold py-2 shadow-sm"
        style={{ backgroundColor: '#D39E00', border: 'none' }}
        onClick={() => onShowDetails(car)}
      >
        Show Details
      </button>
    </div>
  );
};

export default VehicleCard;