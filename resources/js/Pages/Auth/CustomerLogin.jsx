import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function CustomerLogin({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login.customer'));
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <>
      <Head title="Login" />

      <div className="min-h-screen bg-white">
        <Header auth={auth} />

        <div className="flex items-center justify-center">
          <div className="flex w-full max-w-5xl h-[700px] rounded-lg shadow-lg overflow-hidden mt-10 mb-20">
            {/* Left: Login Form */}
            <div className="w-full md:w-1/2 h-full px-10 py-12 bg-white flex flex-col justify-center">
              <div className="mb-8 flex justify-center">
                <img src="/images/headerlogo.png" alt="CL CarHub" className="h-12" />
              </div>

              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    required
                    className="w-full border-b-2 border-black py-2 px-1 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    required
                    className="w-full border-b-2 border-black py-2 px-1 focus:outline-none"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="text-right">
                  <Link href={route('password.request')} className="text-xs text-purple-600 hover:underline">
                    Forgot password
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#F86808] text-white py-2 rounded-full hover:bg-[#e25e07] transition"
                >
                  {processing ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="text-center mt-4 text-sm">
                Don’t have an account?{' '}
                <Link href={route('register')} className="text-purple-600 hover:underline">
                  Sign Up
                </Link>
              </div>

              <div className="flex items-center gap-2 my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="text-sm text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50"
                >
                  <img src="https://img.icons8.com/color/48/000000/google-logo.png" className="h-5 w-5" alt="Google" />
                  <span className="text-sm">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50"
                >
                  <img src="https://img.icons8.com/color/48/000000/facebook-new.png" className="h-5 w-5" alt="Facebook" />
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </div>

            {/* Right: Logo Panel */}
            <div className="hidden md:flex md:w-1/2 h-full bg-[#F86808] items-center justify-center p-10">
              <img
                src="https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/473263091_122121023654599808_4291320690137782421_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEnCnnjQlOm_S7-mvB7D5YGOdIAbMThI6E50gBsxOEjoazlqk99gxne2LlRlU1vDG6LUANpyitlp_UqRHtiCqBr&_nc_ohc=1_5NR__joToQ7kNvwGFI7ze&_nc_oc=AdlUNwrs2NJU1_2-iwQgcBX3x7ygAx82wgrgMY_bTzTCdbN38B4u0CdHGX5Kq-WElPE&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=J7T3tx4vE-lWOGg-DM5zyw&oh=00_AfOy_Cr-1KxzF5DuLfiCTLPSdz6SkAMjfB0KJ3qEU5fw0A&oe=68667484"
                alt="CL CarHub"
                className="w-3/4 max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
