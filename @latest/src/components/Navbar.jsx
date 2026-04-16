import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCar } from 'react-icons/fa';
import DropdownProfile from './DropdownProfile'; // Dropdown එක import කරගන්න

const Navbar = () => {
    // Local storage එකෙන් දැනට ලොග් වෙලා ඉන්න යූසර්ගේ විස්තර ගන්නවා
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userEmail = localStorage.getItem('email');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
            <div className="container d-flex align-items-center justify-content-between">
                
                {/* Logo */}
                <Link className="navbar-brand fw-bold d-flex align-items-center m-0" to="/" style={{ fontSize: '1.4rem' }}>
                    <FaCar className="me-2" style={{ color: '#000' }} /> 
                    <span style={{ color: '#000' }}>Drive</span>
                    <span style={{ color: '#D39E00' }}>ME</span>
                </Link>

                {/* Mobile Toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu Links */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        {/* යූසර් ලොග් වෙලා නැති වෙලාවට හෝ Customer කෙනෙක් වෙලාවට මේ ලින්ක්ස් පෙන්වනවා */}
                        {(!role || role === 'ROLE_CUSTOMER') && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-medium text-dark" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-medium text-dark" to="/cars">Vehicle</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-medium text-dark" to="/about">About us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-medium text-dark" to="/contact">Contact us</Link>
                                </li>
                            </>
                        )}
                        
                        {/* යූසර් Admin කෙනෙක් නම් මෙතනට Admin ලින්ක්ස් දාන්න පුළුවන් */}
                        {role === 'ROLE_ADMIN' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-medium text-dark" to="/admin-dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-medium text-dark" to="/manage-cars">Manage Cars</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Right Side - Profile Section */}
                <div className="d-flex align-items-center">
                    {!token ? (
                        /* යූසර් ලොග් වෙලා නැත්නම් ලොගින් පේජ් එකට යන අයිකනය පෙන්වනවා */
                        <Link to="/login" className="text-dark fs-4 d-flex align-items-center">
                            <FaUserCircle />
                        </Link>
                    ) : (
                        /* යූසර් ලොග් වෙලා නම් අලුත් Dropdown එක පෙන්වනවා */
                        <DropdownProfile userEmail={userEmail} role={role} />
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;