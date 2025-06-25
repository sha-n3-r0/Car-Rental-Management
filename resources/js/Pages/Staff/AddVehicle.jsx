import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import StaffLayout from '@/Layouts/StaffLayout';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    license_plate: '',
    vin: '',
    make: '',
    model: '',
    year: '',
    color: '',
    seats: '',
    vehicle_type: 'sedan',
    transmission: 'automatic',
    fuel_type: 'petrol',
    odometer: '',
    status: 'available',
    rental_rate_per_day: '',
    late_fee_per_day: '',
    last_service_date: '',
    insurance_expiry_date: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      // Only append if not null or empty string for required fields
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    axios
      .post('/staff/vehicles', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        Inertia.visit('/staff/vehicles', {
          preserveScroll: true,
        });
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <StaffLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Add New Vehicle</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* License Plate */}
          <div>
            <label className="block mb-1">License Plate</label>
            <input
              type="text"
              name="license_plate"
              value={formData.license_plate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.license_plate && <p className="text-red-600 text-sm">{errors.license_plate}</p>}
          </div>

          {/* VIN */}
          <div>
            <label className="block mb-1">VIN (optional)</label>
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.vin && <p className="text-red-600 text-sm">{errors.vin}</p>}
          </div>

          {/* Make */}
          <div>
            <label className="block mb-1">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.make && <p className="text-red-600 text-sm">{errors.make}</p>}
          </div>

          {/* Model */}
          <div>
            <label className="block mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.model && <p className="text-red-600 text-sm">{errors.model}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="block mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.year && <p className="text-red-600 text-sm">{errors.year}</p>}
          </div>

          {/* Color */}
          <div>
            <label className="block mb-1">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.color && <p className="text-red-600 text-sm">{errors.color}</p>}
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-1">Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.seats && <p className="text-red-600 text-sm">{errors.seats}</p>}
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block mb-1">Vehicle Type</label>
            <select
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="coupe">Coupe</option>
              <option value="convertible">Convertible</option>
              <option value="wagon">Wagon</option>
              <option value="other">Other</option>
            </select>
            {errors.vehicle_type && <p className="text-red-600 text-sm">{errors.vehicle_type}</p>}
          </div>

          {/* Transmission */}
          <div>
            <label className="block mb-1">Transmission</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            {errors.transmission && <p className="text-red-600 text-sm">{errors.transmission}</p>}
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block mb-1">Fuel Type</label>
            <select
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
            {errors.fuel_type && <p className="text-red-600 text-sm">{errors.fuel_type}</p>}
          </div>

          {/* Odometer */}
          <div>
            <label className="block mb-1">Odometer</label>
            <input
              type="number"
              name="odometer"
              value={formData.odometer}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.odometer && <p className="text-red-600 text-sm">{errors.odometer}</p>}
          </div>

          {/* Rental Rate */}
          <div>
            <label className="block mb-1">Rental Rate (per day)</label>
            <input
              type="number"
              step="0.01"
              name="rental_rate_per_day"
              value={formData.rental_rate_per_day}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.rental_rate_per_day && <p className="text-red-600 text-sm">{errors.rental_rate_per_day}</p>}
          </div>

          {/* Late Fee */}
          <div>
            <label className="block mb-1">Late Fee (per day)</label>
            <input
              type="number"
              step="0.01"
              name="late_fee_per_day"
              value={formData.late_fee_per_day}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.late_fee_per_day && <p className="text-red-600 text-sm">{errors.late_fee_per_day}</p>}
          </div>

          {/* Last Service Date */}
          <div>
            <label className="block mb-1">Last Service Date</label>
            <input
              type="date"
              name="last_service_date"
              value={formData.last_service_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.last_service_date && <p className="text-red-600 text-sm">{errors.last_service_date}</p>}
          </div>

          {/* Insurance Expiry Date */}
          <div>
            <label className="block mb-1">Insurance Expiry Date</label>
            <input
              type="date"
              name="insurance_expiry_date"
              value={formData.insurance_expiry_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.insurance_expiry_date && <p className="text-red-600 text-sm">{errors.insurance_expiry_date}</p>}
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
              className="w-full border px-3 py-2 rounded"
            />
            {errors.image && <p className="text-red-600 text-sm">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Create Vehicle
            </button>
          </div>
        </form>
      </div>
    </StaffLayout>
  );
};

export default AddVehicle;
