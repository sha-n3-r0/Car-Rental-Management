import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import FleetSection from '@/Components/Home/FleetSection';
import About from '@/Components/Home/About';

export default function Welcome({ auth, vehicles }) {
  const backgroundImages = [
    'https://img.sixt.com/1200/4dba252e-ea77-4580-9b41-1452dd88fcb6.jpg',
    'https://www.sixt.cz/css/components/homepage/cover--sixt-cz.jpeg',
    'https://www.pixelstalk.net/wp-content/uploads/images7/4K-Car-Wallpaper-HD.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [suggestions, setSuggestions] = useState([]); // Store suggestions

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch vehicle suggestions based on search input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.length >= 3) {
      // Fetch matching vehicles when query length is 3 or more characters
      const filteredSuggestions = vehicles.filter((vehicle) => 
        `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  // Handle when a suggestion is selected
  const handleSuggestionClick = (vehicle) => {
    setSearchQuery(`${vehicle.make} ${vehicle.model}`);
    setSuggestions([]); // Clear suggestions
  };

  // Handle search button click
  const handleSearch = () => {
    if (!pickupDate || !returnDate) {
      alert('Please select both Pick-up and Return dates.');
      return;
    }

    router.get(route('vehicles.search'), {
      start_date: pickupDate,
      end_date: returnDate,
    });
  };

  return (
    <>
      <Head title="Welcome" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="min-h-screen bg-white text-black relative overflow-hidden">
        <div className="relative z-20">
          <Header auth={auth} />
        </div>

        {/* Background Image Slider */}
        <div className="relative w-full h-[75vh] z-0 overflow-hidden">
          {backgroundImages.map((url, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${url})`,
                opacity: currentImageIndex === index ? 1 : 0,
                zIndex: currentImageIndex === index ? 10 : 0,
              }}
            />
          ))}

          {/* Hero Section */}
          <section className="relative z-10 min-h-[75vh] flex flex-col justify-center px-4 md:px-20 text-white text-left">
            <div className="max-w-xl space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-[#F86808]">LOOKING FOR A RIDE</h1>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white -mt-2">TO EXPLORE LUZON?</h1>
              <p className="mt-4 font-semibold">Your journey starts here with unbeatable prices on the perfect wheels.</p>
              <p className="text-sm">Get a free upgrade + up to 25% off your rental.</p>
              <Link
                href="/reserve"
                className="inline-block mt-6 bg-[#F86808] px-6 py-3 rounded text-white hover:bg-[#d95b06] transition"
              >
                BOOK TODAY
              </Link>
            </div>
          </section>

          {/* Booking Form */}
          <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center px-4 pb-6">
            <div className="backdrop-blur-md bg-white/90 border border-[#F86808]/30 shadow-xl rounded-2xl p-6 w-full max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex space-x-4 mb-4 md:mb-0">
                  <button className="flex items-center px-4 py-2 bg-black text-white rounded-full">
                    <i className="fas fa-car mr-2" /> Cars
                  </button>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for vehicles"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F86808] focus:outline-none"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F86808]" />

                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-20 max-h-60 overflow-y-auto">
                      {suggestions.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          onClick={() => handleSuggestionClick(vehicle)}
                          className="p-2 cursor-pointer hover:bg-[#F86808] hover:text-white transition"
                        >
                          {vehicle.make} {vehicle.model}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700">Pick-up date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F86808]"
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700">Return date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F86808]"
                  />
                </div>

                <div className="flex">
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-[#F86808] text-white font-bold rounded-lg hover:bg-[#d95b06] transition"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Section */}
        <FleetSection vehicles={vehicles} />

        <About />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
