'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight, TrendingUp, CreditCard } from 'lucide-react';

const PhoneCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          x: 200,
          opacity: 0,
          rotationY: 45,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.8,
        }
      );

      // Animate phone content
      gsap.fromTo(
        '.phone-content',
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 1.5,
          stagger: 0.1,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        y: ySpring,
        transformStyle: 'preserve-3d',
      }}
      className="relative z-10"
    >
      {/* Phone frame */}
      <div className="relative w-80 h-[650px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl border border-white/10">
        {/* Screen */}
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
          {/* Status bar */}
          <div className="phone-content flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-black">
            <div className="text-sm font-medium text-white">9:41</div>
            <div className="flex space-x-1">
              <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
              <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
            </div>
          </div>

          {/* App content */}
          <div className="p-6 h-full bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Header */}
            <div className="phone-content text-center mb-8">
              <div className="text-sm text-white/60 mb-2">Personal</div>
              <div className="text-4xl font-bold text-white">£6,012.50</div>
              <div className="text-green-400 text-sm flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.5% this month
              </div>
            </div>

            {/* Quick actions */}
            <div className="phone-content grid grid-cols-2 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
              >
                <CreditCard className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Cards</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
              >
                <ArrowUpRight className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Transfer</div>
              </motion.div>
            </div>

            {/* Recent transactions */}
            <div className="phone-content space-y-4">
              <div className="text-white/80 text-sm font-medium mb-4">Recent transactions</div>
              
              {/* Transaction 1 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-white">Salary</div>
                  <div className="text-sm text-white/60">Today, 11:28</div>
                </div>
                
                <div className="text-lg font-bold text-green-400">+£2,550</div>
              </motion.div>

              {/* Transaction 2 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-white">Coffee Shop</div>
                  <div className="text-sm text-white/60">Yesterday, 14:32</div>
                </div>
                
                <div className="text-lg font-bold text-white">-£4.50</div>
              </motion.div>

              {/* Transaction 3 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-white">Uber</div>
                  <div className="text-sm text-white/60">Yesterday, 09:15</div>
                </div>
                
                <div className="text-lg font-bold text-white">-£12.30</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Phone reflection */}
        <div className="absolute inset-2 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-60 blur-sm"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 blur-sm"
      />
    </motion.div>
  );
};

export default PhoneCard;