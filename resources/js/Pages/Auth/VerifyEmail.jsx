import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';   

export default function VerifyEmail() {
  const { props } = usePage();
  const status = props.status;
  const isVerified = props.isVerified;

  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({ only: ['isVerified'] }); // Only reload the verification status
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  useEffect(() => {
    if (isVerified) {
      // Redirect to dashboard depending on role, or a general one
      router.visit('/email/verify/notice'); // you already have logic there that redirects by role
    }
  }, [isVerified]);

  const resendVerification = (e) => {
    e.preventDefault();
    router.post(route('verification.send'));
  };

  const cancelVerification = () => {
    if (confirm('Are you sure you want to cancel and go back to registration?')) {
      router.post(route('verification.notice.register'));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Verify Your Email</h1>
      <p className="mb-4">
        Thanks for signing up! Before getting started, please verify your email address by clicking the link we just emailed you.
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
      <button
        type="button"
        onClick={cancelVerification}
        className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Cancel and Go Back to Registration
      </button>
    </div>
  );
}
