import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy';

export default function Contact({ auth }) {
  const fleetUrl = route('home', {}, false, Ziggy);

  return (
    <>
      <Head title="Contact" />
      <div className="min-h-screen bg-white text-black">
        <Header auth={auth} />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-4">Contact Page</h1>
          <p className="mb-2">This is a dummy Contact page for testing Ziggy routes.</p>
          <p>
            Check out our{' '}
            <a href={fleetUrl} className="text-blue-600 hover:underline">
              Fleet
            </a>
          </p>
        </main>
      </div>
    </>
  );
}
