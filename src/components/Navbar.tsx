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
import { FontSizeToggle } from './FontSizeToggle';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false);
  const { t } = useLanguage();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const languageRef = useRef<HTMLDivElement>(null);

  // ... keep existing code (scroll and click handlers)

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3 px-4 md:px-8',
        {
          'bg-background/80 backdrop-blur-lg shadow-sm': scrolled,
          'bg-transparent': !scrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            {t('HotelHub')}
          </Link>
        </div>

        {/* Desktop Navigation - centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex space-x-8">
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
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme and Font Size Controls */}
          <div className="flex items-center mr-2 border-r border-border pr-2">
            <ThemeToggle />
            <FontSizeToggle />
          </div>

          {/* Search and Language */}
          <div className="flex items-center mr-2">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            
            {/* Language Button with Dropdown */}
            <div className="relative" ref={languageRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)}
                className="rounded-full"
              >
                <Globe className="h-4 w-4" />
              </Button>
              {languageSelectorOpen && (
                <div className="absolute right-0 mt-2 z-50 bg-popover rounded-md shadow-lg p-2 w-40 border border-border">
                  <LanguageSelector onClose={() => setLanguageSelectorOpen(false)} />
                </div>
              )}
            </div>
          </div>

          {/* User Account Section */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-3 rounded-full">
                    <UserCircle className="h-4 w-4" />
                    <span className="max-w-[100px] truncate text-sm">{user?.name || (isAdmin ? 'Admin' : 'User')}</span>
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
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-sm">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="rounded-full text-sm">
                    {t('register')}
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ShieldCheck className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="ml-1">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-lg border-b border-border animate-in fade-in slide-in-from-top-5">
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
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('language')}</span>
                <FontSizeToggle />
              </div>
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
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="block text-sm font-medium py-2 transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        {t('login')}
                      </Button>
                    </Link>
                    
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full rounded-full">{t('register')}</Button>
                    </Link>
                    
                    <Link
                      to="/admin-login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        {t('admin_login')}
                      </Button>
                    </Link>
                  </div>
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
