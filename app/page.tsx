'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductShowcase from '@/components/ProductShowcase';
import GlobalSection from '@/components/GlobalSection';
import SecuritySection from '@/components/SecuritySection';
import BusinessSection from '@/components/BusinessSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <ParticleBackground />
        <ScrollProgress />
        <Header />
        <Hero />
        <Features />
        <ProductShowcase />
        <GlobalSection />
        <SecuritySection />
        <BusinessSection />
        <Footer />
      </Suspense>
    </div>
  );
}