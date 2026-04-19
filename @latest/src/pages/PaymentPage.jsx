import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

// Leaflet Marker Fix
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingData } = location.state || {};
    
    const [loading, setLoading] = useState(false);

    const vehiclePosition = [bookingData?.latitude || 6.9271, bookingData?.longitude || 79.8612];

    const handlePayNow = async () => {
        if (!bookingData) {
            Swal.fire('Error', 'No booking data found!', 'error');
            return;
        }

        setLoading(true);

        // RentalRequestDTO එකට ගැලපෙන Payload එක
        const rentalPayload = {
            carId: bookingData.carId,
            customerId: 1, // දැනට 1 දාන්න. Login එකක් තියෙනවා නම් User ID එක මෙතනට ගන්න.
            startDate: bookingData.startDate, // YYYY-MM-DD format
            endDate: bookingData.endDate       // YYYY-MM-DD format
        };

        try {
            // නිවැරදි Endpoint එක: /api/v1/rentals/create
            const response = await axios.post('http://localhost:8080/api/v1/rentals/create', rentalPayload);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your car rental has been placed successfully! 🚗',
                    icon: 'success',
                    confirmButtonColor: '#ffc107',
                    confirmButtonText: 'Great!'
                }).then(() => {
                    navigate('/my-bookings');
                });
            }
        } catch (error) {
            console.error("Booking Error:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong while placing the order.";
            Swal.fire({
                title: 'Error!',
                text: errorMsg,
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
            <div className="row g-4 justify-content-center">
                
                {/* වම් පැත්ත: Rental Summary */}
                <div className="col-md-5">
                    <div className="p-4 h-100" style={{ backgroundColor: '#111', borderRadius: '25px', border: '1px solid #333' }}>
                        <h3 className="mb-4 fw-bold text-white">Rental Summary</h3>
                        
                        <div className="text-center mb-4" style={{ backgroundColor: '#1a1a1a', borderRadius: '20px', padding: '20px' }}>
                            <img 
                                src={bookingData?.imageUrl ? `http://localhost:8080/uploads/cars/${bookingData.imageUrl}` : "https://via.placeholder.com/300x180"} 
                                alt="Car" 
                                className="img-fluid mb-3" 
                                style={{ maxHeight: '220px', objectFit: 'contain' }}
                            />
                            <h5 className="text-white-50">{bookingData?.carModel}</h5>
                        </div>

                        <div className="pricing-info text-white">
                            <div className="d-flex justify-content-between mb-2">
                                <span style={{ color: '#aaa' }}>Price per day</span>
                                <span className="fw-bold">LKR {bookingData?.dailyRate?.toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ color: '#aaa' }}>Booking days</span>
                                <span className="fw-bold">{bookingData?.days}</span>
                            </div>
                            <hr style={{ borderColor: '#444' }} />
                            <div className="d-flex justify-content-between mb-4">
                                <h4 className="fw-bold">Total</h4>
                                <h4 className="fw-bold text-warning">LKR {bookingData?.total?.toLocaleString()}</h4>
                            </div>
                        </div>

                        {/* Payment Inputs */}
                        <div className="mt-4">
                            <label className="small mb-1" style={{ color: '#aaa' }}>Card Number</label>
                            <input type="text" className="form-control bg-dark border-secondary text-white mb-3 py-2" placeholder="0000 0000 0000 0000" style={{ borderRadius: '10px' }} />
                            
                            <div className="row g-3">
                                <div className="col-6">
                                    <label className="small mb-1" style={{ color: '#aaa' }}>CVN</label>
                                    <input type="text" className="form-control bg-dark border-secondary text-white py-2" placeholder="123" style={{ borderRadius: '10px' }} />
                                </div>
                                <div className="col-6">
                                    <label className="small mb-1" style={{ color: '#aaa' }}>Expire date</label>
                                    <input type="text" className="form-control bg-dark border-secondary text-white py-2" placeholder="MM/YY" style={{ borderRadius: '10px' }} />
                                </div>
                            </div>
                            
                            <button 
                                className="btn btn-warning w-100 mt-5 py-3 fw-bold text-dark" 
                                style={{ borderRadius: '12px', fontSize: '1.1rem' }}
                                onClick={handlePayNow}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* දකුණු පැත්ත: Pickup details */}
                <div className="col-md-5">
                    <div className="p-4 h-100" style={{ backgroundColor: '#e9ecef', borderRadius: '25px', color: '#212529', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        <h4 className="fw-bold mb-4" style={{ color: '#333' }}>Pickup details</h4>
                        
                        <div className="mb-4" style={{ height: '280px', borderRadius: '20px', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <MapContainer center={vehiclePosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={vehiclePosition}>
                                    <Popup>{bookingData?.carModel} is here!</Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        <div className="pickup-details-content px-2">
                            <DetailRow icon={<FaMapMarkerAlt />} label="Pickup Address" value="DriveMe Headquarters, Colombo" />
                            <DetailRow icon={<FaClock />} label="Pickup Time" value={`${bookingData?.startDate} | 08:00 AM`} />
                            <DetailRow icon={<FaMapMarkerAlt />} label="Drop off Address" value="DriveMe Headquarters, Colombo" />
                            <DetailRow icon={<FaClock />} label="Drop off Time" value={`${bookingData?.endDate} | 08:00 PM`} />
                            <DetailRow icon={<FaPhoneAlt />} label="Contact" value="+94 112 345 678" isLast />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const DetailRow = ({ icon, label, value, isLast }) => (
    <div className={`d-flex align-items-start ${isLast ? '' : 'mb-3'}`}>
        <div className="me-3 mt-1" style={{ color: '#333', fontSize: '1.2rem' }}>{icon}</div>
        <div>
            <p className="mb-0 small text-muted" style={{ fontSize: '0.85rem' }}>{label}</p>
            <p className="mb-0 fw-bold" style={{ fontSize: '1rem', color: '#222' }}>{value}</p>
        </div>
    </div>
);

export default PaymentPage;