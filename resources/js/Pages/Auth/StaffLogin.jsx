import React from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function StaffLogin() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login.staff')); // make sure this is the staff login POST route
  };

  return (
    <div>
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            required
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            required
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        {/* Show verification link only if unverified email error */}
        {errors.email === 'Please verify your email before logging in.' && (
          <div style={{ marginTop: '10px' }}>
            <Link href={route('verification.notice')} className="text-sm text-blue-600 hover:underline">
              Didn't receive the verification email? Verify your account here.
            </Link>
          </div>
        )}

        <button type="submit" disabled={processing} style={{ marginTop: '10px' }}>
          {processing ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
