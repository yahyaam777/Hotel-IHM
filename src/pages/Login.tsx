import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth-context';

const Login = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';
  const { login, isAuthenticated } = useAuth();
  
  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If already logged in, redirect to the requested page or home
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a placeholder for actual user authentication
    // In a real app, this would validate with a backend
    setTimeout(() => {
      // Mock user login for demo (accepts any email/password)
      login({
        name: email.split('@')[0], // Use part of the email as the name
        email: email,
        role: 'user'
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        variant: "default",
      });
      
      // Redirect to the requested page or home
      navigate(redirectPath);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-md border border-border">
          <h1 className="text-2xl font-bold text-center mb-6">{t('login')}</h1>
          
          {redirectPath !== '/' && (
            <div className="mb-6 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
              Please log in to continue with your booking
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
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
              {isLoading ? 'Logging in...' : t('login')}
            </Button>
            
            {/* Social login options could be added here */}
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('no_account')} {' '}
              <Link to="/register" className="text-primary hover:underline">
                {t('register')}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              {t('are_you_admin')} {' '}
              <Link to="/admin-login" className="text-primary hover:underline">
                {t('admin_login')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
