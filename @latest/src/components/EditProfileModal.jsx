import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfileModal = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [initialEmail, setInitialEmail] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        nic: '',
        address: '',
        drivingLicenseNumber: '',
        email: ''
    });

    useEffect(() => {
        if (show) {
            fetchUserData();
        }
    }, [show]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/v1/customers/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const data = response.data;
            if (data) {
                setFormData({
                    fullName: data.fullName || '',
                    email: data.email || '',
                    contactNumber: data.contactNumber || '',
                    nic: data.nic || '',
                    address: data.address || '',
                    drivingLicenseNumber: data.drivingLicenseNumber || ''
                });
                setInitialEmail(data.email || '');
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            if(error.response?.status === 403 || error.response?.status === 401) {
                alert("Your session has expired. Please log in again.");
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const isEmailChanged = formData.email !== initialEmail;

        if (isEmailChanged) {
            const confirmChange = window.confirm(
                "You are about to change your email address. You will be logged out of the system after this update. Are you sure?"
            );
            if (!confirmChange) return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8080/api/v1/customers/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (isEmailChanged) {
                alert("Profile updated successfully! Please log in again with your new email address.");
                localStorage.clear();
                navigate('/login');
            } else {
                alert("Profile updated successfully!");
                handleClose();
                window.location.reload(); 
            }
        } catch (error) {
            alert(error.response?.data || "Update failed! Please try again.");
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                    <div className="modal-header border-0 pt-4 px-4">
                        <div className="text-center w-100">
                            <h5 className="fw-bold mb-0">MANAGE YOUR PROFILE</h5>
                            <small className="text-muted">Edit your personal information</small>
                        </div>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>

                    <div className="modal-body px-4 pb-4">
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Full Name</label>
                            <input 
                                type="text" name="fullName" className="form-control rounded-pill bg-light" 
                                value={formData.fullName || ''} onChange={handleChange} 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email Address</label>
                            <input 
                                type="email" name="email" className="form-control rounded-pill bg-light text-primary fw-bold" 
                                value={formData.email || ''} onChange={handleChange} 
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label small fw-bold">Contact Number</label>
                                <input 
                                    type="text" name="contactNumber" className="form-control rounded-pill bg-light" 
                                    value={formData.contactNumber || ''} onChange={handleChange} 
                                />
                            </div>
                            <div className="col">
                                <label className="form-label small fw-bold">NIC</label>
                                <input 
                                    type="text" name="nic" className="form-control rounded-pill bg-light" 
                                    value={formData.nic || ''} onChange={handleChange} 
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Address</label>
                            <textarea 
                                name="address" className="form-control bg-light" rows="2" 
                                style={{ borderRadius: '15px' }} value={formData.address || ''} onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold">License Number</label>
                            <input 
                                type="text" name="drivingLicenseNumber" className="form-control rounded-pill bg-light" 
                                value={formData.drivingLicenseNumber || ''} onChange={handleChange} 
                            />
                        </div>

                        <button 
                            className="btn btn-warning w-100 fw-bold rounded-pill py-2 shadow-sm mb-2 text-white"
                            onClick={handleSubmit}
                        >
                            SAVE CHANGES
                        </button>
                        <button className="btn btn-outline-secondary w-100 border-0 small fw-bold" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;