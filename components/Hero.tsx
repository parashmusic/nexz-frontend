'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import InteractivePhone from './InteractivePhone';
import FloatingCards from './FloatingCards';
import { useRouter } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text animation
      gsap.fromTo(
        '.hero-text-line',
        {
          y: 120,
          opacity: 0,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.15,
          delay: 0.5,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        '.hero-subtitle',
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 1.2,
        }
      );

      // CTA buttons animation
      gsap.fromTo(
        '.hero-cta',
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          delay: 1.5,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <motion.section
      ref={heroRef}
      style={{ y: ySpring, opacity, scale }}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600" /> */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/90" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 102, 235, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(6, 102, 235, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4 overflow-hidden">
            <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight">
              <div className="hero-text-line">CHANGE</div>
              <div className="hero-text-line">THE WAY</div>
              <div className="hero-text-line">YOU INVEST</div>
            </motion.h1>
          </div>

          <motion.p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Home or away, local or global — level up, Stack up, Nexz Your Invesment
          </motion.p>

          <div className="flex flex-row sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={handleGetStarted}
              className="hero-cta group bg-white text-black px-4 lg:px-8 lg:py-4 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-100 flex items-center justify-center space-x-2"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              className="hero-cta group border-2 border-white/30 text-white px-4 lg:px-8 lg:py-4 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50 flex items-center justify-center space-x-2"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch demo</span>
            </motion.button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex items-center justify-center lg:justify-start space-x-8 text-white/60 text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>45M+ customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>200+ countries</span>
            </div>
          </motion.div>
        </div>

        {/* Right content - Interactive Phone and floating cards */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <InteractivePhone />
            <FloatingCards />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;