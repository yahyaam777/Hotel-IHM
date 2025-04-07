import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Search,
  User,
  Menu,
  X,
  Globe,
  ShieldCheck,
  LogOut,
  UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false);
  const { t } = useLanguage();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        {
          'bg-background/80 backdrop-blur-lg shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold tracking-tight">
           {t('HotelHub')}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            {t('home')}
          </Link>
          <Link to="/hotels" className="text-sm font-medium transition-colors hover:text-primary">
            {t('hotels')}
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            {t('about')}
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            {t('contact')}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Button with Dropdown */}
          <div className="relative" ref={languageRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)}
            >
              <Globe className="h-5 w-5" />
            </Button>
            {languageSelectorOpen && (
              <div className="absolute right-0 mt-2 z-50 bg-white dark:bg-gray-900 rounded-md shadow-lg p-2 w-40 animate-fade-in">
                <LanguageSelector onClose={() => setLanguageSelectorOpen(false)} />
              </div>
            )}
          </div>

          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3">
                  <UserCircle className="h-5 w-5" />
                  <span className="max-w-[100px] truncate">{user?.name || (isAdmin ? 'Admin' : 'User')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{isAdmin ? 'Administrator' : 'Account'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" className="rounded-full">
                  {t('register')}
                </Button>
              </Link>
              <Link to="/admin-login">
                <Button variant="outline" size="icon" className="ml-2">
                  <ShieldCheck className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="px-4 py-5 space-y-4">
            <Link
              to="/"
              className="block text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              to="/hotels"
              className="block text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('hotels')}
            </Link>
            <Link
              to="/about"
              className="block text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              to="/contact"
              className="block text-sm font-medium py-2 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>

            <div className="pt-4 border-t border-border flex flex-col space-y-3">
              <LanguageSelector onClose={() => setMobileMenuOpen(false)} />

              {isAuthenticated ? (
                <>
                  <div className="flex items-center py-2">
                    <UserCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">{user?.name || (isAdmin ? 'Admin' : 'User')}</span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin-dashboard"
                      className="block text-sm font-medium py-2 transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Dashboard
                      </div>
                    </Link>
                  )}

                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-sm font-medium py-2 transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full">{t('register')}</Button>
                  </Link>
                  <Link
                    to="/admin-login"
                    className="block text-sm font-medium py-2 transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      {t('admin_login')}
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
