import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays, differenceInDays } from 'date-fns';
import { CalendarIcon, ArrowLeft, Hotel, User, Users, BadgeCheck, LogIn, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/auth-context';
import { Navigate } from 'react-router-dom';

// Same hotel data structure from HotelDetails.tsx
const featuredHotels = [
  {
    id: "1",
    name: "Oceanview Resort",
    location: "Miami, Florida",
    price: 299,
    rating: 4.8,
    description: "A luxurious beachfront resort with stunning ocean views, multiple pools, and world-class dining options.",
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ["Featured", "Beach", "Pool", "Spa"],
    amenities: ["Free WiFi", "Restaurant", "Swimming Pool", "Spa", "Fitness Center", "Room Service", "Beachfront"],
    rooms: ["Deluxe Ocean View", "Standard Room", "Family Suite", "Presidential Suite"],
    longDescription: "Nestled on the pristine shores of Miami Beach, Oceanview Resort offers a perfect blend of luxury and comfort."
  },
  {
    id: "2",
    name: "Mountain Retreat Lodge",
    location: "Aspen, Colorado",
    price: 249,
    rating: 4.7,
    description: "Cozy mountain lodge surrounded by nature. Perfect for skiing in winter and hiking in summer.",
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ["Featured", "Mountain", "Ski-in/out", "Fireplace"],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Ski Storage", "Fireplace", "Hiking Trails", "Mountain Views"],
    rooms: ["Mountain View Room", "Deluxe Suite", "Family Cabin", "Chalet"],
    longDescription: "Mountain Retreat Lodge is an idyllic escape in the heart of the Colorado Rockies."
  },
  {
    id: "3",
    name: "Urban Boutique Hotel",
    location: "New York City, NY",
    price: 329,
    rating: 4.6,
    description: "Stylish boutique hotel in the heart of Manhattan, with easy access to major attractions.",
    image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ["City", "Shopping", "Nightlife"],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Concierge", "Business Center", "Fitness Room", "Valet Parking"],
    rooms: ["City View Room", "Executive Suite", "Penthouse Suite", "Standard Queen"],
    longDescription: "Urban Boutique Hotel offers a sophisticated sanctuary in the bustling heart of New York City."
  },
  {
    id: "4",
    name: "Sunset Villa Resort",
    location: "Santorini, Greece",
    price: 399,
    rating: 4.9,
    description: "Breathtaking clifftop villas with private pools overlooking the Aegean Sea and famous Santorini sunsets.",
    image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ["Featured", "Sea View", "Private Pool", "Luxury"],
    amenities: ["Free WiFi", "Private Pool", "Breakfast Service", "Concierge", "Airport Transfer", "Sunset Views", "Spa Services"],
    rooms: ["Cliffside Villa", "Honeymoon Suite", "Luxury Villa with Pool", "Premium Sea View Suite"],
    longDescription: "Perched on the cliffs of Santorini, Sunset Villa Resort offers unparalleled views of the caldera and the famous Aegean sunset."
  },
  {
    id: "5",
    name: "Historic Downtown Inn",
    location: "Charleston, South Carolina",
    price: 199,
    rating: 4.5,
    description: "Charming inn located in a beautifully restored historic building in the heart of Charleston's historic district.",
    image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ["Historic", "Central", "Breakfast"],
    amenities: ["Free WiFi", "Complimentary Breakfast", "Garden Courtyard", "Afternoon Tea", "Concierge", "Historic Tours", "Evening Wine Reception"],
    rooms: ["Queen Room", "King Suite", "Carriage House Room", "Garden Suite"],
    longDescription: "Step back in time at the Historic Downtown Inn, housed in a meticulously restored 19th-century building in Charleston's celebrated historic district."
  },
  {
    id: "6",
    name: "Desert Oasis Resort",
    location: "Scottsdale, Arizona",
    price: 279,
    rating: 4.7,
    description: "Luxurious desert resort featuring pools, golf courses, and spa treatments inspired by Native American traditions.",
    image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ["Desert", "Golf", "Spa"],
    amenities: ["Free WiFi", "Golf Course", "Multiple Pools", "Spa", "Desert Views", "Tennis Courts", "Fine Dining"],
    rooms: ["Desert View Room", "Casita Suite", "Pool Villa", "Luxury Suite"],
    longDescription: "Desert Oasis Resort is a sanctuary of luxury amidst the stunning Sonoran Desert landscape."
  }
];

const roomPriceMultipliers: { [key: string]: number } = {
  "Standard Room": 1,
  "Standard Queen": 1,
  "City View Room": 1.2,
  "Mountain View Room": 1.2,
  "Deluxe Ocean View": 1.5,
  "Deluxe Suite": 1.8,
  "Executive Suite": 2,
  "Family Suite": 2.2,
  "Family Cabin": 2.2,
  "Penthouse Suite": 3,
  "Presidential Suite": 4,
  "Cliffside Villa": 2.5,
  "Honeymoon Suite": 2.8,
  "Luxury Villa with Pool": 3.5,
  "Premium Sea View Suite": 3,
  "Queen Room": 1,
  "King Suite": 1.8,
  "Carriage House Room": 1.5,
  "Garden Suite": 1.7,
  "Desert View Room": 1.2,
  "Casita Suite": 1.7,
  "Pool Villa": 2.5,
  "Luxury Suite": 2.2,
  "Chalet": 2.5,
};

const Booking = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  
  const hotelId = searchParams.get('hotelId');
  const preSelectedRoom = searchParams.get('room');
  const hotel = featuredHotels.find(h => h.id === hotelId);

  // Booking form state
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [checkInDate, setCheckInDate] = useState<Date>(today);
  const [checkOutDate, setCheckOutDate] = useState<Date>(tomorrow);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(preSelectedRoom || '');
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [activePromotions, setActivePromotions] = useState([]);
  const [appliedPromotion, setAppliedPromotion] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If the URL has a room parameter, select that room
    if (preSelectedRoom) {
      setSelectedRoom(preSelectedRoom);
    }
    
    // Load promotions from localStorage
    try {
      const storedPromotions = localStorage.getItem('promotions');
      if (storedPromotions) {
        const allPromotions = JSON.parse(storedPromotions);
        // Filter promotions that apply to this hotel and are active
        const validPromotions = allPromotions.filter(promo => 
          promo.status === 'active' && 
          (promo.hotelIds.includes(hotelId) || promo.hotelIds.length === 0)
        );
        
        setActivePromotions(validPromotions);
        
        // Apply the highest discount automatically
        if (validPromotions.length > 0) {
          const highestPromo = validPromotions.reduce((highest, current) => 
            current.discountPercent > highest.discountPercent ? current : highest, validPromotions[0]);
          setAppliedPromotion(highestPromo);
          setDiscountPercent(highestPromo.discountPercent);
        }
      }
    } catch (error) {
      console.error('Error retrieving promotions from localStorage', error);
    }
  }, [preSelectedRoom, hotelId]);

  // If not authenticated, show login requirement
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                You need to be logged in to make a booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <LogIn className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Login Required</h3>
                    <div className="mt-2 text-sm">
                      <p>
                        Please log in or create an account to continue with your booking. 
                        This helps us keep your reservation secure and allows you to manage 
                        your bookings later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button onClick={() => navigate(`/login?redirect=${encodeURIComponent(`/booking?hotelId=${hotelId}${preSelectedRoom ? `&room=${encodeURIComponent(preSelectedRoom)}` : ''}`)}`)}>
                Login to Book
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle the case when hotel is not found
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10 max-w-7xl mx-auto w-full">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
            <p className="mb-8">Sorry, we couldn't find the hotel you were trying to book.</p>
            <Button onClick={() => navigate('/hotels')}>View All Hotels</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const calculateNights = () => {
    return differenceInDays(checkOutDate, checkInDate);
  };

  const getRoomPrice = (roomType: string) => {
    const basePrice = hotel.price;
    const multiplier = roomPriceMultipliers[roomType] || 1;
    const roomPrice = basePrice * multiplier;
    return roomPrice;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoom ? getRoomPrice(selectedRoom) : hotel.price;
    
    // Apply discount if there's an applied promotion
    const discountAmount = discountPercent > 0 ? (roomPrice * discountPercent / 100) : 0;
    const discountedPrice = roomPrice - discountAmount;
    
    const subtotal = discountedPrice * nights * rooms;
    const taxes = subtotal * 0.15; // 15% tax
    return {
      perNight: roomPrice,
      discountedPerNight: discountedPrice,
      discountAmount: discountAmount * nights * rooms,
      subtotal,
      taxes,
      total: subtotal + taxes
    };
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast({
        title: "No Promo Code",
        description: "Please enter a promotion code",
        variant: "destructive",
      });
      return;
    }
    
    // Find a matching promo code
    const matchingPromo = activePromotions.find(
      promo => promo.code.toLowerCase() === promoCode.trim().toLowerCase()
    );
    
    if (matchingPromo) {
      setAppliedPromotion(matchingPromo);
      setDiscountPercent(matchingPromo.discountPercent);
      toast({
        title: "Promotion Applied",
        description: `${matchingPromo.name} (${matchingPromo.discountPercent}% off) has been applied to your booking`,
        variant: "default",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "The promotion code you entered is invalid or expired",
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    if (bookingStep === 1) {
      // Validate first step
      if (!selectedRoom) {
        toast({
          title: "Selection Required",
          description: "Please select a room type to continue.",
          variant: "destructive",
        });
        return;
      }
      setBookingStep(2);
      window.scrollTo(0, 0);
    } else if (bookingStep === 2) {
      // Validate contact information
      if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email) {
        toast({
          title: "Information Required",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      // Create reservation
      handleCompleteBooking();
    }
  };

  const handleCompleteBooking = () => {
    // In a real app, this would send reservation data to a backend API
    const priceDetails = calculateTotal();
    
    // Generate mock reservation data to send to the admin dashboard
    const newReservation = {
      id: Math.floor(Math.random() * 10000).toString(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      guestName: user ? user.name : `${contactInfo.firstName} ${contactInfo.lastName}`,
      email: user ? user.email : contactInfo.email,
      phone: contactInfo.phone,
      checkIn: format(checkInDate, 'yyyy-MM-dd'),
      checkOut: format(checkOutDate, 'yyyy-MM-dd'),
      guests,
      rooms,
      roomType: selectedRoom,
      status: "pending",
      totalAmount: priceDetails.total,
      specialRequests: contactInfo.specialRequests,
      userId: user?.email || null
    };
    
    // Save to localStorage for the admin dashboard
    try {
      const storedReservations = localStorage.getItem('reservations');
      let existingReservations = [];
      
      if (storedReservations) {
        existingReservations = JSON.parse(storedReservations);
      }
      
      const updatedReservations = [...existingReservations, newReservation];
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));
      
      // Trigger storage event for other tabs (like admin dashboard)
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'reservations',
        newValue: JSON.stringify(updatedReservations)
      }));
    } catch (error) {
      console.error('Error saving reservation to localStorage', error);
    }
    
    // Show success message
    toast({
      title: "Booking Successful!",
      description: "Your reservation has been confirmed.",
      variant: "default",
    });
    
    // Redirect to a confirmation page
    navigate(`/booking-confirmation?reservationId=${newReservation.id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 max-w-7xl mx-auto w-full mb-10">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Your Stay</h1>
          <p className="text-muted-foreground">
            {hotel.name} - {hotel.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {bookingStep === 1 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Hotel className="mr-2 h-5 w-5" />
                    Step 1: Choose Your Stay Details
                  </CardTitle>
                  <CardDescription>
                    Select dates, room type, and number of guests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dates Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="check-in">Check In</Label>
                      <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkInDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={(date) => {
                              if (date) {
                                setCheckInDate(date);
                                setIsCheckInOpen(false);
                                // If check-out date is before check-in date, update it
                                if (checkOutDate <= date) {
                                  setCheckOutDate(addDays(date, 1));
                                }
                              }
                            }}
                            disabled={(date) => date < today}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="check-out">Check Out</Label>
                      <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOutDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={(date) => {
                              if (date) {
                                setCheckOutDate(date);
                                setIsCheckOutOpen(false);
                              }
                            }}
                            disabled={(date) => date <= checkInDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Room Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                      <SelectTrigger id="room-type">
                        <SelectValue placeholder="Select a room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hotel.rooms.map((room, index) => (
                          <SelectItem key={index} value={room}>
                            {room} - ${getRoomPrice(room)} per night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guests and Rooms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                        <SelectTrigger id="guests">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rooms">Number of Rooms</Label>
                      <Select value={rooms.toString()} onValueChange={(value) => setRooms(parseInt(value))}>
                        <SelectTrigger id="rooms">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Room' : 'Rooms'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleContinue}>Continue to Guest Information</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Step 2: Guest Information
                  </CardTitle>
                  <CardDescription>
                    Enter your contact details to complete the booking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={contactInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={contactInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={contactInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Input
                      id="specialRequests"
                      name="specialRequests"
                      value={contactInfo.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requests or preferences"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setBookingStep(1)}>Back</Button>
                  <Button onClick={handleContinue}>Complete Booking</Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={hotel.image} alt={hotel.name} className="h-20 w-20 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates</span>
                    <span>
                      {format(checkInDate, "MMM d")} - {format(checkOutDate, "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length of stay</span>
                    <span>{calculateNights()} nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span>{guests} {guests === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rooms</span>
                    <span>{rooms} {rooms === 1 ? 'room' : 'rooms'}</span>
                  </div>
                  {selectedRoom && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room type</span>
                      <span>{selectedRoom}</span>
                    </div>
                  )}
                </div>

                {/* Promotion Code Input */}
                <div className="pt-4 border-t border-border">
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="promoCode">Promotion Code</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="promoCode"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        className="whitespace-nowrap"
                        onClick={handleApplyPromoCode}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Applied Promotion */}
                  {appliedPromotion && (
                    <div className="mt-3 p-3 bg-green-50 rounded-md flex items-start space-x-2">
                      <Tag className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">{appliedPromotion.name}</p>
                        <p className="text-xs text-green-700">{appliedPromotion.discountPercent}% discount applied</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {discountPercent > 0 ? (
                        <>
                          <span className="line-through">${selectedRoom ? calculateTotal().perNight.toFixed(2) : hotel.price}</span>
                          {" "}
                          <span className="text-green-600">${selectedRoom ? calculateTotal().discountedPerNight.toFixed(2) : hotel.price * (1 - discountPercent / 100)}</span>
                        </>
                      ) : (
                        <>${selectedRoom ? calculateTotal().perNight.toFixed(2) : hotel.price}</>
                      )} 
                      x {calculateNights()} nights x {rooms} {rooms === 1 ? 'room' : 'rooms'}
                    </span>
                    <span>${calculateTotal().subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${calculateTotal().discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees (15%)</span>
                    <span>${calculateTotal().taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-3">
                    <span>Total</span>
                    <span>${calculateTotal().total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-primary/10 p-3 rounded-md flex items-start space-x-3">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Free cancellation up to 24 hours before check-in. Reservation will be confirmed immediately.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking; 