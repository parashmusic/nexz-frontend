// 'use client';

// import { useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import gsap from 'gsap';
// import { ArrowUpRight, TrendingUp, CreditCard } from 'lucide-react';

// const PhoneCard = () => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ['start end', 'end start'],
//   });

//   const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
//   const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
//   const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
//   const rotateXSpring = useSpring(rotateX, springConfig);
//   const rotateYSpring = useSpring(rotateY, springConfig);
//   const ySpring = useSpring(y, springConfig);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         cardRef.current,
//         {
//           x: 200,
//           opacity: 0,
//           rotationY: 45,
//           scale: 0.8,
//         },
//         {
//           x: 0,
//           opacity: 1,
//           rotationY: 0,
//           scale: 1,
//           duration: 1.5,
//           ease: 'power3.out',
//           delay: 0.8,
//         }
//       );

//       // Animate phone content
//       gsap.fromTo(
//         '.phone-content',
//         {
//           y: 50,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: 'power2.out',
//           delay: 1.5,
//           stagger: 0.1,
//         }
//       );
//     }, cardRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <motion.div
//       ref={cardRef}
//       style={{
//         rotateX: rotateXSpring,
//         rotateY: rotateYSpring,
//         y: ySpring,
//         transformStyle: 'preserve-3d',
//       }}
//       className="relative z-10"
//     >
//       {/* Phone frame */}
//       <div className="relative w-80 h-[650px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl border border-white/10">
//         {/* Screen */}
//         <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
//           {/* Status bar */}
//           <div className="phone-content flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-black">
//             <div className="text-sm font-medium text-white">9:41</div>
//             <div className="flex space-x-1">
//               <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
//               <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
//               <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
//             </div>
//           </div>

//           {/* App content */}
//           <div className="p-6 h-full bg-gradient-to-b from-black via-gray-900 to-black">
//             {/* Header */}
//             <div className="phone-content text-center mb-8">
//               <div className="text-sm text-white/60 mb-2">Personal</div>
//               <div className="text-4xl font-bold text-white">£6,012.50</div>
//               <div className="text-green-400 text-sm flex items-center justify-center mt-2">
//                 <TrendingUp className="w-4 h-4 mr-1" />
//                 +2.5% this month
//               </div>
//             </div>

//             {/* Quick actions */}
//             <div className="phone-content grid grid-cols-2 gap-4 mb-6">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
//               >
//                 <CreditCard className="w-6 h-6 text-blue-400 mx-auto mb-2" />
//                 <div className="text-white text-sm font-medium">Cards</div>
//               </motion.div>
              
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
//               >
//                 <ArrowUpRight className="w-6 h-6 text-green-400 mx-auto mb-2" />
//                 <div className="text-white text-sm font-medium">Transfer</div>
//               </motion.div>
//             </div>

//             {/* Recent transactions */}
//             <div className="phone-content space-y-4">
//               <div className="text-white/80 text-sm font-medium mb-4">Recent transactions</div>
              
//               {/* Transaction 1 */}
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 2, duration: 0.8 }}
//                 className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4"
//               >
//                 <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded-full"></div>
//                 </div>
                
//                 <div className="flex-1">
//                   <div className="font-semibold text-white">Salary</div>
//                   <div className="text-sm text-white/60">Today, 11:28</div>
//                 </div>
                
//                 <div className="text-lg font-bold text-green-400">+£2,550</div>
//               </motion.div>

//               {/* Transaction 2 */}
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 2.2, duration: 0.8 }}
//                 className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4"
//               >
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded-full"></div>
//                 </div>
                
//                 <div className="flex-1">
//                   <div className="font-semibold text-white">Coffee Shop</div>
//                   <div className="text-sm text-white/60">Yesterday, 14:32</div>
//                 </div>
                
//                 <div className="text-lg font-bold text-white">-£4.50</div>
//               </motion.div>

//               {/* Transaction 3 */}
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 2.4, duration: 0.8 }}
//                 className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-4"
//               >
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded-full"></div>
//                 </div>
                
//                 <div className="flex-1">
//                   <div className="font-semibold text-white">Uber</div>
//                   <div className="text-sm text-white/60">Yesterday, 09:15</div>
//                 </div>
                
//                 <div className="text-lg font-bold text-white">-£12.30</div>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         {/* Phone reflection */}
//         <div className="absolute inset-2 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />
//       </div>

//       {/* Floating elements */}
//       <motion.div
//         animate={{
//           y: [0, -15, 0],
//           rotate: [0, 5, 0],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//         className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-60 blur-sm"
//       />
      
//       <motion.div
//         animate={{
//           y: [0, 20, 0],
//           rotate: [0, -5, 0],
//         }}
//         transition={{
//           duration: 5,
//           repeat: Infinity,
//           ease: 'easeInOut',
//           delay: 1,
//         }}
//         className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 blur-sm"
//       />
//     </motion.div>
//   );
// };

// export default PhoneCard;
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const PhoneCard = () => {
  const [riskLevel, setRiskLevel] = useState('Balance');
  const [investmentMode, setInvestmentMode] = useState('AI Autopilot');
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  
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
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden  relative">
          {/* Status bar with Nexz branding */}
          <div className="flex justify-between items-center px-6 py-4 bg-black border-b border-white/10">
            <div className="text-white font-bold">Nexz</div>
            <div className="text-sm text-white/60">9:41</div>
          </div>

          {/* App content - Minimal Trading Interface */}
          <div className="p-6 h-full bg-black flex flex-col">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-medium text-white mb-1">Smart Portfolio</h1>
              <p className="text-white/60 text-sm">
                Ready to invest ${investmentAmount.toLocaleString()}
              </p>
            </div>

            {/* Risk Level Selector */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-white/80 text-sm">Risk Level</span>
                <span className="text-white text-sm">{riskLevel}</span>
              </div>
              <div className="flex bg-white/5 rounded-lg p-1">
                {['Conservative', 'Balance', 'Aggressive'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setRiskLevel(level)}
                    className={`flex-1 py-2 text-xs transition-colors ${
                      riskLevel === level
                        ? 'bg-white text-black rounded'
                        : 'text-white/60'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Breakdown */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-white text-sm">Portfolio Allocation</h2>
                <span className="text-white/60 text-xs">Auto-balanced</span>
              </div>
              
              <div className="space-y-2">
                {[
                  { symbol: 'HSFT', allocation: 20 },
                  { symbol: 'RAPL', allocation: 25 },
                  { symbol: 'GODGL', allocation: 20 },
                ].map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between">
                    <span className="text-white text-sm">{asset.symbol}</span>
                    <span className="text-white/80 text-sm">{asset.allocation}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Mode */}
            <div className="mb-6">
              <h2 className="text-white text-sm mb-3">Investment Mode</h2>
              <div className="space-y-2">
                {['AI Autopilot', 'AI + You', 'Manual'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setInvestmentMode(mode)}
                    className={`w-full text-left p-3 rounded-lg border text-sm flex items-center justify-between ${
                      investmentMode === mode
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-white/10 text-white/70'
                    }`}
                  >
                    {mode}
                    {investmentMode === mode && <Check className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Info */}
            <div className="mt-auto p-4 bg-white/5 rounded-lg border border-white/10 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Strategy</span>
                <span className="text-white">Adventum + Value</span>
              </div>
            </div>

            {/* Proceed Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium">
              Proceed to Invest
            </button>
          </div>
        </div>

        {/* Phone reflection */}
        <div className="absolute inset-2 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-8 -right-8 w-16 h-16 bg-blue-500/20 rounded-full blur-sm"
      />
    </motion.div>
  );
};

export default PhoneCard;