import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import api from '../services/api'; // ඔයාගේ axios instance එක

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Backend එකේ AuthController එකට request එක යවනවා
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        const { token, role, email: userEmail } = response.data;

        // 1. ලැබෙන දත්ත localStorage එකේ save කරගන්නවා
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', userEmail);

        alert("Login Successful!");

        // 2. Role එක අනුව අදාළ පිටුවට redirect කරනවා
        if (role === 'ADMIN') {
          navigate('/admin-dashboard'); // Admin නම් Admin dashboard එකට
        } else {
          navigate('/'); // Customer නම් home එකට
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.message || "Invalid Email or Password!";
      alert(errorMsg);
    }
  };

  return (
    <div className="login-page">
      <div className="shape-blob-1"></div>
      <div className="shape-blob-2"></div>

      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row w-100 align-items-center">
          
          <div className="col-lg-5 login-form-container p-4 p-md-5">
            <div className="brand-logo mb-5">
              <Link className="navbar-brand fw-bold d-flex align-items-center m-0" to="/" style={{ fontSize: '2rem', textDecoration: 'none' }}>
                <FaCar className="me-2" style={{ color: '#000' }} /> 
                <span style={{ color: '#000' }}>Drive</span>
                <span style={{ color: '#D39E00' }}>ME</span>
              </Link>
            </div>

            <h1 className="display-5 fw-bold text-dark mb-2">Ready for Your Next Ride?</h1>
            <p className="text-muted mb-4">Log in to find the most comfortable ride for your journey.</p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="form-label fw-medium">Email</label>
                <input 
                  type="email" 
                  className="form-control custom-input" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-medium">Password</label>
                <input 
                  type="password" 
                  className="form-control custom-input" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-end mb-4">
                <Link to="/forgot-password" style={{ color: '#D39E00', textDecoration: 'none' }} className="small fw-bold">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-warning w-100 login-btn fw-bold">
                Login
              </button>
            </form>

            <p className="text-center mt-4 small">
              Don't have an account? <Link to="/register" style={{ color: '#D39E00', textDecoration: 'none' }} className="fw-bold">Sign Up</Link>
            </p>
          </div>

          <div className="col-lg-7 d-none d-lg-block position-relative">
            <div className="circle-bg"></div>
            <img src="/hiace_kdh.jpg" alt="Car" className="login-car-img" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;