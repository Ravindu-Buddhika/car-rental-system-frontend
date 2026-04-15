import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VehiclePage from './pages/VehiclePage'; 
import BookingModal from './components/BookingModal'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
      <Navbar role="customer" /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/cars" 
          element={<VehiclePage onShowDetails={handleShowDetails} />} 
        />
      </Routes>

      <BookingModal 
        show={showModal} 
        car={selectedCar} 
        handleClose={handleClose} 
      />
    </Router>
  );
}

export default App;