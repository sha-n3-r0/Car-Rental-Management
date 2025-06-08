import React from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function CustomerRegister({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register.customer'));
    };

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };

    return (
        <>
            <Head title="Customer Registration" />
            <div className="min-h-screen bg-white text-black">
                <Header auth={auth} />

                <main className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-6">
                        <h2 className="text-center text-3xl font-extrabold">Customer Registration</h2>

                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Registering...' : 'Register'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center justify-center">
                            <span className="text-gray-500 text-sm">or</span>
                        </div>

                        {/* Google Sign-In Button */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full border border-gray-300 text-black py-2 px-4 rounded hover:bg-gray-100"
                        >
                            Sign in with Google
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}
