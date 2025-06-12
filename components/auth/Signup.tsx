'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo_nexz.png';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Zod schema for validation
const schema = z
  .object({
    email: z.string().email('Invalid email address'),
    fullName: z.string().min(1, 'Full name is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(11, 'Password must be at most 11 characters')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[0-9]/, 'Must include a number')
      .regex(/[^a-zA-Z0-9]/, 'Must include a special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.msg || 'Something went wrong');

    alert('Account created successfully!');
    window.location.href = '/login'; // or use router.push('/login') if using `useRouter`
  } catch (err: any) {
    alert(err.message || 'Signup failed');
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden">
          <Image src={logo} alt="Nexz Logo" width={32} height={32} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Create an account</h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-xs border border-white/20 rounded-md p-4 bg-black/30 backdrop-blur"
      >
        <button
          type="button"
          className="flex items-center justify-center gap-3 border border-white w-full px-5 py-2 rounded-md bg-transparent text-white hover:bg-white hover:text-black transition mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-white/30" />
          <span className="mx-1 text-white/50 text-sm">OR</span>
          <hr className="flex-grow border-white/30" />
        </div>

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

          <div>
            <input
              type="text"
              placeholder="Full name"
              {...register('fullName')}
              className="bg-transparent border border-white px-3 py-1.5 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white w-full"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
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

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              className="bg-transparent border border-white px-3 py-1.5 rounded-md text-white placeholder-white/50 w-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-white/60 cursor-pointer"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-white text-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
          >
            Create account
          </button>
        </form>
      </motion.div>

      <p className="mt-5 text-sm text-white/60">
        Already have an account?{' '}
        <a href="/login" className="text-white font-medium underline hover:text-gray-300">
          Login
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

export default SignupPage;
