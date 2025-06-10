'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, TrendingUp, CreditCard, Send, Plus, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/logo_nexz.png';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
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
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="relative z-10 cursor-pointer"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
    >
      <style jsx>{`
        .scroll-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Phone frame with enhanced 3D effect */}
      <div className="relative w-80 h-[650px] bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-[3rem] p-2 shadow-2xl border border-white/20">
        {/* Enhanced screen with depth */}
        <motion.div
          className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative"
          style={{
            boxShadow: isHovered
              ? "inset 0 0 50px rgba(59, 130, 246, 0.3), 0 0 100px rgba(59, 130, 246, 0.2)"
              : "inset 0 0 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Dynamic status bar */}
          <motion.div
            className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-black"
            animate={{
              background: isHovered
                ? "linear-gradient(90deg, #1e293b, #0f172a)"
                : "linear-gradient(90deg, #111827, #000000)",
            }}
          >
            <motion.div
              className="text-sm font-medium text-white"
              animate={{ color: isHovered ? "#60a5fa" : "#ffffff" }}
            >
              9:41
            </motion.div>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-2 rounded-sm"
                  animate={{
                    backgroundColor: isHovered ? "#22c55e" : "#9ca3af",
                    scale: isHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>

          {/* App content with the portfolio screen */}
          <div className="p-6 h-full bg-gradient-to-b from-black via-gray-900 to-black relative overflow-y-auto scroll-hide">
            {/* Animated background particles */}
            {isHovered &&
              [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400 rounded-full"
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
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

            {/* Portfolio screen content */}
            <div className="space-y-6">
              {/* Header */}
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-violet-700 mb-2">
                  Your Smart Portfolio is Ready
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Tell us your risk level, amount, and how you want to invest.
                </p>
              </motion.div>

              {/* Investment amount */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800/50 rounded-xl p-4"
              >
                <label className="text-gray-300 text-sm mb-2 block">
                  How much would you like to invest?
                </label>
                <div className="bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white">
                  ₹10,000
                </div>
              </motion.div>

              {/* Risk level selector */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-800/50 rounded-xl p-4"
              >
                <label className="text-gray-300 text-sm mb-2 block">
                  Select Risk Level
                </label>
                <div className="flex justify-between space-x-2">
                  {["Conservative", "Balance", "Aggressive"].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-2 rounded-lg text-xs px-1 font-thin ${
                        level === "Balance"
                          ? "bg-violet-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              {/* <div className="h-40 my-4">
                <Pie
                  data={{
                    labels: ["HSFT", "RAPL", "GODGL", "Others"],
                    datasets: [
                      {
                        data: [20, 25, 20, 35],
                        backgroundColor: [
                          "#3B82F6",
                          "#10B981",
                          "#F59E0B",
                          "#6B7280",
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#E5E7EB",
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </div> */}
              {/* Portfolio breakdown */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-800/50 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-white font-medium">
                      Investment Value: $10.00K
                    </div>
                    <div className="text-gray-400 text-sm">Risk Balance</div>
                  </div>
                  <div className="text-violet-600 text-sm">Edit</div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "HSFT", percentage: "20.0%" },
                    { name: "RAPL", percentage: "25.0%" },
                    { name: "GODGL", percentage: "20.0%" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center bg-black/20 p-3 rounded-lg"
                    >
                      <div className="text-white">{item.name}</div>
                      <div className="text-gray-300">{item.percentage}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div> */}
              <div className="mt-6">
                {/* Investment value and risk level header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-gray-400 text-xs">
                      INVESTMENT VALUE
                    </div>
                    <div className="text-white font-bold text-xl">₹18.80K</div>
                  </div>
                  <div className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm">
                    Risk: <span className="font-medium">Balanced</span>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="h-40">
                  <Pie
                    data={{
                      labels: ["MST", "RAPL", "GOOGL"],
                      datasets: [
                        {
                          data: [28, 25, 28],
                          backgroundColor: [
                            "#3B82F6", // Blue for MST
                            "#10B981", // Green for RAPL
                            "#F59E0B", // Yellow for GOOGL
                          ],
                          borderWidth: 0,
                          hoverOffset: 10,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            color: "#E5E7EB",
                            font: {
                              size: 12,
                              family: "Inter",
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: "circle",
                          },
                        },
                        tooltip: {
                          bodyColor: "#F3F4F6",
                          titleColor: "#9CA3AF",
                          backgroundColor: "#1F2937",
                          borderColor: "#374151",
                          borderWidth: 1,
                          padding: 12,
                          callbacks: {
                            label: (context) => {
                              return `${context.label}: ${context.raw}%`;
                            },
                          },
                        },
                      },
                      cutout: "60%",
                      maintainAspectRatio: false,
                    }}
                  />
                </div>

                {/* Investment items list (optional) */}
                <div className="mt-6 space-y-2">
                  {[
                    { name: "MST", percentage: "28.0%", color: "bg-blue-500" },
                    {
                      name: "RAPL",
                      percentage: "25.0%",
                      color: "bg-green-500",
                    },
                    {
                      name: "GOOGL",
                      percentage: "28.0%",
                      color: "bg-yellow-500",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${item.color} mr-3`}
                        ></div>
                        <span className="text-white">{item.name}</span>
                      </div>
                      <span className="text-gray-300">{item.percentage}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Investment mode selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-800/50 rounded-xl p-4"
              >
                <label className="text-gray-300 text-sm mb-2 block">
                  Choose Investment Mode
                </label>
                <div className="space-y-3">
                  {[
                    {
                      name: "AI Autopilot",
                      description: "AI Handles Everything",
                      selected: true,
                      tag: "Automatically",
                    },
                    {
                      name: "AI + You",
                      description: "You Review AI picks",
                      selected: false,
                      tag: "Before Investing",
                    },
                    {
                      name: "Manual",
                      description: "You Build your portfolio",
                      selected: false,
                      tag: "yourself",
                    },
                  ].map((mode) => (
                    <motion.div
                      key={mode.name}
                      whileHover={{ scale: 1.01 }}
                      className={`p-3 rounded-lg border ${
                        mode.selected
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-white font-medium">
                            {mode.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {mode.description}
                          </div>
                        </div>
                        {mode.selected && (
                          <div className="text-xs bg-violet-500/30 text-violet-300 px-2 py-1 rounded">
                            Selected
                          </div>
                        )}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {mode.tag}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Strategy info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-800/50 rounded-xl p-4"
              >
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-gray-400">Strategy</div>
                    <div className="text-white">Adventum + Value</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Market Compliance</div>
                    <div className="text-white">56% Neutral</div>
                  </div>
                </div>
                <div className="text-gray-500 text-xs mt-3">
                  Last updated: 15 min ago
                </div>
              </motion.div>

              {/* Proceed button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-medium"
                >
                  Proceed to Invest
                </motion.button>
                <div className="text-center text-gray-500 text-xs mt-2">
                  Mode: AI Autopilot | Risk: Balance
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced phone reflection */}
        <motion.div
          className="absolute inset-2 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none"
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
            background: isHovered
              ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, transparent)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent, transparent)",
          }}
        />
      </div>

      {/* Enhanced floating elements */}
      <motion.div
        className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full opacity-60 blur-sm"
        animate={{
          y: isHovered ? [0, -15, 0] : [0, -10, 0],
          rotate: isHovered ? [0, 180, 360] : [0, 5, 0],
          scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: isHovered ? 3 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 blur-sm"
        animate={{
          y: isHovered ? [0, 20, 0] : [0, 15, 0],
          rotate: isHovered ? [0, -180, -360] : [0, -5, 0],
          scale: isHovered ? [1, 0.8, 1] : [1, 0.9, 1],
        }}
        transition={{
          duration: isHovered ? 4 : 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
};

export default InteractivePhone;