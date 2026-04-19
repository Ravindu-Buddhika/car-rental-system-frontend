import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaGasPump, FaUsers, FaCogs, FaCar, FaTimes } from 'react-icons/fa';

const BookingModal = ({ car, show, handleClose }) => {
    const navigate = useNavigate();

    // 1. අද දින Default Start Date එක ලෙස ගන්නවා
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [days, setDays] = useState(1);
    const [endDate, setEndDate] = useState('');
    const [total, setTotal] = useState(0);

    // 2. දින ගණන හෝ Start Date වෙනස් වන විට End Date සහ Total ගණනය කිරීම
    useEffect(() => {
        if (car && startDate && days) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + parseInt(days));
            
            setEndDate(end.toISOString().split('T')[0]);
            setTotal(parseInt(days) * (car.dailyRate || 0));
        }
    }, [startDate, days, car]);

    // 3. End Date එක කෙලින්ම වෙනස් කළොත් දින ගණන හැදීම
    const handleEndDateChange = (e) => {
        const selectedEnd = e.target.value;
        setEndDate(selectedEnd);

        const start = new Date(startDate);
        const end = new Date(selectedEnd);
        
        const diffTime = end - start;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 30) {
            alert("Maximum rental period is 30 days!");
            setDays(30);
        } else if (diffDays < 1) {
            setDays(1);
        } else {
            setDays(diffDays);
        }
    };

    // 4. Rent Now ක්ලික් කළ විට Payment පේජ් එකට යාම
    const handleRentNow = () => {
        const bookingData = {
            carId: car.carId,
            carModel: car.carModel,
            dailyRate: car.dailyRate,
            startDate: startDate,
            endDate: endDate,
            days: days,
            total: total,
            imageUrl: car.imageUrl,
            latitude: car.latitude, // Map එකට අවශ්‍ය coordinates
            longitude: car.longitude
        };

        handleClose(); // Modal එක වහන්න
        navigate('/payment', { state: { bookingData } });
    };

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
                        src={car.imageUrl 
                            ? `http://localhost:8080/uploads/cars/${car.imageUrl}` 
                            : "https://via.placeholder.com/200x120"} 
                        alt={car.carModel} 
                        className="floating-car-img" 
                    />
                </div>

                <div className="modal-body-grid">
                    {/* Vehicle Details Section */}
                    <div className="modal-details-section">
                        <h6 className="section-label">Vehicle Details</h6>
                        
                        <div className="info-row">
                            <FaGasPump className="icon-gold" />
                            <div><p className="label-gold">Fuel Type</p><p className="val-white">{car.fuelTypeName}</p></div>
                        </div>

                        <div className="info-row">
                            <FaUsers className="icon-gold" />
                            <div><p className="label-gold">Sitting capacity</p><p className="val-white">{car.seatingCapacity} Seats</p></div>
                        </div>

                        <div className="info-row">
                            <FaCogs className="icon-gold" />
                            <div><p className="label-gold">Transmission</p><p className="val-white">{car.transmissionType}</p></div>
                        </div>

                        <div className="info-row">
                            <FaCar className="icon-gold" />
                            <div><p className="label-gold">Category</p><p className="val-white">{car.categoryName}</p></div>
                        </div>

                        <div className="info-row">
                            <span className="icon-gold fw-bold">LKR</span>
                            <div><p className="label-gold">Price per day</p><p className="val-white">LKR {car.dailyRate?.toLocaleString()}</p></div>
                        </div>
                    </div>

                    {/* Booking Form Section */}
                    <div className="modal-form-section">
                        <h6 className="section-label">Booking Form</h6>
                        
                        <div className="mb-3">
                            <label className="text-warning small mb-1">Pickup Date</label>
                            <input 
                                type="date" 
                                className="custom-input form-control shadow-none" 
                                value={startDate}
                                min={today}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        
                        <div className="row g-2 mb-3">
                            <div className="col-6">
                                <label className="text-warning small mb-1">Drop off Date</label>
                                <input 
                                    type="date" 
                                    className="custom-input form-control shadow-none" 
                                    value={endDate}
                                    min={startDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                            <div className="col-6">
                                <label className="text-warning small mb-1">No of days (Max 30)</label>
                                <input 
                                    type="number" 
                                    className="custom-input form-control shadow-none" 
                                    value={days}
                                    min="1"
                                    max="30"
                                    onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                                />
                            </div>
                        </div>
                        
                        <div className="price-summary">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="text-secondary small">Rental fee ({days} days)</span>
                                <span className="text-white small">LKR {(car.dailyRate * days).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between pt-2 border-top border-secondary mt-2">
                                <span className="text-white fw-bold">Total</span>
                                <span className="text-warning fw-bold">LKR {total.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <button className="rent-now-btn" onClick={handleRentNow}>
                            Rent Car Now
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default BookingModal;