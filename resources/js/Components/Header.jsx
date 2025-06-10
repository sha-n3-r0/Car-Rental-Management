import React from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Header({ auth }) {
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <header className="flex flex-col lg:flex-row justify-between items-center py-6 px-6 space-y-4 lg:space-y-0 bg-white shadow">
      <nav className="flex space-x-6">
        <Link href={route('home')} className="hover:underline text-black">Home</Link>
        <Link href={route('fleet')} className="hover:underline text-black">Fleet</Link>
        <Link href={route('reserve')} className="hover:underline text-black">Reserve</Link>
        <Link href={route('contact')} className="hover:underline text-black">Contact Us</Link>
        <Link href={route('about')} className="hover:underline text-black">About Us</Link>
      </nav>

      <div className="flex space-x-4 items-center">
        {auth?.user ? (
          <>
            <Link href={route('customer.dashboard')} className="hover:underline text-black">Dashboard</Link>
            <Link href={route('customer.profile')} className="hover:underline text-black">Profile</Link>
            <button
              onClick={handleLogout}
              className="text-black hover:underline cursor-pointer bg-transparent border-none p-0"
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href={route('customer.login')} className="hover:underline text-black">Log in</Link>
            <Link href={route('customer.register')} className="hover:underline text-black">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
