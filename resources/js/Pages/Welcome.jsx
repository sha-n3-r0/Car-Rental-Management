import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen bg-white text-black">
        <Header auth={auth} />

        <main className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold text-black">Welcome to Our App</h1>
        </main>
      </div>
    </>
  );
}
