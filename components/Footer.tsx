'use client';

import { motion } from 'framer-motion';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowUp,
  Smartphone,
  Download
} from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Products',
      links: ['Personal', 'Business', 'nexz <18', 'nexz Pro', 'nexz Metal'],
    },
    {
      title: 'Features',
      links: ['Current accounts', 'Savings', 'Credit cards', 'Investments', 'Insurance'],
    },
    {
      title: 'Company',
      links: ['About us', 'Careers', 'News', 'Investor relations', 'Legal'],
    },
    {
      title: 'Support',
      links: ['Help center', 'Contact us', 'Security', 'System status', 'Community'],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          {/* Top section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left side - Brand and CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to change the way you money?
                </h2>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  Join millions of customers who trust nexz for their financial needs. 
                  Download the app and get started in minutes.
                </p>
                
                {/* App download buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 flex items-center justify-center space-x-2"
                  >
                    <Smartphone className="w-5 h-5" />
                    <span>Download for iOS</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download for Android</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right side - Links */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <motion.a
                          href="#"
                          whileHover={{ x: 5 }}
                          className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                        >
                          {link}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Logo and copyright */}
            <div className="flex items-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-white"
              >
                Nexz
              </motion.div>
              <p className="text-white/60 text-sm">
                © 2025 Nexz Ltd. All rights reserved.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 pt-8 border-t border-white/10"
          >
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Regulatory Information'].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ y: -2 }}
                className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;