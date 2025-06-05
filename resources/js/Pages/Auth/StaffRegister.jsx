import React from 'react';
import { useForm } from '@inertiajs/react';

export default function StaffRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'staff',  // Hardcoded role as staff
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register.staff'));  // Correct route for staff registration
    };

    return (
        <div>
            <h2>Staff Registration</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group">
                    <label>Name</label><br />
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label>Email</label><br />
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                    <label>Confirm Password</label><br />
                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={processing}>
                    {processing ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
