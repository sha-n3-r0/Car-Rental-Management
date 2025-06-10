import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Header from '@/Components/Header'; // Optional: remove if not needed

export default function StaffLogin({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.staff'));
    };

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };

    return (
        <>
            <Head title="Staff Login" />
            <div className="min-h-screen bg-white text-black">
                <Header auth={auth} />

                <main className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-6">
                        <h2 className="text-center text-3xl font-extrabold">Staff Login</h2>

                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
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
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            {errors.email === 'Please verify your email before logging in.' && (
                                <div>
                                    <Link
                                        href={route('verification.notice')}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Didn’t receive the verification email? Click here.
                                    </Link>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 text-sm">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                    />
                                    <span>Remember me</span>
                                </label>

                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        {/* Google Login */}
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full max-w-md flex items-center justify-center space-x-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
                                type="button"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                >
                                    <path
                                        d="M21.805 10.023h-9.38v3.957h5.388c-.228 1.212-1.615 3.558-5.388 3.558-3.245 0-5.9-2.688-5.9-6s2.655-6 5.9-6c1.843 0 3.08.783 3.79 1.46l2.585-2.49C16.165 5.21 14.247 4.46 12.425 4.46 7.703 4.46 4 8.105 4 12.79c0 4.683 3.703 8.33 8.425 8.33 4.845 0 8.067-3.398 8.067-8.187 0-.55-.06-.95-.687-1.01z"
                                        fill="#4285F4"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
