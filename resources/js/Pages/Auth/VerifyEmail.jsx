// resources/js/Pages/Auth/VerifyEmail.jsx

import React from 'react';
import { usePage, router } from '@inertiajs/react';

export default function VerifyEmail() {
  const { props } = usePage();
  const status = props.status;

  const resendVerification = (e) => {
    e.preventDefault();
    router.post(route('verification.send'));
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Verify Your Email</h1>
      <p className="mb-4">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
      </p>
      <p>If you didn’t receive the email, we’ll gladly send you another.</p>

      {status === 'verification-link-sent' && (
        <div className="text-green-500 my-4">
          A new verification link has been sent to your email address.
        </div>
      )}

      <form onSubmit={resendVerification}>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Resend Verification Email
        </button>
      </form>
    </div>
  );
}
