import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const Contact = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-blue-50 to-white text-center py-24 px-6 md:px-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Mail className="mx-auto text-primary mb-4" size={48} />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">{t('Get In Touch')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('Have questions or just want to chat? We’re here to help you plan your perfect stay.')}
        </p>
      </motion.section>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-10 max-w-7xl mx-auto w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-semibold mb-2">{t('Send Us a Message')}</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['First Name', 'Last Name'].map((label, i) => (
                  <div key={i} className="space-y-2">
                    <label htmlFor={label} className="text-sm font-medium">{t(label)}</label>
                    <input
                      id={label}
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">{t('Email')}</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">{t('Subject')}</label>
                <input
                  id="subject"
                  type="text"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">{t('Message')}</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                ></textarea>
              </div>

              <Button type="submit" className="w-full md:w-auto mt-2">{t('Send Message')}</Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('Our Contact Information')}</h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" />
                  <span>{t('123 Hotel Street, City, Country')}</span>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="text-primary mt-1" />
                  <span>+1 234 567 890</span>
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="text-primary mt-1" />
                  <span>info@hotelhub.com</span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{t('Business Hours')}</h2>
              <div className="space-y-2 text-gray-700">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((item, i) => (
                  <p key={i} className="flex justify-between border-b pb-1">
                    <span>{t(item.day)}:</span>
                    <span>{item.time}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
