import React from 'react';
import { FaCalendarAlt, FaCarSide, FaMoneyBillWave, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

// HTML safe status colors
const statusMeta = {
    Confirmed: { color: '#28a745', icon: <FaCheckCircle /> }, // Green
    Pending: { color: '#ffc107', icon: <FaClock /> }, // Yellow
    Cancelled: { color: '#dc3545', icon: <FaExclamationTriangle /> }, // Red
    Active: { color: '#ffc107', icon: <FaClock /> } // Postman එකේ 'Active' තියෙන නිසා
};

const RentalCard = ({ data }) => {
    // Postman response data extraction
    const { rentalId, carModel, plateNumber, imageUrl, startDate, endDate, totalCost, status } = data;

    const { color, icon } = statusMeta[status] || statusMeta.Pending;

    return (
        <div className="card shadow-sm border-0 mb-4 overflow-hidden" style={{ borderRadius: '15px', backgroundColor: '#fff' }}>
            <div className="card-body p-0">
                <div className="row g-0 align-items-center">
                    
                    {/* 📸 වාහනයේ පින්තූරය සහ ID (JSON: imageUrl, rentalId) */}
                    <div className="col-md-3 p-4 bg-light text-center d-flex flex-column align-items-center justify-content-center">
                        <small className="text-muted d-block mb-3 p-2 bg-white rounded-pill shadow-xs" style={{ fontSize: '0.7rem' }}>
                            #Booking ID: DM-{rentalId}
                        </small>
                        <img 
                            src={`http://localhost:8080/uploads/cars/${imageUrl}`} 
                            alt={carModel}
                            className="img-fluid"
                            style={{ maxHeight: '130px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* 📝 වාහනයේ නම සහ ප්ලේට් නම්බර් (JSON: carModel, plateNumber) */}
                    <div className="col-md-3 p-4">
                        <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '1.25rem' }}>{carModel}</h4>
                        <p className="text-secondary small mb-0"><FaCarSide className="me-2" /> {plateNumber}</p>
                    </div>

                    {/* 📅 දිනයන් (JSON: startDate, endDate) */}
                    <div className="col-md-3 p-4 border-start border-end">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <div className="text-center">
                                <p className="small text-muted mb-0 uppercase text-xs" style={{ fontSize: '0.7rem' }}>Pick-up</p>
                                <p className="fw-bold mb-0 small text-dark">{startDate}</p>
                            </div>
                            <span className="text-muted fs-5">➞</span>
                            <div className="text-center">
                                <p className="small text-muted mb-0 uppercase text-xs" style={{ fontSize: '0.7rem' }}>Drop-off</p>
                                <p className="fw-bold mb-0 small text-dark">{endDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* 💰 මිල සහ Status (JSON: totalCost, status) */}
                    <div className="col-md-3 p-4 text-center">
                        <p className="small text-muted mb-1" style={{ fontSize: '0.8rem' }}>Total Price</p>
                        <h3 className="fw-bold text-dark mb-3" style={{ fontSize: '1.5rem' }}>
                            LKR {totalCost?.toLocaleString()}
                        </h3>
                        <span 
                            className="badge rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2" 
                            style={{ backgroundColor: color, color: color === '#ffc107' ? '#000' : '#fff', fontSize: '0.8rem' }}
                        >
                            {icon} {status}
                        </span>
                    </div>

                </div>
            </div>
            {/* Figma Figma design එකේ වගේම පල්ලෙහා expandable details හෝ buttons මෙතනට පස්සේ එකතු කරන්න පුළුවන් */}
        </div>
    );
};

export default RentalCard;