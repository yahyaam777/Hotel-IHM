import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/use-language';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Brand + Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">HotelHub</h3>
            <ul className="space-y-2">
              {[{ Icon: Facebook, name: 'Facebook', link: 'https://facebook.com' },
                { Icon: Twitter, name: 'Twitter', link: 'https://twitter.com' },
                { Icon: Instagram, name: 'Instagram', link: 'https://instagram.com' },
                { Icon: Linkedin, name: 'LinkedIn', link: 'https://linkedin.com' }
              ].map(({ Icon, name, link }, i) => (
                <li key={i} className="flex items-center gap-2">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm ml-2">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: t('home') },
                { to: '/hotels', label: t('hotels') },
                { to: '/about', label: t('about') },
                { to: '/contact', label: t('contact') },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact & Subscribe</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Booking St, Hotel City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@hotelhub.com</span>
              </li>
            </ul>
            <form className="flex gap-2 mt-4">
              <Input
                type="email"
                placeholder="Your email"
                className="h-8 text-sm"
                aria-label="Email address"
                required
              />
              <Button size="sm" className="text-sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-4 border-t border-border text-sm flex justify-between items-center">
          <p>©  All rights reserved.</p>
          <div className="flex gap-4">
            <Link  className="hover:text-primary transition-colors" to={''}>Terms</Link>
            <Link  className="hover:text-primary transition-colors" to={''}>Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;