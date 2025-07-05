import React from 'react';

export default function About() {
  return (
    <>
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

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-center">
          {[
            {
              title: 'Regular Maintenance & Safety',
              description: 'Industry-standard checkups ensure worry-free travel.',
              img: 'https://img.icons8.com/?size=64&id=RgIsu09k5S3V&format=png'
            },
            {
              title: 'Fully Licensed & Compliant',
              description: 'We meet all legal and operational standards.',
              img: 'https://img.icons8.com/?size=48&id=6PEs2EypZuRA&format=png'
            },
            {
              title: 'Affordable Rates',
              description: 'Enjoy great prices without compromising quality.',
              img: 'https://img.icons8.com/?size=48&id=19417&format=png'
            },
            {
              title: '24/7 Availability',
              description: 'Book anytime, anywhere with round-the-clock support.',
              img: 'https://img.icons8.com/?size=64&id=94PgM3zLSuY3&format=png'
            }
          ].map((item, index) => (
            <div key={index}>
              <img src={item.img} alt={item.title} className="w-12 h-12 mx-auto mb-2" />
              <h4 className="text-xl font-bold text-[#F86808]">{item.title}</h4>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievement Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-[#F86808]">Achievement</span>
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mt-2">
          At CL CarHub, we take pride in providing exceptional service to every client.
        </p>
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

      {/* CL CarHub Info Section */}
      <section className="py-16 px-4 md:px-20 bg-white flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 p-6 space-y-4 text-left">
          <img src="/images/headerlogo.png" alt="CL CarHub Logo" className="h-20 w-auto mb-4" />
          <p className="text-gray-700 text-base">
            The <span className="font-bold text-[#F86808]">CL CarHub</span> Management System is a comprehensive platform
            designed to streamline and enhance the operations of a car dealership or rental service. It provides an
            all-in-one solution for managing vehicle inventory, customer records, sales transactions, and rental bookings
            efficiently.
          </p>
          <div className="flex items-center text-[#F86808] mt-4 font-semibold cursor-pointer">Rent Now!</div>
          <p className="text-gray-700 text-base">
            Transform the way you manage your car dealership or rental business with CL CarHub—the ultimate all-in-one
            solution designed to streamline operations, boost efficiency, and elevate customer experiences. Say goodbye to
            manual processes and hello to a smart, intuitive system that handles everything from inventory management,
            customer interactions, and sales tracking to online bookings, payments, and maintenance scheduling—all in one
            place!
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

        {/* Logo Carousel - Horizontal Scroll with Hover Effects */}
        <section className="bg-white py-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-800">Trusted Brands</h2>

        {/* Inline styles for marquee animation */}
        <style>{`
            @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
            }

            .animate-marquee {
            animation: marquee 30s linear infinite;
            }
        `}</style>

        <div className="overflow-hidden w-full">
            <div className="flex animate-marquee space-x-12 w-max">
            {Array(2).fill([
                { src: "https://img.icons8.com/?size=48&id=18840&format=png", alt: "Suzuki" },
                { src: "https://img.icons8.com/?size=48&id=57665&format=png", alt: "Toyota" },
                { src: "https://img.icons8.com/?size=48&id=18842&format=png", alt: "Honda" },
                { src: "https://img.icons8.com/?size=48&id=X-hVi3gUJDZv&format=png", alt: "Mitsubishi" },
                { src: "https://img.icons8.com/?size=48&id=58881&format=png", alt: "Hyundai" },
                { src: "https://img.icons8.com/?size=80&id=VzxQUkU2lzey&format=png", alt: "Ford" },
                { src: "https://img.icons8.com/?size=48&id=57661&format=png", alt: "Chevrolet" },
                { src: "https://img.icons8.com/?size=48&id=58806&format=png", alt: "Subaru" },
            ].map((logo, index) => (
                <img
                key={`${logo.alt}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="w-20 h-20 object-contain grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
                />
            )))}
            </div>
        </div>
        </section>
    </>
  );
}
