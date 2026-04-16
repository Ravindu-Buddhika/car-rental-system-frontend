import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RentalCard from '../components/RentalCard'; // RentalCard එක import කළා
import { FaHistory, FaCalendarAlt } from 'react-icons/fa';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/rentals/my-rentals', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Postman JSON array එක set කරනවා
            setBookings(response.data);
        } catch (error) {
            console.error("Booking load error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-5" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-bold mb-0 text-dark" style={{ borderLeft: '7px solid #ffc107', paddingLeft: '15px' }}>
                        <FaHistory className="me-3" /> My Bookings
                    </h1>
                    <button className="btn btn-outline-dark rounded-pill px-4">
                        <FaCalendarAlt className="me-2" /> Current Date
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-warning" role="status"></div>
                        <p className="mt-2 text-muted">වෙන් කිරීම් පරීක්ෂා කරමින්...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-5 bg-white shadow-sm rounded-4">
                        <p className="fs-5 text-secondary">තවමත් කිසිදු වෙන් කිරීමක් සිදු කර නැත.</p>
                    </div>
                ) : (
                    // මේකෙන් තමයි Rentals කිහිපයක් තිබුණොත් ඒ හැම එකක්ම map කරන්නේ
                    <div className="row">
                        {bookings.map((booking) => (
                            <div key={booking.rentalId} className="col-12">
                                <RentalCard data={booking} /> {/*Reusable Card එක */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;