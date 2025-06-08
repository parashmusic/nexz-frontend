'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, Fingerprint, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const securityFeatures = [
  {
    icon: Shield,
    title: 'Bank-level encryption',
    description: 'Your data is protected with 256-bit SSL encryption, the same standard used by major banks.',
  },
  {
    icon: Lock,
    title: 'Secure authentication',
    description: 'Multi-factor authentication and biometric security keep your account safe.',
  },
  {
    icon: Eye,
    title: 'Real-time monitoring',
    description: '24/7 fraud detection and instant notifications for all account activity.',
  },
  {
    icon: Fingerprint,
    title: 'Biometric access',
    description: 'Use your fingerprint or face ID for secure and convenient app access.',
  },
];

const SecuritySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.security-feature',
        {
          y: 80,
          opacity: 0,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
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
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 mb-8"
            >
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Bank-grade security</span>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Your money is
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                safe with us
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-white/70 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We use the latest security technology to protect your money and personal information. 
              Your funds are safeguarded and your privacy is our priority.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                'FCA regulated and authorized',
                'FSCS protected up to £85,000',
                'SOC 2 Type II certified',
                'ISO 27001 compliant'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right content - Security features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="security-feature group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 h-full">
                  <motion.div
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-xl group-hover:shadow-green-500/25 transition-all duration-500"
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security visualization */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-lg border border-white/10 rounded-3xl p-12 text-center">
            <div className="relative">
              {/* Central shield */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Shield className="w-16 h-16 text-white" />
              </motion.div>

              {/* Orbiting security elements */}
              {[Lock, Eye, Fingerprint].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: `${80 + index * 20}px 0px`,
                    marginLeft: '-32px',
                    marginTop: '-32px',
                  }}
                >
                  <Icon className="w-8 h-8 text-white/70" />
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Multi-layered protection
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Every transaction is protected by multiple layers of security, 
              from encryption to fraud detection to regulatory compliance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;