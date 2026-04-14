import React from 'react';
import { FaGasPump } from 'react-icons/fa';

const FilterBar = () => {
  return (
    <div className="p-3 p-xl-4 rounded-4 text-white shadow-lg" 
         style={{ 
           backgroundColor: '#1E1E1E', 
           border: '1px solid #333',
           /* Height එක '90vh' වෙනුවට 'fit-content' කළා එවිට කොට වෙනවා */
           height: 'fit-content', 
           position: 'sticky',
           /* Navbar එකට යටින් නියමිත පරතරයකින් රැඳී තිබීමට */
           top: '100px', 
           zIndex: 10
         }}>
      
      <h5 className="fw-bold mb-4" style={{ letterSpacing: '1px', fontSize: '1.1rem' }}>Filters</h5>
      
      {/* Category Tabs */}
      <div className="mb-4">
         <div className="d-flex flex-wrap gap-2">
           <button className="btn btn-sm px-2 rounded-pill" style={{ backgroundColor: '#D39E00', color: '#000', fontWeight: 'bold', fontSize: '11px' }}>Sedan</button>
           <button className="btn btn-sm btn-outline-secondary text-white px-2 rounded-pill" style={{ fontSize: '11px' }}>SUV</button>
           <button className="btn btn-sm btn-outline-secondary text-white px-2 rounded-pill" style={{ fontSize: '11px' }}>Van</button>
           <button className="btn btn-sm btn-outline-secondary text-white px-2 rounded-pill" style={{ fontSize: '11px' }}>Luxury</button>
         </div>
      </div>

      <hr className="opacity-25 mb-4"/>

      {/* Transmission Section */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-secondary" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Transmission</h6>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="trans" id="auto" defaultChecked 
                 style={{ backgroundColor: '#D39E00', borderColor: '#D39E00', cursor: 'pointer' }} />
          <label className="form-check-label ps-1 text-white small" htmlFor="auto" style={{ cursor: 'pointer' }}>Automatic</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="trans" id="manual" 
                 style={{ backgroundColor: 'transparent', borderColor: '#555', cursor: 'pointer' }} />
          <label className="form-check-label ps-1 text-secondary small" htmlFor="manual" style={{ cursor: 'pointer' }}>Manual</label>
        </div>
      </div>

      <hr className="opacity-25 mb-4"/>

      {/* Seating Capacity Section */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-secondary" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Seating</h6>
        <div className="d-flex flex-wrap gap-2">
          {[2, 4, 6, 7].map(num => (
            <button key={num} 
                    className={`btn btn-sm px-3 ${num === 4 ? 'btn-warning fw-bold' : 'btn-outline-secondary text-white'}`}
                    style={num === 4 ? { backgroundColor: '#D39E00', border: 'none', color: '#000', fontSize: '12px' } : { fontSize: '12px' }}>
              {num}
            </button>
          ))}
        </div>
      </div>

      <hr className="opacity-25 mb-4"/>

      {/* Fuel Type Section */}
      <div className="mb-2">
        <h6 className="fw-bold mb-3 text-secondary" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Fuel Type</h6>
        <div className="row g-2">
          {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(fuel => (
            <div key={fuel} className="col-12 d-flex align-items-center mb-1" style={{ fontSize: '12px' }}>
              <FaGasPump className="me-2 text-warning" size={10}/>
              <span className={fuel === 'Petrol' ? 'text-white' : 'text-secondary'}>{fuel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;