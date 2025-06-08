'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ThreeCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (e.clientX - centerX) / 10;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 1, ease: 'back.out(1.7)' }}
      className="w-64 h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border border-white/10 backdrop-blur-lg cursor-pointer transition-transform duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card content */}
      <div className="h-full flex flex-col justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
          <span className="text-white font-semibold">nexz</span>
        </div>

        {/* Card number */}
        <div className="text-white/80 text-lg font-mono tracking-wider">
          •••• •••• •••• 1234
        </div>

        {/* Cardholder info */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-white/60 text-xs uppercase tracking-wide">
              Cardholder
            </div>
            <div className="text-white font-medium">John Doe</div>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-wide">
              Expires
            </div>
            <div className="text-white font-medium">12/27</div>
          </div>
        </div>
      </div>

      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 20}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ThreeCard;