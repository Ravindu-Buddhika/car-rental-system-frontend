import React, { useState, useEffect } from 'react';
import { FaGasPump, FaCarSide } from 'react-icons/fa';
import api from '../services/api';

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    fuelTypes: [],
    transmissions: [],
    brands: [],
    capacities: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, fuelRes, transRes, brandRes, capRes] = await Promise.all([
          api.get('/categories/all'),
          api.get('/fuel-types/all'),
          api.get('/transmissions/all'),
          api.get('/brands/all'),
          api.get('/capacities/all')
        ]);

        setFilterOptions({
          categories: catRes.data || [],
          fuelTypes: fuelRes.data || [],
          transmissions: transRes.data || [],
          brands: brandRes.data || [],
          capacities: capRes.data || []
        });
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div className="p-3 rounded-4 text-white shadow-lg" 
         style={{ 
           backgroundColor: '#1E1E1E', 
           border: '1px solid #333', 
           height: 'fit-content', 
           position: 'sticky', 
           top: '100px', 
           zIndex: 10,
           width: '100%'
         }}>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0" style={{ letterSpacing: '1px', fontSize: '1rem' }}>Filters</h5>
        <button 
          className="btn btn-link btn-sm text-warning p-0 text-decoration-none" 
          style={{ fontSize: '11px' }}
          onClick={() => onFilterChange('reset', null)}
        >
          Reset
        </button>
      </div>
      
      {/* 1. Categories */}
      <div className="mb-3">
          <h6 className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Categories</h6>
          <div className="d-flex flex-wrap gap-1">
            {filterOptions.categories.map(cat => (
              <button 
                key={cat.id}
                className={`btn btn-sm px-2 py-1 rounded-3 transition-all ${activeFilters?.categoryId === cat.id ? 'btn-warning fw-bold shadow' : 'btn-outline-secondary text-white'}`}
                style={{ fontSize: '10px', border: activeFilters?.categoryId === cat.id ? 'none' : '1px solid #444' }}
                onClick={() => onFilterChange('categoryId', cat.id)}
              >
                {cat.value}
              </button>
            ))}
          </div>
      </div>

      <hr className="opacity-25 my-3"/>

      {/* 2. Gear & Seats */}
      <div className="row g-2 mb-3">
        <div className="col-6">
          <h6 className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Gear</h6>
          {filterOptions.transmissions.map(trans => (
            <div key={trans.id} className="form-check mb-1">
              <input 
                className="form-check-input" 
                type="radio" 
                name="transRadio"
                checked={activeFilters?.transmissionId === trans.id}
                onChange={() => onFilterChange('transmissionId', trans.id)}
                style={{ transform: 'scale(0.8)', accentColor: '#FFB100', cursor: 'pointer' }} 
              />
              <label className={`form-check-label small ${activeFilters?.transmissionId === trans.id ? 'text-warning fw-bold' : 'text-secondary'}`} style={{ fontSize: '11px', cursor: 'pointer' }}>
                {trans.value}
              </label>
            </div>
          ))}
        </div>
        <div className="col-6">
          <h6 className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Seats</h6>
          <div className="d-flex flex-wrap gap-1">
            {filterOptions.capacities.map(cap => (
              <button 
                key={cap.id} 
                className={`btn btn-xs px-2 py-1 transition-all ${activeFilters?.capacityId === cap.id ? 'btn-warning fw-bold' : 'btn-outline-secondary text-white'}`}
                style={{ fontSize: '10px' }}
                onClick={() => onFilterChange('capacityId', cap.id)}
              >
                {cap.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="opacity-25 my-3"/>

      {/* 3. Brands */}
      <div className="mb-3">
        <h6 className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Brands</h6>
        <div className="row g-1">
          {filterOptions.brands.map(brand => (
            <div key={brand.id} className="col-6">
              <div 
                className={`d-flex align-items-center p-1 rounded-2 transition-all ${activeFilters?.brandId === brand.id ? 'bg-warning text-dark fw-bold' : 'text-secondary'}`}
                style={{ fontSize: '10px', cursor: 'pointer', border: activeFilters?.brandId === brand.id ? '1px solid #FFC107' : '1px solid #333' }}
                onClick={() => onFilterChange('brandId', brand.id)}
              >
                <FaCarSide className="me-1" size={10}/>
                <span className="text-truncate">{brand.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="opacity-25 my-3"/>

      {/* 4. Fuel Type */}
      <div>
        <h6 className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Fuel</h6>
        <div className="d-flex flex-wrap gap-2">
          {filterOptions.fuelTypes.map(fuel => (
            <div 
              key={fuel.id} 
              className={`d-flex align-items-center px-1 rounded-1 ${activeFilters?.fuelTypeId === fuel.id ? 'text-warning fw-bold bg-dark' : 'text-secondary'}`}
              style={{ fontSize: '10px', cursor: 'pointer' }}
              onClick={() => onFilterChange('fuelTypeId', fuel.id)}
            >
              <FaGasPump className="me-1" size={9}/>
              <span>{fuel.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;