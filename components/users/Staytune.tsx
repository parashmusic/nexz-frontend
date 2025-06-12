'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ComingSoon() {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const generateParticles = () => {
      const temp = [];
      for (let i = 0; i < 40; i++) {
        temp.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
        });
      }
      setParticles(temp);
    };
    generateParticles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center overflow-hidden">

      {/* Background particles */}
      <div className="absolute inset-0 -z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: p.y }}
            animate={{ y: [p.y, p.y - 40, p.y] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              top: 0,
              left: p.x,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold mb-4 z-10"
      >
        Hi 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg text-white/80 z-10"
      >
        Stay tuned, launching the app soon 🚀
      </motion.p>

      <motion.button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </div>
  );
}
