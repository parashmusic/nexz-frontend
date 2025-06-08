'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    title: 'Personal Banking',
    subtitle: 'Everything you need for everyday banking',
    description: 'Current accounts, savings, budgeting tools, and instant notifications. Banking made simple.',
    image: 'https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Ftest1-emgndhaqd0c9h2db.a01.azurefd.net%2Fimages%2F442e5625-d997-4e42-ab81-29dfdb142715.png',
    features: ['Instant payments', 'Smart budgeting', 'Real-time notifications', 'Fee-free abroad'],
    color: 'from-blue-500 to-sky-600',
  },
  {
    id: 2,
    title: 'Business Solutions',
    subtitle: 'Powerful tools for growing businesses',
    description: 'Multi-currency accounts, expense management, team cards, and automated accounting integrations.',
    image: 'https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Ftest1-emgndhaqd0c9h2db.a01.azurefd.net%2Fimages%2Fd44adbf7-0252-4cb1-b28d-0456ea123d2c.png',
    features: ['Multi-currency accounts', 'Expense management', 'Team collaboration', 'API integrations'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Investment Platform',
    subtitle: 'Build wealth with smart investing',
    description: 'Commission-free stock trading, crypto investments, and automated portfolio management.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Commission-free trading', 'Crypto investments', 'Portfolio analytics', 'Auto-investing'],
    color: 'from-green-500 to-emerald-500',
  },
];

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-title',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const nextProduct = () => {
    setActiveProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setActiveProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - adjusted for mobile */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            className="showcase-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            One app,
            <span className={`block bg-gradient-to-r ${products[activeProduct].color} bg-clip-text text-transparent`}>
              endless possibilities
            </span>
          </motion.h2>

          <motion.p 
            className="showcase-title text-base md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            From personal banking to business solutions and investments, 
            discover how nexz can transform your financial life.
          </motion.p>
        </div>

        {/* Product showcase - mobile responsive layout */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Content - mobile adjustments */}
              <div className="space-y-6 md:space-y-8 mt-6 md:mt-0">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`inline-block bg-gradient-to-r ${products[activeProduct].color} bg-clip-text text-transparent text-base md:text-lg font-semibold mb-3 md:mb-4`}
                  >
                    {products[activeProduct].subtitle}
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight"
                  >
                    {products[activeProduct].title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base md:text-xl text-white/70 leading-relaxed"
                  >
                    {products[activeProduct].description}
                  </motion.p>
                </div>

                {/* Features - mobile grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                >
                  {products[activeProduct].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-2 md:space-x-3"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${products[activeProduct].color} rounded-full`} />
                      <span className="text-sm md:text-base text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA - mobile stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${products[activeProduct].color} text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:shadow-2xl`}
                  >
                    Learn more
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Watch demo</span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Image - mobile sizing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full"
              >
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
                  <img
                    src={products[activeProduct].image}
                    alt={products[activeProduct].title}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                  />
                  <div className={`absolute inset-0  opacity-20`} />
                </div>
                
                {/* Floating elements - mobile hidden */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`hidden md:block absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${products[activeProduct].color} rounded-full opacity-60 blur-sm`}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation - mobile centered */}
          <div className="flex justify-center items-center space-x-6 md:space-x-8 mt-8 md:mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProduct}
              className="w-10 h-10 md:w-12 md:h-12  backdrop-blur-sm  border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2 md:space-x-3">
              {products.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveProduct(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === activeProduct
                      ? `bg-gradient-to-r ${products[activeProduct].color}`
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProduct}
              className="w-10 h-10 md:w-12 md:h-12  backdrop-blur-sm  border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;