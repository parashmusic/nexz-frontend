'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, TrendingUp, CreditCard, Send, Plus, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/logo_nexz.png';
const InteractivePhone = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for 3D rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useSpring(isHovered ? 1.05 : 1, {
    stiffness: 300,
    damping: 30
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      
      const rect = phoneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };

    const phone = phoneRef.current;
    if (phone) {
      phone.addEventListener('mousemove', handleMouseMove);
      phone.addEventListener('mouseleave', handleMouseLeave);
      phone.addEventListener('mouseenter', () => setIsHovered(true));
    }

    return () => {
      if (phone) {
        phone.removeEventListener('mousemove', handleMouseMove);
        phone.removeEventListener('mouseleave', handleMouseLeave);
        phone.removeEventListener('mouseenter', () => setIsHovered(true));
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={phoneRef}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className="relative z-10 cursor-pointer"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
    >
      {/* Phone frame with enhanced 3D effect */}
      <div className="relative w-80 h-[650px] bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-[3rem] p-2 shadow-2xl border border-white/20">
        {/* Enhanced screen with depth */}
        <motion.div 
          className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative"
          style={{
            boxShadow: isHovered 
              ? 'inset 0 0 50px rgba(59, 130, 246, 0.3), 0 0 100px rgba(59, 130, 246, 0.2)'
              : 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Dynamic status bar */}
          <motion.div 
            className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-black"
            animate={{
              background: isHovered 
                ? 'linear-gradient(90deg, #1e293b, #0f172a)'
                : 'linear-gradient(90deg, #111827, #000000)'
            }}
          >
            <motion.div 
              className="text-sm font-medium text-white"
              animate={{ color: isHovered ? '#60a5fa' : '#ffffff' }}
            >
              9:41
            </motion.div>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-2 rounded-sm"
                  animate={{
                    backgroundColor: isHovered ? '#22c55e' : '#9ca3af',
                    scale: isHovered ? [1, 1.2, 1] : 1
                  }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced app content */}
          <div className="p-6 h-full bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
            {/* Animated background particles */}
            {isHovered && [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 300 - 150],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Header with enhanced animations */}
            <motion.div 
              className="text-center mb-8"
             
            >
                <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 z-50 flex items-center justify-center mb-4 space-x-2"
          >
            <div className="relative w-5 h-5">
              <Image
                src={logo}
                alt="Nexz Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Nexz
            </span>
          </motion.div>
              <motion.div 
                className="text-sm text-white/60 mb-2"
             
              >
                Personal
              </motion.div>
              <motion.div 
                className="text-4xl font-bold text-white mb-2"
                animate={{
                  
                  
                }}
              >
                £6,012.50
              </motion.div>
              <motion.div 
                className="text-green-400 text-sm flex items-center justify-center"
                
                
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.5% this month
              </motion.div>
            </motion.div>

            {/* Interactive quick actions */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: CreditCard, label: 'Cards', color: 'from-blue-500 to-blue-600' },
                { icon: Send, label: 'Transfer', color: 'from-green-500 to-green-600' }
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-center cursor-pointer`}
                  
                >
                  <motion.div
                  
                  >
                    <action.icon className="w-6 h-6 text-white mx-auto mb-2" />
                  </motion.div>
                  <div className="text-white text-sm font-medium">{action.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced transaction list */}
            <div className="space-y-4">
              <motion.div 
                className="text-white/80 text-sm font-medium mb-4"
               
              >
                Recent transactions
              </motion.div>
              
              {[
                { name: 'ETH', time: 'Today, 11:28', amount: '+£2,550', color: 'from-green-400 to-green-600', icon: '💰' },
                { name: 'BTC', time: 'Yesterday, 14:32', amount: '-£4.50', color: 'from-orange-400 to-orange-600', icon: '☕' },
                { name: 'Uber', time: 'Yesterday, 09:15', amount: '-£12.30', color: 'from-purple-400 to-purple-600', icon: '🚗' }
              ].map((transaction, index) => (
                <motion.div
                  key={transaction.name}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4 cursor-pointer"
                 
                >
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${transaction.color} rounded-full flex items-center justify-center text-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {transaction.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.div 
                      className="font-semibold text-white"
             
                    >
                      {transaction.name}
                    </motion.div>
                    <div className="text-sm text-white/60">{transaction.time}</div>
                  </div>
                  
                  <motion.div 
                    className={`text-lg font-bold ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}
                   
                  >
                    {transaction.amount}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Add floating action button */}
            <motion.div
              className="absolute bottom-6 right-6"
             
            >
              <motion.button
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced phone reflection */}
        <motion.div 
          className="absolute inset-2 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none"
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
            background: isHovered 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, transparent)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent, transparent)'
          }}
        />
      </div>

      {/* Enhanced floating elements */}
      <motion.div
        className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-60 blur-sm"
        animate={{
          y: isHovered ? [0, -15, 0] : [0, -10, 0],
          rotate: isHovered ? [0, 180, 360] : [0, 5, 0],
          scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1]
        }}
        transition={{
          duration: isHovered ? 3 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 blur-sm"
        animate={{
          y: isHovered ? [0, 20, 0] : [0, 15, 0],
          rotate: isHovered ? [0, -180, -360] : [0, -5, 0],
          scale: isHovered ? [1, 0.8, 1] : [1, 0.9, 1]
        }}
        transition={{
          duration: isHovered ? 4 : 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Interactive glow effect */}
      {/* <motion.div
        className="absolute inset-0 rounded-[3rem] pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? '0 0 100px rgba(59, 130, 246, 0.3), 0 0 200px rgba(59, 130, 246, 0.1)'
            : '0 0 50px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.5 }}
      /> */}
    </motion.div>
  );
};

export default InteractivePhone;