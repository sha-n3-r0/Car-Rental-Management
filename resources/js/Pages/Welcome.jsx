import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Welcome({ auth, vehicles }) {
  const backgroundImages = [
    'https://img.sixt.com/1200/4dba252e-ea77-4580-9b41-1452dd88fcb6.jpg',
    'https://www.sixt.cz/css/components/homepage/cover--sixt-cz.jpeg',
    'https://www.pixelstalk.net/wp-content/uploads/images7/4K-Car-Wallpaper-HD.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head title="Welcome" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="min-h-screen bg-white text-black relative overflow-hidden">
        {/* Header */}
        <div className="relative z-20">
          <Header auth={auth} />
        </div>

        {/* Background Slider */}
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
              <p className="mt-4 font-semibold">
                Your journey starts here with unbeatable prices on the perfect wheels.
              </p>
              <p className="text-sm">Get a free upgrade + up to 25% off your rental.</p>
              <Link
                href="/reserve"
                className="inline-block mt-6 bg-[#F86808] px-6 py-3 rounded text-white hover:bg-[#d95b06] transition"
              >
                BOOK TODAY
              </Link>
            </div>
          </section>

          {/* Booking Form - Redesigned */}
          <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center px-4 pb-6">
            <div className="backdrop-blur-md bg-white/90 border border-[#F86808]/30 shadow-xl rounded-2xl p-6 w-full max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">

                {/* Cars only */}
                <div className="flex space-x-4 mb-4 md:mb-0">
                  <button className="flex items-center px-4 py-2 bg-black text-white rounded-full">
                    <i className="fas fa-car mr-2" /> Cars
                  </button>
                </div>

                {/* Location input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Airport, city or address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F86808] focus:outline-none"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F86808]" />
                </div>

                {/* Pickup Date & Time */}
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700">Pick-up date</label>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F86808]"
                  />
                  <input
                    type="time"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F86808]"
                  />
                </div>

                {/* Return Date & Time */}
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700">Return date</label>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F86808]"
                  />
                  <input
                    type="time"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F86808]"
                  />
                </div>

                {/* Show Cars Button */}
                <div className="flex">
                  <button className="px-6 py-3 bg-[#F86808] text-white font-bold rounded-lg hover:bg-[#d95b06] transition">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Section */}
        <section className="bg-white py-16 px-4 md:px-20">
          <h2 className="text-center text-3xl font-bold mb-4">
            OUR <span className="text-[#F86808]">FLEET</span>
          </h2>
          <p className="text-center text-gray-600 mb-10">
            A wide selection of reliable, well-maintained vehicles for every journey.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-md p-4 text-center">
                  <img
                    src={vehicle.image_url || '/images/default-vehicle.jpg'}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="font-bold text-lg">{vehicle.make} {vehicle.model}</h3>
                  <p className="text-sm text-gray-600">License Plate: {vehicle.license_plate}</p>
                  <div className="flex justify-center gap-4 mt-3 text-sm text-gray-700">
                    <span>👥 {vehicle.seats} Seats</span>
                    <span>🚗 {vehicle.doors} Doors</span>
                  </div>
                  <div className="flex justify-center gap-4 text-sm text-gray-700">
                    <span>🔧 {vehicle.transmission}</span>
                    <span>⛽ {vehicle.odometer} km</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 capitalize">Status: {vehicle.status}</p>
                  <p className="text-sm font-semibold text-[#F86808]">₱{vehicle.rental_rate_per_day} / day</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No vehicles found.</p>
            )}
          </div>
          <div className="text-center mt-10">
            <Link href="/fleet" className="bg-[#F86808] text-white px-6 py-3 rounded hover:bg-[#d95b06] transition">
              View All Vehicles
            </Link>
          </div>
        </section>

     {/* Why Choose Us */}
<section className="bg-[#F86808] text-white text-center py-10 relative">
  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-white"></div>
  <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
</section>

