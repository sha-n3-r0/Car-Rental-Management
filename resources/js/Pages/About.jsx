import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function About({ auth, mission, certificates, proofOfTransactions }) {
  return (
    <>
      <Head title="About Us" />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
        <Header auth={auth} />

        {/* Hero Section */}
        <section className="relative bg-[#F86808] text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">About CL CarHub</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Empowering your journey with seamless car rentals & dealership solutions across Luzon.
          </p>
        </section>

        <main className="relative z-10 max-w-6xl mx-auto p-6 -mt-10 bg-white rounded-xl shadow-xl">
          {/* Mission & Why Choose Us */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-[#F86808]">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {mission ?? "We strive to provide high-quality transportation services across Luzon with integrity and customer satisfaction at our core."}
              </p>

              <h2 className="text-3xl font-semibold text-[#F86808] mt-8">Why Choose Us?</h2>
              <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                <li>🚗 Wide selection of vehicles</li>
                <li>💡 Smart management system</li>
                <li>📱 24/7 online booking and support</li>
                <li>🔧 Regular maintenance & safety checks</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://i.pinimg.com/originals/06/5f/ec/065fec9a7ba3f57e48df742ff7a217d1.gif"
                alt="About us car rental"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Features */}
          <section className="py-10 border-t border-gray-200 grid sm:grid-cols-3 gap-8 text-center">
            <FeatureCard icon="👥" title="Dedicated Team" description="Friendly, experienced team committed to ensuring you have a smooth booking & rental experience." />
            <FeatureCard icon="🛡️" title="Safe & Secure" description="We maintain strict safety standards and regular vehicle checks to ensure peace of mind." />
            <FeatureCard icon="📞" title="24/7 Support" description="Reach out anytime — we’re here to help with your questions and concerns around the clock." />
          </section>

          {/* Certificates */}
          <section className="mt-16 text-center">
            <h2 className="text-3xl font-semibold text-[#F86808] mb-4">Our Business Certificates & Permits</h2>
            <p className="text-gray-600 mb-8">We are fully compliant and certified for your trust and safety.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-center">
              {certificates.length > 0 ? (
                certificates.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-auto rounded-xl border border-gray-200 shadow hover:shadow-lg transform hover:scale-105 transition"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} // Hide broken images
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full">No certificates available.</p>
              )}
            </div>
          </section>

          {/* Proof of Transactions */}
          <section className="mt-20 text-center">
            <h2 className="text-3xl font-semibold text-[#F86808] mb-4">Proof of Transactions</h2>
            <p className="text-gray-600 mb-6">Here are some successful transactions from satisfied customers.</p>
            <ProofOfTransactionCarousel
              transactions={proofOfTransactions.length > 0 ? proofOfTransactions.map((img, idx) => ({ img, caption: `Proof ${idx + 1}` })) : []}
            />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-[#F8680810] border border-[#F8680830] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold mt-2 mb-2 text-[#F86808]">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Proof of Transaction Carousel Component
function ProofOfTransactionCarousel({ transactions }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500">No proof of transactions available.</p>;
  }

  const prevSlide = () => setCurrentIndex((currentIndex - 1 + transactions.length) % transactions.length);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % transactions.length);

  return (
    <div className="max-w-xl mx-auto relative">
      <img
        src={transactions[currentIndex].img}
        alt={transactions[currentIndex].caption}
        className="w-full rounded-xl shadow-lg"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <p className="mt-4 text-gray-700 font-semibold">{transactions[currentIndex].caption}</p>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F86808] text-white p-2 rounded-full hover:bg-[#d65a05] transition"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F86808] text-white p-2 rounded-full hover:bg-[#d65a05] transition"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}
