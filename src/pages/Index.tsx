
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedHotels from '@/components/FeaturedHotels';
import Promotions from '@/components/Promotions';
import PopularDestinations from '@/components/PopularDestinations';
import Testimonials from '@/components/Testimonials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Promotions />
        <FeaturedHotels />
        <PopularDestinations />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
