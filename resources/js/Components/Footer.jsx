// resources/js/Components/Footer.jsx

import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm py-10 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold text-[#F86808] mb-2">CL CarHub</h3>
          <p>Simplifying Car Rentals & Dealership Management</p>
          <p className="mt-2">📍 Halang, Calamba, Laguna</p>
          <p>📞 0912345678</p>
          <p>📧 yourclcarhub@gmail.com</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold text-[#F86808] mb-2">Quick Links</h4>
          <div className="flex flex-col space-y-1">
            <Link href="/" className="hover:text-[#F86808]">Home</Link>
            <Link href="/about" className="hover:text-[#F86808]">About Us</Link>
            <Link href="#" className="hover:text-[#F86808]">Services</Link>
            <Link href="#" className="hover:text-[#F86808]">Rentals</Link>
            <Link href="/contact" className="hover:text-[#F86808]">Contact Us</Link>
          </div>
        </div>

        {/* Social & Booking */}
        <div>
          <h4 className="font-semibold text-[#F86808] mb-2">Connect</h4>
          <p className="mb-1">📱 Follow Us:</p>
          <div className="flex flex-wrap gap-2 text-[#F86808]">
            <a href="#" className="hover:underline">🔵 Facebook</a>
            <a href="#" className="hover:underline">📸 Instagram</a>
            <a href="#" className="hover:underline">🐦 Twitter</a>
            <a href="#" className="hover:underline">🔗 LinkedIn</a>
          </div>
          <Link
            href="/reserve"
            className="inline-block mt-4 bg-[#F86808] px-4 py-2 rounded text-white hover:bg-[#d95b06] transition"
          >
            BOOK NOW
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} CL CarHub. All Rights Reserved. |{' '}
        <a href="#" className="hover:text-[#F86808]">Privacy Policy</a> |{' '}
        <a href="#" className="hover:text-[#F86808]">Terms & Conditions</a>
      </div>
    </footer>
  );
}
