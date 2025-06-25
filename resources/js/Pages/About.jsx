import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy'; 
export default function About({ auth }) {
  const contactUrl = route('home', {}, false, Ziggy);

  return (
    <>
      <Head title="About" />
      <div className="min-h-screen bg-white text-black">
        <Header auth={auth} />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-4">About Page</h1>
          <p className="mb-2">This is a dummy About page for testing Ziggy routes.</p>
          <p>
            Need to get in touch? Visit our{' '}
            <a href={contactUrl} className="text-blue-600 hover:underline">
              Contact
            </a>{' '}
            page.
          </p>
        </main>
      </div>
    </>
  );
}
