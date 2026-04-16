import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaUserEdit, FaCalendarCheck } from 'react-icons/fa';
import * as bootstrap from 'bootstrap';
import EditProfileModal from './EditProfileModal'; // අලුත් Modal එක import කරන්න

const DropdownProfile = ({ userEmail, role }) => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    
    // Modal එක පෙන්වන්න/වහන්න state එක
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const dropdownElement = dropdownRef.current;
        if (dropdownElement) {
            new bootstrap.Dropdown(dropdownElement);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <div className="dropdown">
                <div 
                    ref={dropdownRef} 
                    className="d-flex align-items-center border p-1 px-2 rounded-pill shadow-sm bg-light" 
                    id="profileDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ cursor: 'pointer' }}
                >
                    <FaUserCircle size={28} className="text-secondary" />
                    <span className="ms-2 me-1 small fw-bold d-none d-md-inline text-dark">
                        {userEmail ? userEmail.split('@')[0] : 'User'}
                    </span>
                    <i className="bi bi-chevron-down small text-muted ms-1"></i>
                </div>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-3" 
                    aria-labelledby="profileDropdown" 
                    style={{ minWidth: '260px', borderRadius: '15px', zIndex: 9999 }}>
                    
                    <li className="text-center mb-3">
                        <FaUserCircle size={50} className="text-warning mb-2" />
                        <h6 className="mb-0 fw-bold text-dark small">{userEmail ? userEmail.split('@')[0] : 'User'}</h6>
                        <p className="text-muted mb-0" style={{ fontSize: '11px' }}>{userEmail}</p>
                        <span className="badge bg-light text-warning border border-warning mt-2 px-3" 
                              style={{ fontSize: '10px', borderRadius: '20px' }}>
                            {role === 'ROLE_CUSTOMER' ? 'Customer' : 'Administrator'}
                        </span>
                    </li>
                    
                    <hr className="dropdown-divider" />

                    <li>
                        {/* මෙතනදී onClick එකෙන් Modal එක open කරනවා */}
                        <button 
                            className="dropdown-item d-flex align-items-center py-2 border-0 bg-transparent" 
                            onClick={() => setShowEditModal(true)}
                        >
                            <FaUserEdit className="me-3 text-muted" /> 
                            <span className="small fw-bold">Edit Profile</span>
                        </button>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center py-2" to="/my-bookings">
                            <FaCalendarCheck className="me-3 text-muted" /> 
                            <span className="small fw-bold">My Bookings</span>
                        </Link>
                    </li>
                    
                    <hr className="dropdown-divider" />

                    <li>
                        <button className="dropdown-item d-flex align-items-center py-2 text-danger fw-bold border-0 bg-transparent" 
                                onClick={handleLogout}>
                            <FaSignOutAlt className="me-3" /> 
                            <span className="small">Sign out</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Edit Profile Modal එක පෙන්වන කොටස */}
            <EditProfileModal 
                show={showEditModal} 
                handleClose={() => setShowEditModal(false)}
                // මෙතනට දැනට තියෙන user data ටික pass කරන්න පුළුවන්
                userData={{
                    fullName: userEmail ? userEmail.split('@')[0] : '',
                    // අනිත් විස්තර ටිකත් API එකෙන් එන විදිහට පස්සේ මෙතනට දාන්න
                }}
            />
        </>
    );
};

export default DropdownProfile;