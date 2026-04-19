import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar'; 
import VehicleCard from '../components/VehicleCard';
import BookingModal from '../components/BookingModal'; 
import api from '../services/api';

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]); 
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    categoryId: null,
    transmissionId: null,
    capacityId: null,
    brandId: null,
    fuelTypeId: null
  });

  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    fuelTypes: [],
    transmissions: [],
    brands: [],
    capacities: []
  });

  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, catRes, fuelRes, transRes, brandRes, capRes] = await Promise.all([
          api.get('/cars/all'),
          api.get('/categories/all'),
          api.get('/fuel-types/all'),
          api.get('/transmissions/all'),
          api.get('/brands/all'),
          api.get('/capacities/all')
        ]);

        setVehicles(carsRes.data);
        setFilteredVehicles(carsRes.data);
        
        setFilterOptions({
          categories: catRes.data || [],
          fuelTypes: fuelRes.data || [],
          transmissions: transRes.data || [],
          brands: brandRes.data || [],
          capacities: capRes.data || []
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setActiveFilters({
        categoryId: null,
        transmissionId: null,
        capacityId: null,
        brandId: null,
        fuelTypeId: null
      });
      return;
    }
    setActiveFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value 
    }));
  };

  useEffect(() => {
    let result = vehicles;

    // Brand Filter
    if (activeFilters.brandId) {
      const selected = filterOptions.brands.find(b => b.id === activeFilters.brandId);
      if (selected) {
        result = result.filter(car => car.brandName === selected.value);
      }
    }

    // Category Filter
    if (activeFilters.categoryId) {
      const selected = filterOptions.categories.find(c => c.id === activeFilters.categoryId);
      if (selected) {
        result = result.filter(car => car.categoryName === selected.value);
      }
    }

    // Transmission Filter
    if (activeFilters.transmissionId) {
      const selected = filterOptions.transmissions.find(t => t.id === activeFilters.transmissionId);
      if (selected) {
        result = result.filter(car => car.transmissionType === selected.value);
      }
    }

    // Capacity Filter
    if (activeFilters.capacityId) {
      const selected = filterOptions.capacities.find(c => c.id === activeFilters.capacityId);
      if (selected) {
        result = result.filter(car => car.seatingCapacity == selected.value);
      }
    }

    // Fuel Type Filter
    if (activeFilters.fuelTypeId) {
      const selected = filterOptions.fuelTypes.find(f => f.id === activeFilters.fuelTypeId);
      if (selected) {
        result = result.filter(car => car.fuelTypeName === selected.value);
      }
    }

    setFilteredVehicles(result);
  }, [activeFilters, vehicles, filterOptions]);

  const handleOpenModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  if (loading) return <div className="text-center mt-5 text-white">Loading Vehicles...</div>;

  return (
    <>
      <div className="container-fluid mt-4 px-lg-5">
        <div className="row">
          <div className="col-lg-3 col-xl-2 mb-4">

            <FilterBar 
              onFilterChange={handleFilterChange} 
              activeFilters={activeFilters} 
              filterOptions={filterOptions} 
            />
          </div>

          <div className="col-lg-9 col-xl-10">
            <div className="row">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map(car => (
                  <div key={car.carId} className="col-md-6 col-xl-4 mb-4">
                    <VehicleCard 
                      car={car}
                      onShowDetails={() => handleOpenModal(car)} 
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-5 text-secondary">
                  <h5>No vehicles found matching your filters.</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <BookingModal 
          car={selectedCar} 
          show={showModal} 
          handleClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default VehiclePage;