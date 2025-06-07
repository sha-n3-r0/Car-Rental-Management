import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen bg-white text-black">
        <header className="flex flex-col lg:flex-row justify-between items-center py-6 px-6 space-y-4 lg:space-y-0 bg-white">
          <nav className="flex space-x-6">
            <Link href={route('home')} className="hover:underline text-black">Home</Link>
            <Link href={route('fleet')} className="hover:underline text-black">Fleet</Link>
            <Link href={route('contact')} className="hover:underline text-black">Contact Us</Link>
            <Link href={route('about')} className="hover:underline text-black">About Us</Link>
          </nav>

          <div className="flex space-x-4">
            {auth.user ? (
              <Link href={route('dashboard')} className="hover:underline text-black">Dashboard</Link>
            ) : (
              <>
                <Link href={route('customer.login')} className="hover:underline text-black">Log in</Link>
                <Link href={route('customer.register')} className="hover:underline text-black">Register</Link>
              </>
            )}
          </div>
        </header>

        <main className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold text-black">Welcome to Our App</h1>
        </main>
      </div>
    </>
  );
}
