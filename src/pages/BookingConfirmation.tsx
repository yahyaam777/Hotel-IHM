import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Download, Calendar, Mail, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';

const BookingConfirmation = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reservationId = searchParams.get('reservationId');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // In a real app, you would fetch the reservation details from the backend using the reservationId

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 max-w-3xl mx-auto w-full mb-10">
        <Button variant="ghost" onClick={() => navigate('/hotels')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Browse More Hotels
        </Button>

        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader className="pb-4">
            <div className="mx-auto bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-center text-2xl">Booking Confirmed!</CardTitle>
            <CardDescription className="text-center">
              Your reservation has been successfully booked.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border border-border rounded-lg p-4 space-y-4 bg-white dark:bg-gray-950">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reservation ID</span>
                <span className="font-medium">{reservationId}</span>
              </div>
              
              <div className="pt-2 border-t border-border flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Booking Details</div>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your email address with all the details of your booking.
                  </p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Contact Us</div>
                  <p className="text-sm text-muted-foreground">
                    If you have any questions about your reservation, please contact our customer support team.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={() => navigate('/')}>
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground">
            Thank you for choosing GuestWise for your accommodation needs!
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation; 