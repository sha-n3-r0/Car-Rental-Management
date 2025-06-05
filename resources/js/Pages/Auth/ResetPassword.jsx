import React from 'react';
import { useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, errors, processing } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.store'));
  };

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        value={data.email}
        onChange={(e) => setData('email', e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={data.password}
        onChange={(e) => setData('password', e.target.value)}
        placeholder="New Password"
      />
      <input
        type="password"
        value={data.password_confirmation}
        onChange={(e) => setData('password_confirmation', e.target.value)}
        placeholder="Confirm Password"
      />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit" disabled={processing}>
        Reset Password
      </button>
    </form>
  );
}
