import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function VerifyEmailNotice({ email }) {
  const { props } = usePage();
  const status = props.status;

  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState(
    status === 'verification-link-sent'
      ? 'A new verification link has been sent to your email.'
      : ''
  );

  const resendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    router.post(route('verification.send'), {}, {
      onSuccess: () => {
        setMessage('A new verification link has been sent to your email.');
        setIsSending(false);
      },
      onError: () => {
        setMessage('Failed to send verification link.');
        setIsSending(false);
      },
    });
  };

  const cancelVerification = () => {
    if (confirm('Are you sure you want to cancel and go to login page?')) {
      router.post(route('verification.cancel.login'));
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Email Verification Required</h1>

      <p className="mb-2">
        Your account <strong>{email}</strong> is not verified.
      </p>
      <p className="mb-4">
        Please check your inbox for the verification link.
      </p>

      {message && (
        <div className="text-green-600 mb-4">{message}</div>
      )}

      <form onSubmit={resendEmail}>
        <button
          type="submit"
          disabled={isSending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Resend Verification Email'}
        </button>
      </form>

      <button
        type="button" // Important: prevent form submission
        onClick={cancelVerification}
        className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Cancel and Go Back to Login
      </button>
    </div>
  );
}
