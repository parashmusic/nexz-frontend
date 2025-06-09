'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, AlignRight } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/logo_nexz.png'
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'Personal', 
      hasDropdown: true,
      items: ['Current accounts', 'Savings', 'Credit cards', 'Loans', 'Insurance']
    },
    { 
      name: 'Business', 
      hasDropdown: true,
      items: ['Business accounts', 'Corporate cards', 'Expense management', 'Payroll']
    },
    { name: 'About', hasDropdown: false },
    { name: 'Help', hasDropdown: false },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 z-50 flex items-center space-x-2"
          >
            
            <div className="relative w-5 h-5">
              <Image
                src={logo}
                alt="Nexz Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl  font-bold text-white tracking-tight">
              Nexz
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  className="flex items-center space-x-1 text-white/80 hover:text-white transition-all duration-300 text-sm font-medium py-2"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                    >
                      {item.items?.map((subItem, index) => (
                        <motion.a
                          key={subItem}
                          href="#"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                        >
                          {subItem}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium px-4 py-2"
            >
              Log in
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6, 102, 235, 0.4)",
                backgroundColor: "#0666eb",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-gray-100"
            >
              Get started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 z-50 relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlignRight size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-white/80 hover:text-white px-4 py-3 text-base font-medium transition-colors duration-300 rounded-xl hover:bg-white/5"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="pt-4 space-y-3">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full text-left text-white/80 hover:text-white px-4 py-3 text-base font-medium transition-colors duration-300 rounded-xl hover:bg-white/5"
                  >
                    Log in
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full bg-white text-black px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-gray-100"
                  >
                    Get started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;