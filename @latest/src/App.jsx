import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VehiclePage from './pages/VehiclePage'; 
import Login from './pages/Login'; 
import Register from './pages/Register';
import BookingModal from './components/BookingModal'; 
import PaymentPage from './pages/PaymentPage';
import MyBookings from './pages/MyBookings'; // අලුතින් සාදන පේජ් එක
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppContent = ({ handleShowDetails, showModal, selectedCar, handleClose }) => {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Navbar role="customer" />} 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<VehiclePage onShowDetails={handleShowDetails} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<PaymentPage />} /> 
        <Route path="/my-bookings" element={<MyBookings />} /> 
      </Routes>

      {!isAuthPage && (
        <BookingModal 
          show={showModal} 
          car={selectedCar} 
          handleClose={handleClose} 
        />
      )}
    </>
  );
};

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  return (
    <Router>
      <AppContent 
        handleShowDetails={handleShowDetails}
        showModal={showModal}
        selectedCar={selectedCar}
        handleClose={handleClose}
      />
    </Router>
  );
}

export default App;