"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CreditCard,
  Globe,
  Shield,
  Smartphone,
  TrendingUp,
  Zap,
  ArrowRight,
  Star,
  Codepen,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: CreditCard,
    title: "Smart spending",
    description:
      "Track your spending in real-time with intelligent categorization and budgeting tools.",
    color: 'from-blue-500 to-blue-600',
    stats: "10M+ transactions daily",
    size: "md",
  },
  {
    icon: Globe,
    title: "Global transfers",
    description:
      "Send money worldwide with the real exchange rate and low, transparent fees.",
    color: 'from-blue-500 to-blue-600',
    stats: "200+ countries supported",
    size: "lg",
  },
  {
    icon: Shield,
    title: "Bank-level security",
    description:
      "Your money is protected with advanced security features and deposit protection.",
    color: 'from-purple-500 to-violet-600',
    stats: "99.9% uptime guaranteed",
    size: "md",
  },
  // {
  //   icon: Smartphone,
  //   title: 'Mobile first',
  //   description: 'Manage your finances on the go with our award-winning mobile app.',
  //   color: 'from-orange-500 to-red-500',
  //   stats: '4.8★ app store rating',
  //   size: 'sm',
  // },
  {
    icon: TrendingUp,
    title: "Investment tools",
    description:
      "Build wealth with commission-free stock trading and crypto investments.",
    color: 'from-pink-500 to-rose-600',
    stats: "$50B+ assets under management",
    size: "lg",
  },
  {
    icon: Zap,
    title: "Instant everything",
    description:
      "Instant payments, instant notifications, instant peace of mind.",
    color: 'from-yellow-500 to-amber-600',
    stats: "<1s average transaction time",
    size: "sm",
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".features-title",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate feature cards with 3D effect
      gsap.fromTo(
        ".feature-card",
        {
          y: 100,
          opacity: 0,
          rotationX: 45,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-black to-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">
              Trusted by Experts
            </span>
          </motion.div>

          <motion.h2
            className="features-title   font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Built for the
            <span className="block mt-3 bg-gradient-to-r text-4xl sm:text-5xl lg:text-6xl from-purple-800 via-purple-400 to-white bg-clip-text text-transparent">
              future of Invesment
            </span>
          </motion.h2>

          <motion.p
            className="features-title text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Experience banking that adapts to your lifestyle with cutting-edge
            technology, seamless user experience, and global accessibility.
          </motion.p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`feature-card group relative ${
                feature.size === "lg"
                  ? "lg:col-span-2"
                  : feature.size === "md"
                  ? "lg:col-span-1"
                  : "lg:col-span-2 lg:row-span-1"
              }`}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-r from-black to-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-500`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    {feature.stats}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-60`}
                      animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${40 + i * 20}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              boxShadow: "0 20px 40px rgba(6, 102, 235, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="border-[1px] border-white/20 bg-transparent text-white px-8 py-4 rounded-md text-lg font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto hover:text-white hover:border-blue-300"
          >
                <Codepen className="w-5 h-5" />
            <span>Explore</span>
        
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
