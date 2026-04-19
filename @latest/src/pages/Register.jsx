import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import api from '../services/api'; // ඔයාගේ Axios instance එක

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        contactNo: '',
        nic: '',
        address: '',
        licenseNo: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Backend එකේ CustomerRequestDTO එකට ගැලපෙන විදිහට data ටික map කරමු
        const requestData = {
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            contactNumber: formData.contactNo, // contactNo -> contactNumber
            nic: formData.nic,
            address: formData.address,
            drivingLicenseNumber: formData.licenseNo // licenseNo -> drivingLicenseNumber
        };

        try {
            // Backend එකට POST request එකක් යවනවා
            const response = await api.post('/customers/register', requestData);

            if (response.status === 200 || response.status === 201) {
                alert("Registration Successful!");
                navigate('/login');
            }
        } catch (error) {
            console.error("Registration error:", error);
            // Backend එකෙන් error message එකක් ආවොත් ඒක පෙන්වනවා
            const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMsg);
        }
    };

    return (
        <div className="login-page">
            <div className="shape-blob-1"></div>
            <div className="shape-blob-2"></div>

            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row w-100 align-items-center py-5">

                    {/* Left Side - Image */}
                    <div className="col-lg-6 d-none d-lg-block position-relative">
                        <div className="circle-bg" style={{ left: '-100px', right: 'auto' }}></div>
                        <img src="/prado_250.jpg" alt="Car" className="login-car-img" style={{ transform: 'translateX(-50px)' }} />
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="col-lg-6 login-form-container p-4 p-md-5">
                        <div className="brand-logo mb-4">
                            <Link className="navbar-brand fw-bold d-flex align-items-center m-0" to="/" style={{ fontSize: '1.8rem', textDecoration: 'none' }}>
                                <FaCar className="me-2" style={{ color: '#000' }} />
                                <span style={{ color: '#000' }}>Drive</span>
                                <span style={{ color: '#D39E00' }}>ME</span>
                            </Link>
                        </div>

                        <h2 className="fw-bold text-dark mb-2">Ready for Your Next Ride?</h2>
                        <p className="text-muted mb-4 small">Sign up to find the most comfortable ride for your journey.</p>

                        <form onSubmit={handleRegister}>
                            {/* Full Name */}
                            <div className="mb-2">
                                <label className="form-label small fw-bold mb-1">Full name</label>
                                <input type="text" name="fullName" className="form-control form-control-sm custom-input" placeholder="Enter your full name" onChange={handleChange} required />
                            </div>

                            {/* Contact No & NIC */}
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <label className="form-label small fw-bold mb-1">Contact number</label>
                                    <input type="text" name="contactNo" className="form-control form-control-sm custom-input" placeholder="07xxxxxxxx" onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className="form-label small fw-bold mb-1">NIC</label>
                                    <input type="text" name="nic" className="form-control form-control-sm custom-input" placeholder="Enter NIC" onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="mb-2">
                                <label className="form-label small fw-bold mb-1">Address</label>
                                <input type="text" name="address" className="form-control form-control-sm custom-input" placeholder="Enter address" onChange={handleChange} required />
                            </div>

                            {/* License No & Email */}
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <label className="form-label small fw-bold mb-1">License Number</label>
                                    <input type="text" name="licenseNo" className="form-control form-control-sm custom-input" placeholder="License No" onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className="form-label small fw-bold mb-1">Email</label>
                                    <input type="email" name="email" className="form-control form-control-sm custom-input" placeholder="Enter email" onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label small fw-bold mb-1">Password</label>
                                <input type="password" name="password" className="form-control form-control-sm custom-input" placeholder="Enter password" onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn btn-warning w-100 login-btn fw-bold py-2">
                                Register
                            </button>
                        </form>

                        <p className="text-center mt-3 small">
                            Already have an account? <Link to="/login" style={{ color: '#D39E00', textDecoration: 'none' }} className="fw-bold">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;