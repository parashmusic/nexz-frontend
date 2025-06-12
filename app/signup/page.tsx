'use client';

import React from 'react';
import Signup from '@/components/auth/Signup';
import LoginPage from '@/components/auth/Login';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Signup />
    </div>
  );
};

export default SignupPage;