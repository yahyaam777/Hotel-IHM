import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, ArrowLeft, Wifi, Utensils, DollarSign, Check, Tag } from 'lucide-react';
import { useAuth } from '@/hooks/auth-context';
import { useToast } from '@/components/ui/use-toast';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

// Static list of featured hotels (same as in Index.tsx)
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
    longDescription: "Nestled on the pristine shores of Miami Beach, Oceanview Resort offers a perfect blend of luxury and comfort. Wake up to breathtaking views of the Atlantic Ocean, indulge in culinary delights at our multiple restaurants, and unwind by one of our spectacular pools. Our spa provides rejuvenating treatments, and our prime location puts you just steps away from the vibrant Miami Beach scene. Whether you're traveling for business or pleasure, our dedicated staff ensures a memorable stay with impeccable service."
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
    longDescription: "Mountain Retreat Lodge is an idyllic escape in the heart of the Colorado Rockies. Our warm and welcoming lodge offers a perfect base for year-round mountain activities. In winter, enjoy direct access to world-class skiing with our convenient ski-in/ski-out location. Summer brings lush hiking trails, mountain biking, and wildlife viewing opportunities. After a day of adventure, unwind by our grand stone fireplace in the main lodge or enjoy a meal crafted from locally-sourced ingredients at our rustic restaurant. Our cozy accommodations blend mountain charm with modern comforts for an unforgettable stay."
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
    longDescription: "Urban Boutique Hotel offers a sophisticated sanctuary in the bustling heart of New York City. Our meticulously designed rooms blend contemporary elegance with comfort, creating a perfect retreat after exploring the city. Located just steps from iconic Manhattan landmarks, world-class shopping, and diverse dining options, our hotel puts the best of NYC at your fingertips. Our knowledgeable concierge team can help plan your perfect city experience, from Broadway shows to exclusive restaurant reservations. Whether you're visiting for business or leisure, our boutique hotel offers personalized service with a distinctly New York sensibility."
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
    longDescription: "Perched on the cliffs of Santorini, Sunset Villa Resort offers unparalleled views of the caldera and the famous Aegean sunset. Each of our private villas features minimalist Cycladic architecture, complemented by modern luxuries and personalized services. Cool off in your private infinity pool that seems to merge with the blue horizon or enjoy a private dining experience on your terrace as the sun dips into the sea. Our attentive yet discreet staff can arrange yacht excursions, wine tastings at local vineyards, or spa treatments in the privacy of your villa. Sunset Villa Resort represents the pinnacle of romantic luxury in one of the world's most breathtaking settings."
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
    longDescription: "Step back in time at the Historic Downtown Inn, housed in a meticulously restored 19th-century building in Charleston's celebrated historic district. Our inn combines period charm with modern comforts, featuring original hardwood floors, fireplaces, and antique furnishings alongside contemporary amenities. Start your day with our gourmet Southern breakfast before exploring cobblestone streets and antebellum architecture just outside our door. Return for afternoon tea in our lush courtyard garden, then join fellow guests for our complimentary evening wine reception. Our knowledgeable staff can arrange walking tours, carriage rides, and reservations at Charleston's renowned restaurants. Experience authentic Southern hospitality and the rich history of Charleston at our distinctive inn."
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
    longDescription: "Desert Oasis Resort is a sanctuary of luxury amidst the stunning Sonoran Desert landscape. Our resort seamlessly blends with its natural surroundings, offering spectacular views of rugged mountains and iconic saguaro cacti from every vantage point. Cool off in one of our five swimming pools, challenge yourself on our championship golf course, or find serenity in our award-winning spa featuring treatments inspired by ancient Native American healing traditions. The resort's architecture honors the Southwest's rich heritage while providing all modern luxuries. Dine under starlit skies at our outdoor restaurant featuring locally-sourced ingredients and regional specialties. Desert Oasis Resort captures the mystical beauty and tranquility of the Arizona desert while providing an indulgent retreat for discerning travelers."
  }
];

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotel = featuredHotels.find(h => h.id === id);
  const [selectedRoom, setSelectedRoom] = useState('');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activePromotions, setActivePromotions] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (hotel) {
      setOriginalPrice(hotel.price);
      // Load promotions from localStorage
      try {
        const storedPromotions = localStorage.getItem('promotions');
        if (storedPromotions) {
          const allPromotions = JSON.parse(storedPromotions);
          // Filter promotions that apply to this hotel and are active
          const validPromotions = allPromotions.filter(promo => 
            promo.status === 'active' && 
            (promo.hotelIds.includes(id) || promo.hotelIds.length === 0)
          );
          
          setActivePromotions(validPromotions);
          
          // Apply the highest discount if there are valid promotions
          if (validPromotions.length > 0) {
            const highestDiscount = Math.max(...validPromotions.map(p => p.discountPercent));
            setDiscountPercent(highestDiscount);
            const newPrice = Math.round(hotel.price * (1 - highestDiscount / 100));
            setDiscountedPrice(newPrice);
          } else {
            setDiscountedPrice(hotel.price);
          }
        }
      } catch (error) {
        console.error('Error retrieving promotions from localStorage', error);
        setDiscountedPrice(hotel.price);
      }
    }
  }, [hotel, id]);

  const handleBookNow = (roomType?: string) => {
    const roomParam = roomType ? `&room=${encodeURIComponent(roomType)}` : '';
    const bookingPath = `/booking?hotelId=${id}${roomParam}`;
    
    if (isAuthenticated) {
      navigate(bookingPath);
    } else {
      // Inform the user they need to login
      toast({
        title: "Login Required",
        description: "Please log in to continue with your booking",
        variant: "default",
      });
      // Redirect to login page with the booking path as redirect parameter
      navigate(`/login?redirect=${encodeURIComponent(bookingPath)}`);
    }
  };

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10 max-w-7xl mx-auto w-full mb-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
              <p className="mb-8">Sorry, we couldn't find the hotel you're looking for.</p>
              <Button onClick={() => navigate('/hotels')}>View All Hotels</Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
          </Button>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <motion.div className="relative rounded-lg overflow-hidden" variants={fadeIn}>
                <img
                  src={`${hotel.image}`}
                  alt={hotel.name}
                  className="w-full object-cover h-[400px]"
                />
                {hotel.tags.includes('Featured') && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </motion.div>

              {/* Hotel Info */}
              <motion.div variants={fadeIn}>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                  <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-6">
                  {hotel.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-lg mb-6">{hotel.longDescription}</p>
              </motion.div>

              {/* Amenities */}
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Promotions section */}
              {activePromotions.length > 0 && (
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
                  <div className="space-y-4">
                    {activePromotions.map((promo, index) => (
                      <Card key={index} className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6 pb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                <Tag className="h-5 w-5 text-primary mr-2" />
                                <h3 className="font-semibold text-lg">{promo.name}</h3>
                              </div>
                              <p className="text-muted-foreground mt-1">{promo.description}</p>
                              {promo.code && (
                                <div className="mt-2">
                                  <Badge variant="outline" className="font-mono">
                                    {promo.code}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <div className="bg-primary/10 px-3 py-1 rounded-full">
                              <span className="text-primary font-bold">{promo.discountPercent}% OFF</span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">
                            {promo.startDate && promo.endDate
                              ? `Valid from ${promo.startDate} to ${promo.endDate}`
                              : "Limited time offer"}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Available Rooms */}
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-semibold mb-4">Available Room Types</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.rooms.map((room, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">{room}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-muted-foreground">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {discountPercent > 0 ? (
                              <div className="flex items-center">
                                <span className="line-through text-sm mr-2">${hotel.price}</span>
                                <span className="text-primary font-medium">${Math.round(hotel.price * (1 - discountPercent / 100))}</span>
                              </div>
                            ) : (
                              <span>${hotel.price}</span>
                            )}
                          </div>
                          <Button size="sm" onClick={() => handleBookNow(room)}>Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div className="lg:col-span-1" variants={fadeIn}>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Starting from</span>
                      {discountPercent > 0 ? (
                        <div className="flex flex-col items-end">
                          <span className="line-through text-sm text-muted-foreground">${hotel.price} / night</span>
                          <span className="font-semibold text-primary">${discountedPrice} / night</span>
                        </div>
                      ) : (
                        <span className="font-semibold">${hotel.price} / night</span>
                      )}
                    </div>
                    {discountPercent > 0 && (
                      <div className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center justify-between">
                        <span>Discount applied</span>
                        <span className="font-semibold">{discountPercent}% off</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes & fees</span>
                      <span>${Math.round(discountedPrice * 0.15)}</span>
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${discountedPrice + Math.round(discountedPrice * 0.15)}</span>
                    </div>
                    <Button className="w-full" onClick={() => handleBookNow()}>Book Now</Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Free cancellation up to 24 hours before check-in
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    <div className="md:mb-10"></div>
      <Footer />
    </div>
  );
};

export default HotelDetails;