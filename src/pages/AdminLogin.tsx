import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth-context';

const AdminLogin = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();

  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If already logged in as admin, redirect to dashboard
    if (isAuthenticated && isAdmin) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a placeholder for actual admin authentication
    // In a real app, this would validate with a backend
    setTimeout(() => {
      // Mock admin credentials for demo
      if (email === 'admin@example.com' && password === 'admin123') {
        login({
          name: 'Administrator',
          email: email,
          role: 'admin'
        });
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard!",
          variant: "default",
        });
        
        // Redirect to admin dashboard
        navigate('/admin-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-md border border-border">
          <h1 className="text-2xl font-bold text-center mb-6">{t('admin_login')}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('password')}</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  {t('forgot_password')}
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : t('admin_login')}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('back_to')} {' '}
              <Link to="/login" className="text-primary hover:underline">
                {t('client_login')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
