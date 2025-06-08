'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, CreditCard, BarChart3, Users, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const businessFeatures = [
  {
    icon: Building2,
    title: 'Business accounts',
    description: 'Multi-currency business accounts with global IBAN and local account details.',
    stats: '500K+ businesses',
  },
  {
    icon: CreditCard,
    title: 'Corporate cards',
    description: 'Issue unlimited cards to your team with real-time spending controls.',
    stats: '10M+ cards issued',
  },
  {
    icon: BarChart3,
    title: 'Expense management',
    description: 'Automated expense tracking, receipt scanning, and accounting integrations.',
    stats: '99% automation rate',
  },
  {
    icon: Users,
    title: 'Team collaboration',
    description: 'Role-based permissions, approval workflows, and team spending insights.',
    stats: '50+ team roles',
  },
];

const BusinessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.business-card',
        {
          y: 100,
          opacity: 0,
          rotationY: 45,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8"
          >
            <Building2 className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">For businesses</span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Scale your business
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              globally
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From startups to enterprises, nexz Business provides the financial infrastructure 
            you need to grow without limits.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {businessFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="business-card group"
              whileHover={{ 
                scale: 1.02,
                y: -10,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 h-full">
                {/* Icon and stats */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all duration-500"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {feature.stats.split(' ')[0]}
                    </div>
                    <div className="text-white/60 text-sm">
                      {feature.stats.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-white/10 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Revoultionize your business banking?
          </h3>
          
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust nexz for their financial operations. 
            Get started in minutes, not days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <span>Start your business account</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/10"
            >
              Book a demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessSection;