'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo_nexz.png';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Login failed');
      }

      localStorage.setItem('token', result.token);
      router.push('/staytune');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden">
          <Image src={logo} alt="Nexz Logo" width={32} height={32} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-xs border border-white/20 rounded-md p-4 bg-black/30 backdrop-blur"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register('email')}
              className="bg-transparent border border-white px-3 py-1.5 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className="bg-transparent border border-white px-3 py-1.5 rounded-md text-white placeholder-white/50 w-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/60 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          <div className="text-right text-sm text-white/60 hover:text-white cursor-pointer">
            <a href="/password" className="underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="bg-white text-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
          >
            Login
          </button>
        </form>
      </motion.div>

      <p className="mt-6 text-sm text-white/60">
        Don’t have an account?{' '}
        <a href="/signup" className="text-white font-medium underline hover:text-gray-300">
          Sign up
        </a>
      </p>

      <div className="flex space-x-4 mt-5 text-white/40">
        <FaFacebookF className="cursor-pointer hover:text-white" />
        <FaTwitter className="cursor-pointer hover:text-white" />
        <FaInstagram className="cursor-pointer hover:text-white" />
        <FaLinkedinIn className="cursor-pointer hover:text-white" />
      </div>
    </div>
  );
};

export default LoginPage;
