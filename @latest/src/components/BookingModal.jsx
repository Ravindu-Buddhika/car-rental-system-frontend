import React from 'react';
import ReactDOM from 'react-dom';
import { FaGasPump, FaUsers, FaCogs, FaCar, FaTimes } from 'react-icons/fa';

const BookingModal = ({ car, show, handleClose }) => {
  if (!show || !car) return null;

  return ReactDOM.createPortal(
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        
        <button className="modal-close-icon" onClick={handleClose}>
          <FaTimes />
        </button>

        <h2 className="modal-title">Book your Ride</h2>

        <div className="modal-car-display">
          <img 
            /* /src/assets/ වෙනුවට backend image URL එක දාන්න */
            src={car.imageUrl 
                ? `http://localhost:8080/uploads/cars/${car.imageUrl}` 
                : "https://via.placeholder.com/200x120"} 
            alt={car.carModel} 
            className="floating-car-img" 
          />
        </div>

        <div className="modal-body-grid">
          <div className="modal-details-section">
            <h6 className="section-label">Vehicle Details</h6>
            
            <div className="info-row">
              <FaGasPump className="icon-gold" />
              {/* fuel_type?.type_name වෙනුවට fuelTypeName */}
              <div><p className="label-gold">Fuel Type</p><p className="val-white">{car.fuelTypeName}</p></div>
            </div>

            <div className="info-row">
              <FaUsers className="icon-gold" />
              {/* seating_capacity?.capacity වෙනුවට seatingCapacity */}
              <div><p className="label-gold">Sitting capacity</p><p className="val-white">{car.seatingCapacity} Seats</p></div>
            </div>

            <div className="info-row">
              <FaCogs className="icon-gold" />
              {/* transmission?.transmission_type වෙනුවට transmissionType */}
              <div><p className="label-gold">Transmission</p><p className="val-white">{car.transmissionType}</p></div>
            </div>

            <div className="info-row">
              <FaCar className="icon-gold" />
              {/* category?.category_name වෙනුවට categoryName */}
              <div><p className="label-gold">Category</p><p className="val-white">{car.categoryName}</p></div>
            </div>

            <div className="info-row">
              <span className="icon-gold fw-bold">LKR</span>
              {/* daily_rate වෙනුවට dailyRate */}
              <div><p className="label-gold">Price per day</p><p className="val-white">LKR {car.dailyRate?.toLocaleString()}</p></div>
            </div>
          </div>

          <div className="modal-form-section">
            <h6 className="section-label">Booking Form</h6>
            <div className="mb-3">
              <label className="text-warning small mb-1">Pickup Date</label>
              <input type="date" className="custom-input form-control shadow-none" />
            </div>
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="text-warning small mb-1">Drop off Date</label>
                <input type="date" className="custom-input form-control shadow-none" />
              </div>
              <div className="col-6">
                <label className="text-warning small mb-1">No of dates</label>
                <input type="number" className="custom-input form-control shadow-none" defaultValue="1" />
              </div>
            </div>
            
            <div className="price-summary">
              <div className="d-flex justify-content-between mb-1">
                <span className="text-secondary small">Rental fee</span>
                <span className="text-white small">LKR {car.dailyRate?.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top border-secondary mt-2">
                <span className="text-white fw-bold">Total</span>
                <span className="text-warning fw-bold">LKR {car.dailyRate?.toLocaleString()}</span>
              </div>
            </div>
            
            <button className="rent-now-btn">Rent Car Now</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default BookingModal;