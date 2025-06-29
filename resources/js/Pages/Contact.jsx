import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Contact({ auth, company }) {
  return (
    <>
      <Head title="Contact Us" />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50 text-gray-800">
        <Header auth={auth} />

        <main className="flex-grow max-w-7xl mx-auto py-16 px-4 sm:px-8 lg:px-12">
          {/* Intro Section */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase text-[#F86808] tracking-wider font-semibold mb-2">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#F86808]">Let’s Connect</h1>
            <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
              We'd love to hear from you — whether it's feedback, questions, partnership inquiries, or just a hello!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14">
            {/* Left Panel: Info Cards */}
            <div className="space-y-8">
              {/* Office Card */}
              <div className="p-6 bg-white border border-orange-100 rounded-xl shadow-md hover:shadow-lg transition group relative">
                <h2 className="text-lg font-semibold text-[#F86808] mb-1 flex items-center gap-2">📍 Our Office</h2>
                <p className="text-gray-700">{company?.location || 'Loading...'}</p>
                <div className="absolute right-full top-0 mt-0 mr-2 w-80 h-56 bg-white border border-[#F86808] p-2 rounded-xl shadow-lg transform -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 z-10">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7735.999187246096!2d121.16790454527359!3d14.194802044979392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd616206a6ae61%3A0xf39a3b145891ba56!2sHalang%2C%20Calamba%2C%204027%20Laguna!5e0!3m2!1sen!2sph!4v1750929020171!5m2!1sen!2sph`}
                    className="w-full h-full rounded"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 bg-white border border-orange-100 rounded-xl shadow-md hover:shadow-lg transition group relative">
                <h2 className="text-lg font-semibold text-[#F86808] mb-1 flex items-center gap-2">📞 Call Us</h2>
                <p className="text-gray-700">{company?.phone || 'Loading...'}</p>
                <div className="absolute right-full top-0 mr-2 w-48 h-full bg-white border border-[#F86808] p-4 rounded-xl shadow-md transform -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 flex flex-col items-center justify-center space-y-2 z-10">
                  <span className="text-sm text-gray-800">📱 Tap to Dial</span>
                  <a href={`tel:${company?.phone}`} className="bg-[#F86808] text-white px-4 py-2 rounded-full text-sm hover:brightness-105">Call</a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 bg-white border border-orange-100 rounded-xl shadow-md hover:shadow-lg transition group relative">
                <h2 className="text-lg font-semibold text-[#F86808] mb-1 flex items-center gap-2">📧 Email</h2>
                <p className="text-gray-700">{company?.email || 'Loading...'}</p>
                <div className="absolute right-full top-0 mr-2 w-56 bg-white border border-[#F86808] p-4 rounded-xl shadow-md transform -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 flex flex-col items-center space-y-3 z-10">
                  <span className="text-sm text-gray-700">Email Us:</span>
                  <div className="flex gap-2 w-full justify-center">
                    <a href={`mailto:${company?.email}`} className="bg-[#F86808] text-white px-3 py-1.5 rounded-full text-xs flex-1 text-center">Gmail</a>
                    <a href={`mailto:${company?.email}`} className="bg-gray-500 text-white px-3 py-1.5 rounded-full text-xs flex-1 text-center">Other</a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white border border-orange-100 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-[#F86808] mb-3">Follow Us</h2>
                <div className="flex flex-wrap gap-4 text-sm text-[#F86808] font-medium">
                  <a href="#" className="hover:underline flex items-center gap-1">🔵 Facebook</a>
                  <a href="#" className="hover:underline flex items-center gap-1">📸 Instagram</a>
                  <a href="#" className="hover:underline flex items-center gap-1">🐦 Twitter</a>
                  <a href="#" className="hover:underline flex items-center gap-1">🔗 LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Right Panel: Contact Form */}
            <div className="bg-white border border-orange-100 rounded-2xl shadow-xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-[#F86808] mb-6">📬 Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F86808] transition"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F86808] transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F86808] transition resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#F86808] hover:bg-[#fb7700] text-white font-semibold py-3 rounded-full text-sm transition shadow-lg"
                  >
                    🚀 Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
