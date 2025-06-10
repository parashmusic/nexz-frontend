'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, MapPin, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/phone.png';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { icon: Users, value: '45M+', label: 'Customers worldwide' },
  { icon: MapPin, value: '200+', label: 'Countries supported' },
  { icon: Globe, value: '150+', label: 'Currencies available' },
  { icon: TrendingUp, value: '$180B+', label: 'Transactions processed' },
];

const GlobalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.global-stat',
        {
          y: 60,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background globe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[800px] h-[800px] border border-white/20 rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Banking without
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              borders
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join millions of customers who trust nexz for their global financial needs. 
            From London to Tokyo, New York to Sydney - we're everywhere you are.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="global-stat text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {stat.value}
                </div>
                
                <div className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* World map visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative  backdrop-blur-lg  rounded-3xl text-center"
        >
          <div className="relative">
            <Image
              src={logo}
              alt="Global network"
              className="w-full h-[32rem] lg:opacity-50 lg:h-96 object-cover rounded-2xl opacity-60"
              fill={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
            
            {/* Floating connection points */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Connected globally, trusted locally
              </h3>
              <p className="text-white/80 max-w-2xl">
                Our global network ensures your money moves as fast as you do, 
                with local expertise in every market we serve.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalSection;