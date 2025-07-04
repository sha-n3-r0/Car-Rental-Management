import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import NotificationBell from '@/Components/NotificationBell';

export default function Header({ auth }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { url } = usePage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => Inertia.post('/logout');

  const NavLink = ({ href, label }) => {
    const isActive = url === href || (href !== '/' && url.startsWith(href));
    return (
      <Link
        href={href}
        className={`relative font-medium px-2 py-1 text-[#F86808] hover:text-[#d95b06] transition ${
          isActive
            ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#F86808]'
            : ''
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-md shadow border-b border-gray-200'
            : 'bg-white'
        }`}
      >
        <div className="h-24 flex items-center justify-between max-w-7xl mx-auto px-4">
          {/* Logo */}
          <Link
            href="/"
            className="transition-transform duration-300"
            style={{ transform: isScrolled ? 'scale(0.92)' : 'scale(1.05)' }}
          >
            <img
              src="/images/headerlogo.png"
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex lg:space-x-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/fleet" label="Fleet" />
            {auth?.user && <NavLink href="/reserve" label="Reserve" />}
            <NavLink href="/contact" label="Contact Us" />
            <NavLink href="/about" label="About Us" />
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Show Notification Bell only when the user is logged in */}
            {auth?.user && <NotificationBell />}

            {auth?.user ? (
              <>
                {/* Profile Links */}
                <Link
                  href="/customer/dashboard"
                  className="text-[#F86808] hover:text-[#d95b06] text-lg"
                >
                  Dashboard
                </Link>
                <Link
                  href="/customer/profile"
                  className="text-[#F86808] hover:text-[#d95b06] text-lg"
                >
                  Profile
                </Link>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-[#F86808] hover:text-[#d95b06] text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login/Register Links */}
                <Link
                  href="/login"
                  className="text-sm bg-[#F86808] text-white px-4 py-1.5 rounded-full hover:bg-[#d95b06]"
                >
                  Login
                </Link>
                <Link
                  href="/customer/register"
                  className="text-sm border border-[#F86808] text-[#F86808] px-4 py-1.5 rounded-full hover:bg-[#F86808] hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-2xl text-[#F86808]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col px-4 py-2 bg-white border-t border-gray-100">
            <NavLink href="/" label="Home" />
            <NavLink href="/fleet" label="Fleet" />
            <NavLink href="/reserve" label="Reserve" />
            <NavLink href="/contact" label="Contact Us" />
            <NavLink href="/about" label="About Us" />
            
            {/* Show Notification Bell in Mobile Menu only when user is logged in */}
            {auth?.user && <NotificationBell />}
            
            {!auth?.user ? (
              <>
                <Link
                  href="/login"
                  className="mt-2 bg-[#F86808] text-white px-4 py-2 rounded"
                >
                  Login
                </Link>
                <Link
                  href="/customer/register"
                  className="mt-2 border border-[#F86808] text-[#F86808] px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="mt-2 text-[#F86808]"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Push page content below fixed header */}
      <div className="h-24" />
    </>
  );
}
