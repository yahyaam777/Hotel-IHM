import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  Hotel,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Users,
  Plane,
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const About = () => {
    const { t } = useLanguage();
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-50 to-white text-center py-24 px-6 md:px-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Hotel className="mx-auto text-primary mb-4" size={48} />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">{t('Welcome to HotelHub')} </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {t('Your ultimate destination for finding quality stays across the globe  We make your travel dreams a reality')}          </p>
      </motion.section>

      <main className="flex-grow px-6 md:px-10 max-w-6xl mx-auto w-full py-16 space-y-24">
        {/* Our Story */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <BookOpen className="text-primary mb-3 mx-auto" size={36} />
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{t('Our Story')} </h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          {t('HotelHub started with a simple goal: to make travel enjoyable and stress-free. Founded by hospitality lovers, we believe everyone deserves a perfect place to stay — no matter the destination.')} 
          </p>
        </motion.section>

        {/* Our Values Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">{t('Our Core Values')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
  {
    icon: <Users className="text-primary mb-2" size={28} />,
    title: t('Customer First'),
    desc: t('We prioritize comfort, satisfaction, and feedback in everything we do.'),
  },
  {
    icon: <ShieldCheck className="text-primary mb-2" size={28} />,
    title: t('Quality Partnerships'),
    desc: t('Only working with hotels that meet our rigorous standards.'),
  },
  {
    icon: <Lightbulb className="text-primary mb-2" size={28} />,
    title: t('Transparency'),
    desc: t('No hidden fees or surprises. Just clear and honest pricing.'),
  },
  {
    icon: <Plane className="text-primary mb-2" size={28} />,
    title: t('Innovation'),
    desc: t('Constantly improving to provide smarter and smoother booking experiences.'),
  },
].map((value, i) => (
  <motion.div
    key={i}
    className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition duration-300"
    custom={i}
    variants={fadeIn}
  >
    {value.icon}
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
    <p className="text-sm text-gray-600">{value.desc}</p>
  </motion.div>
))}

          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="bg-primary text-white rounded-2xl py-10 px-6 text-center shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-3">{t('Ready to book your next stay?')}</h3>
<p className="mb-6 text-lg">{t('Discover curated hotels tailored to your comfort and style.')}</p>
<a
  href="/hotels"
  className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition"
>
  {t('Browse Hotels')}
</a>

        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
