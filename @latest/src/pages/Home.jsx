import React from 'react';
import { FaRegClock, FaCarSide, FaWallet } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <style>
        {`
          .hero-container {
            min-height: 450px; 
            position: relative; 
            overflow: hidden;
            background-color: #D39E00; 
          }

          /* Mobile view Blur Overlay */
          .hero-blur-overlay {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(211, 158, 0, 0.4), rgba(211, 158, 0, 0.8));
            backdrop-filter: blur(4px);
            z-index: 2;
          }

          .hero-text-content {
            z-index: 3;
            position: relative;
          }

          /* Mobile Logic */
          @media (max-width: 991.98px) {
            .hero-blur-overlay {
              display: block;
            }
            .hero-car-image-wrapper {
              position: absolute !important;
              top: 0;
              right: -15%;
              width: 130%;
              height: 100%;
              z-index: 1;
              opacity: 0.9;
            }
            .hero-car-image-wrapper img {
                object-fit: contain;
                height: 100%;
                width: 100%;
                transform: scale(1.4);
            }
            .hero-text-content {
              text-align: center;
              padding: 60px 10px;
            }
          }

          /* Desktop Logic */
          @media (min-width: 992px) {
            .hero-car-image-wrapper {
              z-index: 3;
              transform: scale(1.5) translateX(20px);
            }
          }
        `}
      </style>

      {/* Hero Banner Area */}
      <div className="row align-items-center p-4 p-md-5 rounded-5 shadow-sm hero-container mx-1">
        
        {/* Text Content */}
        <div className="col-lg-6 hero-text-content">
          <h1 className="display-4 fw-bold text-dark mb-3 text-uppercase" style={{ letterSpacing: '-1px' }}>
            Drive Your Dream Today.
          </h1>
          <p className="lead text-dark mb-4 fw-medium" style={{ maxWidth: '400px' }}>
            Unlock the freedom of the road. Premium car rentals tailored for your travel needs at the best prices in town.
          </p>
          
          <button 
            className="btn btn-dark btn-lg px-5 rounded-pill shadow-lg border-0 fw-bold"
            onClick={() => navigate('/cars')}
          >
            Show Vehicles
          </button>
        </div>

        {/* Car Image Section */}
        <div className="col-lg-6 hero-car-image-wrapper d-flex justify-content-center">
          <img 
            src="/Gemini_Generated_Image_v8aaz6v8aaz6v8aae.png" 
            alt="Cars" 
            className="img-fluid" 
          />
        </div>

        {/* Mobile Blur Overlay */}
        <div className="hero-blur-overlay"></div>
      </div>

      {/* Features Section */}
      <div className="row mt-5 py-4 text-center">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="p-3 shadow-sm rounded-4 bg-white h-100 border">
            <FaRegClock size={40} className="text-dark mb-3" />
            <h5 className="fw-bold">Availability</h5>
            <p className="text-muted small mb-0">Book your ride anytime, anywhere. Our support team is always here for you.</p>
          </div>
        </div>
        
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="p-3 shadow-sm rounded-4 bg-white h-100 border">
            <FaCarSide size={40} className="text-dark mb-3" />
            <h5 className="fw-bold">Comfort</h5>
            <p className="text-muted small mb-0">Enjoy a smooth and premium driving experience with our well-maintained vehicles.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 shadow-sm rounded-4 bg-white h-100 border">
            <FaWallet size={40} className="text-dark mb-3" />
            <h5 className="fw-bold">Pocket-friendly</h5>
            <p className="text-muted small mb-0">Premium travel doesn't have to be expensive. Quality service at the most affordable prices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;