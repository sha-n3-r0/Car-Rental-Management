import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage, router, Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import VehicleDetails from '@/Components/Reservation/VehicleDetails';
import LicenseVerification from '@/Components/Reservation/LicenseVerification';
import TimeInputs from '@/Components/Reservation/TimeInputs';
import LocationInputs from '@/Components/Reservation/LocationInputs';
import PaymentInputs from '@/Components/Reservation/PaymentInputs';
import PromoCodeInput from '@/Components/Reservation/PromoCodeInput';
import TermsAndSignature from '@/Components/Reservation/TermsAndSignature';
import NotesInput from '@/Components/Reservation/NotesInput';
import ReserveButton from '@/Components/Reservation/ReserveButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Reserve({ vehicle_id, start_date, end_date }) {
  const { auth } = usePage().props;
  const [vehicle, setVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicle_id || null);
  const [startDate, setStartDate] = useState(start_date ? new Date(start_date) : null);
  const [endDate, setEndDate] = useState(end_date ? new Date(end_date) : null);
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    axios.get('/api/vehicles')
      .then(res => {
        setVehicles(res.data);
        if (!vehicle_id) {
          setSelectedVehicle(res.data[0]?.id);
        }
      })
      .catch(() => {
        setMessage('❌ Failed to fetch vehicle data.');
      });
  }, [vehicle_id]);

  useEffect(() => {
    if (selectedVehicle) {
      axios.get(`/api/vehicles/${selectedVehicle}`)
        .then(res => {
          setVehicle(res.data.vehicle);
        })
        .catch(() => {
          setMessage('❌ Failed to fetch vehicle details.');
        });
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (startDate && endDate) {
      checkAvailability();
    }
  }, [startDate, endDate]); // Automatically check availability when start or end date changes

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.max(1, Math.ceil((endDate - startDate) / msPerDay));
  };

  const estimatedCost = vehicle ? calculateDays() * vehicle.rental_rate_per_day : 0;
  const loyaltyPoints = Math.floor(estimatedCost / 500);

  const checkAvailability = async () => {
    setAvailable(null);
    setMessage('');
    try {
      const { data } = await axios.get(`/vehicles/${selectedVehicle}/availability`, {
        params: {
          start_date: startDate?.toISOString().split('T')[0],
          end_date: endDate?.toISOString().split('T')[0],
        },
      });
      setAvailable(data.available);
    } catch (error) {
      setMessage('❌ Failed to check availability.');
    }
  };

  const handleSubmit = async () => {
    setMessage('');

    // Check if vehicle is available
    if (available === false) {
      return setMessage('❗ The selected vehicle is not available for the selected dates.');
    }

    if (!startDate || !endDate) return setMessage('❗ Select both start and end dates.');
    if (endDate <= startDate) return setMessage('❗ End date must be after start date.');
    if (!pickupTime || !dropoffTime) return setMessage('❗ Provide both pickup and drop-off time.');
    if (!pickupLocation || !dropoffLocation) return setMessage('❗ Provide pickup/drop-off locations.');
    if (!paymentMethod) return setMessage('❗ Select a payment method.');
    if (!transactionRef) return setMessage('❗ Enter transaction reference number.');
    if (!paymentProof) return setMessage('❗ Upload payment proof.');
    if (!signatureName) return setMessage('❗ Provide signature name.');
    if (!agreed) return setMessage('❗ You must agree to the terms.');

    const formData = new FormData();
    formData.append('vehicle_id', selectedVehicle);
    formData.append('start_date', startDate.toISOString().split('T')[0]);
    formData.append('end_date', endDate.toISOString().split('T')[0]);
    formData.append('pickup_time', pickupTime);
    formData.append('dropoff_time', dropoffTime);
    formData.append('pickup_location', pickupLocation);
    formData.append('dropoff_location', dropoffLocation);
    formData.append('payment_method', paymentMethod);
    formData.append('transaction_reference_no', transactionRef);
    formData.append('payment_proof', paymentProof);
    formData.append('promo_code', promoCode);
    formData.append('notes', notes);

    try {
      await axios.post('/customer/reservations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.visit('/reservation/summary');
    } catch (err) {
      setMessage('❌ Reservation submission failed.');
    }
  };

  return (
    <>
      <Head title="Reserve Vehicle" />
      <Header auth={auth} />
      <div className="h-12" />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Reservation Form</h1>

        {/* Vehicle selection */}
        <div className="mb-4">
          <label className="text-lg font-medium">Select a Vehicle</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedVehicle || ''}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="">-- Select Vehicle --</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model}
              </option>
            ))}
          </select>
        </div>

        {/* Display selected vehicle details */}
        {vehicle && (
          <VehicleDetails
            vehicle={vehicle}
            estimatedCost={estimatedCost}
            loyaltyPoints={loyaltyPoints}
          />
        )}

        <LicenseVerification licenseStatus={auth?.user?.license?.status} />

        {/* DatePicker component for start and end date */}
        <div className="mb-6 space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-lg font-medium mb-2">Start Date</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholderText="yyyy/MM/dd"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="endDate" className="block text-lg font-medium mb-2">End Date</label>
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholderText="yyyy/MM/dd"
              />
            </div>
          </div>

          {/* Availability status */}
          <div className="mt-4">
            {available !== null && (
              <div className="mt-4">
                {available ? (
                  <p className="text-green-600">✅ Vehicle is available!</p>
                ) : (
                  <p className="text-red-600">❌ Vehicle is not available for selected dates.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <TimeInputs
          pickupTime={pickupTime}
          setPickupTime={setPickupTime}
          dropoffTime={dropoffTime}
          setDropoffTime={setDropoffTime}
        />

        <LocationInputs
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          dropoffLocation={dropoffLocation}
          setDropoffLocation={setDropoffLocation}
        />

        <PaymentInputs
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          transactionRef={transactionRef}
          setTransactionRef={setTransactionRef}
          paymentProof={paymentProof}
          setPaymentProof={setPaymentProof}
        />

        <PromoCodeInput promoCode={promoCode} setPromoCode={setPromoCode} />
        <TermsAndSignature
          agreed={agreed}
          setAgreed={setAgreed}
          signatureName={signatureName}
          setSignatureName={setSignatureName}
        />
        <NotesInput notes={notes} setNotes={setNotes} />

        {message && <div className="text-red-600 mb-4">{message}</div>}

        <div className="text-center mt-8">
          <ReserveButton handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