<section className="py-16 px-4 md:px-20 bg-white">
  {/* Hero Feature Card */}
  <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg bg-white">
    <div className="bg-[#F86808] text-white p-6 md:w-1/2 flex flex-col justify-center">
      <div className="space-y-6 max-w-md mx-auto text-left">
        <div>
          <h3 className="text-2xl font-bold">Effortless Vehicle Management</h3>
          <p className="text-sm">Real-time updates on availability, pricing, and condition.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Online Booking & Payments</h3>
          <p className="text-sm">Customers can browse, reserve, and pay 24/7.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Smart Service & Maintenance</h3>
          <p className="text-sm">Automated scheduling and repair tracking.</p>
        </div>
      </div>
    </div>
    <div className="md:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1493238792000-8113da705763?fm=jpg&q=60&w=3000"
        alt="Fleet"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Subtext */}
  <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg pt-9">
    We provide top-tier vehicles and dedicated service to make your rental experience smooth and reliable.
  </p>

  {/* Features with icon URLs */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-center">
    <div>
      <img
        src="https://img.icons8.com/?size=64&id=RgIsu09k5S3V&format=png"
        alt="Maintenance"
        className="w-12 h-12 mx-auto mb-2"
      />
      <h4 className="text-xl font-bold text-[#F86808]">Regular Maintenance & Safety</h4>
      <p className="text-gray-700">Industry-standard checkups ensure worry-free travel.</p>
    </div>
    <div>
      <img
        src="https://img.icons8.com/?size=48&id=6PEs2EypZuRA&format=png"
        alt="Licensed"
        className="w-12 h-12 mx-auto mb-2"
      />
      <h4 className="text-xl font-bold text-[#F86808]">Fully Licensed & Compliant</h4>
      <p className="text-gray-700">We meet all legal and operational standards.</p>
    </div>
    <div>
      <img
        src="https://img.icons8.com/?size=48&id=19417&format=png"
        alt="Affordable Rates"
        className="w-12 h-12 mx-auto mb-2"
      />
      <h4 className="text-xl font-bold text-[#F86808]">Affordable Rates</h4>
      <p className="text-gray-700">Enjoy great prices without compromising quality.</p>
    </div>
    <div>
      <img
        src="https://img.icons8.com/?size=64&id=94PgM3zLSuY3&format=png"
        alt="24/7"
        className="w-12 h-12 mx-auto mb-2"
      />
      <h4 className="text-xl font-bold text-[#F86808]">24/7 Availability</h4>
      <p className="text-gray-700">Book anytime, anywhere with round-the-clock support.</p>
    </div>
  </div>
</section>


        {/* Achievement Section */}
        <section className="py-16 px-6 md:px-20 bg-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-[#F86808]">Achievement</span>
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mt-2">At CL CarHub, we take pride in providing exceptional service to every client.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 shadow-md rounded">
              <h3 className="text-4xl font-bold text-[#F86808]">500+</h3>
              <p className="text-gray-700 font-semibold">Satisfied Customers</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded">
              <h3 className="text-4xl font-bold text-[#F86808]">150+</h3>
              <p className="text-gray-700 font-semibold">Successful Bookings</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded">
              <h3 className="text-4xl font-bold text-[#F86808]">20+</h3>
              <p className="text-gray-700 font-semibold">Vehicles Available</p>
            </div>
          </div>
        </section>

            {/* CL CarHub Info */}
        <section className="py-16 px-4 md:px-20 bg-white flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 p-6 space-y-4 text-left">
            <img src="/images/headerlogo.png" alt="CL CarHub Logo" className="h-20 w-auto mb-4" />
            <p className="text-gray-700 text-base">
              The <span className="font-bold text-[#F86808]">CL CarHub</span> Management System is a comprehensive platform designed to streamline and enhance the operations of a car dealership or rental service. It provides an all-in-one solution for managing vehicle inventory, customer records, sales transactions, and rental bookings efficiently.
            </p>
            <div className="flex items-center text-[#F86808] mt-4 font-semibold cursor-pointer">Rent Now!</div>
            <p className="text-gray-700 text-base">
              Transform the way you manage your car dealership or rental business with CL CarHub—the ultimate all-in-one solution designed to streamline operations, boost efficiency, and elevate customer experiences. Say goodbye to manual processes and hello to a smart, intuitive system that handles everything from inventory management, customer interactions, and sales tracking to online bookings, payments, and maintenance scheduling—all in one place!
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-6">
            <img
              src="https://img.sixt.com/1200/4dba252e-ea77-4580-9b41-1452dd88fcb6.jpg"
              alt="Car image 1"
              className="rounded shadow-md w-full object-cover"
            />
            <img
              src="https://www.pixelstalk.net/wp-content/uploads/images7/4K-Car-Wallpaper-HD.jpg"
              alt="Car image 2"
              className="rounded shadow-md w-full object-cover"
            />
          </div>
        </section>


        {/* Logo Carousel */}
<section className="bg-white py-8 flex justify-center overflow-hidden w-full">
  <div className="relative w-full max-w-7xl overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {/* Repeat only the logo group, no extra padding around */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex shrink-0">
          {[
            {
              src: "https://img.icons8.com/?size=48&id=18840&format=png",
              alt: "Suzuki"
            },
            {
              src: "https://img.icons8.com/?size=48&id=57665&format=png",
              alt: "Toyota"
            },
            {
              src: "https://img.icons8.com/?size=48&id=18842&format=png",
              alt: "Honda"
            },
            {
              src: "https://img.icons8.com/?size=48&id=X-hVi3gUJDZv&format=png",
              alt: "Mitsubishi"
            },
            {
              src: "https://img.icons8.com/?size=48&id=58881&format=png",
              alt: "Hyundai"
            },
            {
              src: "https://img.icons8.com/?size=80&id=VzxQUkU2lzey&format=png",
              alt: "Ford"
            },
            {
              src: "https://img.icons8.com/?size=48&id=57661&format=png",
              alt: "Chevrolet"
            },
            {
              src: "https://img.icons8.com/?size=48&id=58806&format=png",
              alt: "Subaru"
            }
          ].map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt={logo.alt}
              className="h-14 mx-8 filter grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      ))}
    </div>
  </div>

  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-marquee {
      display: flex;
      width: fit-content;
      animation: marquee 20s linear infinite;
    }
  `}</style>
</section>



        {/* Use the new Footer component */}
        <Footer />
      </div>
    </>
  );
}
