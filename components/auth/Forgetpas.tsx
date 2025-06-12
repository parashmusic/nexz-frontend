'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo_nexz.png';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Verification code sent to your email.');
        setStep('code');
      } else {
        alert(data.message || 'Failed to send code.');
      }
    } catch (err) {
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Code verified.');
        setStep('reset');
      } else {
        alert(data.message || 'Invalid or expired code.');
      }
    } catch (err) {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Password reset successfully!');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Reset failed.');
      }
    } catch (err) {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden">
          <Image src={logo} alt="Nexz Logo" width={32} height={32} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        {step === 'email'
          ? 'Forgot your password?'
          : step === 'code'
          ? 'Enter the Code'
          : 'Reset Password'}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-xs border border-white/20 rounded-md p-4 bg-black/30 backdrop-blur"
      >
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white px-3 py-2 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter the code sent to your email"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-transparent border border-white px-3 py-2 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border border-white px-3 py-2 rounded-md text-white placeholder-white/50 w-full focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-white/60 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent border border-white px-3 py-2 rounded-md text-white placeholder-white/50 w-full focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-white/60 cursor-pointer"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black py-2 rounded-md hover:bg-gray-200 transition font-semibold"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </motion.div>

      {step !== 'reset' && (
        <p className="mt-6 text-sm text-white/60">
          Remembered your password?{' '}
          <a
            href="/login"
            className="text-white font-medium underline hover:text-gray-300"
          >
            Log in
          </a>
        </p>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
