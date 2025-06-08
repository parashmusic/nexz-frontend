'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const FloatingCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards entrance
      gsap.fromTo(
        '.floating-card',
        {
          y: 100,
          opacity: 0,
          rotationY: 45,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 1.8,
        }
      );

      // Continuous floating animation
      gsap.to('.floating-card', {
        y: '+=20',
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      id: 1,
      type: 'visa',
      color: 'from-blue-500 to-blue-600',
      number: '•••• 4532',
      name: 'ALEX SMITH',
      position: { top: '10%', left: '-20%' },
    },
    {
      id: 2,
      type: 'mastercard',
      color: 'from-purple-500 to-pink-500',
      number: '•••• 8901',
      name: 'SARAH JONES',
      position: { top: '60%', left: '-30%' },
    },
    {
      id: 3,
      type: 'nexz',
      color: 'from-gray-800 to-gray-900',
      number: '•••• 2468',
      name: 'MIKE WILSON',
      position: { top: '30%', right: '-25%' },
    },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`floating-card absolute w-64 h-40 bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-2xl border border-white/10`}
          style={card.position}
          whileHover={{
            scale: 1.05,
            rotateY: 10,
            z: 50,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Card chip */}
          <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-md mb-4 opacity-80" />

          {/* Card number */}
          <div className="text-white text-lg font-mono tracking-wider mb-6">
            {card.number}
          </div>

          {/* Cardholder info */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/60 text-xs uppercase tracking-wide mb-1">
                Cardholder
              </div>
              <div className="text-white font-medium text-sm">{card.name}</div>
            </div>
            <div>
              <div className="text-white/60 text-xs uppercase tracking-wide mb-1">
                Expires
              </div>
              <div className="text-white font-medium text-sm">12/28</div>
            </div>
          </div>

          {/* Card brand logo */}
          <div className="absolute top-6 right-6">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>

          {/* Holographic effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCards;