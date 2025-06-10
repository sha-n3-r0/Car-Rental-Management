import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy'; 

export default function Reserve({ auth }) {
  const homeUrl = route('home', {}, false, Ziggy);

  return (
    <>
      <Head title="Reserve" />
      <div className="min-h-screen bg-white text-black">
        <Header auth={auth} />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-4">Reserve Page</h1>
          <p className="mb-2">This is a dummy Reserve page for testing Ziggy routes.</p>
          <p>
            Go back to <a href={homeUrl} className="text-blue-600 hover:underline">Home</a>
          </p>
        </main>
      </div>
    </>
  );
}
