import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ForgotPassword() {
  const { data, setData, post, errors, processing, status } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <div>
      <h1>Forgot your password?</h1>
      {status && <p className="text-green-500">{status}</p>}
      <form onSubmit={submit}>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <p>{errors.email}</p>}
        <button type="submit" disabled={processing}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
}