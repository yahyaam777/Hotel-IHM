
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/hooks/use-language';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Star, 
  Building, 
  Umbrella, 
  Search as SearchIcon
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const Search = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Parse URL parameters
  const initialDestination = searchParams.get('destination') || '';
  const initialCheckIn = searchParams.get('checkIn') ? new Date(searchParams.get('checkIn') as string) : undefined;
  const initialCheckOut = searchParams.get('checkOut') ? new Date(searchParams.get('checkOut') as string) : undefined;
  const initialGuests = Number(searchParams.get('guests')) || 2;
  const initialRooms = Number(searchParams.get('rooms')) || 1;
  
  // Search state
  const [destination, setDestination] = useState(initialDestination);
  const [hotelName, setHotelName] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [rooms, setRooms] = useState(initialRooms);
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [starRating, setStarRating] = useState<number[]>([]);
  const [hotelType, setHotelType] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<string>('');
  
  // UI state
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  
  // Mock hotel data with enhanced properties
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Grand Hotel',
      location: 'Paris, France',
      price: 180,
      rating: 4.5,
      stars: 5,
      type: 'city',
      activities: ['bar', 'pool'],
      mealPlan: 'all-inclusive',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Coastal Resort',
      location: 'Bali, Indonesia',
      price: 220,
      rating: 4.8,
      stars: 4,
      type: 'beach',
      activities: ['animation', 'pool', 'slide', 'bar'],
      mealPlan: 'breakfast',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'City View Hotel',
      location: 'New York, USA',
      price: 350,
      rating: 4.2,
      stars: 3,
      type: 'city',
      activities: ['bar'],
      mealPlan: 'half-board',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ]);
  
  // Filter hotels based on search criteria
  const filteredHotels = hotels.filter(hotel => {
    // Basic filters
    const matchesDestination = destination === '' || hotel.location.toLowerCase().includes(destination.toLowerCase());
    const matchesHotelName = hotelName === '' || hotel.name.toLowerCase().includes(hotelName.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    
    // Advanced filters
    const matchesStarRating = starRating.length === 0 || starRating.includes(hotel.stars);
    const matchesHotelType = hotelType.length === 0 || 
      (hotelType.includes('city') && hotel.type === 'city') || 
      (hotelType.includes('beach') && hotel.type === 'beach');
    
    const matchesActivities = activities.length === 0 || 
      activities.every(activity => {
        if (activity === 'animation') return hotel.activities.includes('animation');
        if (activity === 'pool') return hotel.activities.includes('pool');
        if (activity === 'slide') return hotel.activities.includes('slide');
        if (activity === 'bar') return hotel.activities.includes('bar');
        return false;
      });
    
    const matchesMealPlan = mealPlan === '' || hotel.mealPlan === mealPlan;
    
    return matchesDestination && matchesHotelName && matchesPrice && 
           matchesStarRating && matchesHotelType && matchesActivities && matchesMealPlan;
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would fetch hotels from an API
  };

  const handleStarRatingChange = (stars: number) => {
    setStarRating(prev => 
      prev.includes(stars) 
        ? prev.filter(s => s !== stars) 
        : [...prev, stars]
    );
  };

  const handleHotelTypeChange = (type: string) => {
    setHotelType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleActivityChange = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity) 
        : [...prev, activity]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">{t('search_results')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-4 border border-border sticky top-24">
              <h2 className="text-xl font-semibold mb-4">{t('filter')}</h2>
              
              <form onSubmit={handleSearch} className="space-y-5">
                {/* Basic search inputs */}
                <div className="space-y-2">
                  <Label htmlFor="hotelName">{t('search_hotel_name')}</Label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="hotelName"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      className="pl-9"
                      placeholder={t('search_hotel_name')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">{t('destination')}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-9"
                      placeholder={t('search_destination')}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{t('arrival_date')}</Label>
                  <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, 'PPP') : <span>{t('check_in')}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={(date) => {
                          setCheckInDate(date);
                          setCheckInOpen(false);
                        }}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>{t('departure_date')}</Label>
                  <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, 'PPP') : <span>{t('check_out')}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={(date) => {
                          setCheckOutDate(date);
                          setCheckOutOpen(false);
                        }}
                        initialFocus
                        disabled={(date) => {
                          const minDate = checkInDate || new Date();
                          return date < minDate;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{t('price_range')}</Label>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={50}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as number[])}
                    className="py-4"
                  />
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-filters">
                    <AccordionTrigger>{t('advanced_filters')}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {/* Star Rating */}
                        <div className="space-y-2">
                          <Label>{t('star_rating')}</Label>
                          <div className="flex flex-wrap gap-2">
                            {[5, 4, 3, 2, 1].map((stars) => (
                              <Button
                                key={stars}
                                type="button"
                                variant={starRating.includes(stars) ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleStarRatingChange(stars)}
                                className="flex gap-1"
                              >
                                {stars} <Star className="h-3 w-3 fill-current" />
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Hotel Type */}
                        <div className="space-y-2">
                          <Label>{t('hotel_type')}</Label>
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="city-hotel" 
                                checked={hotelType.includes('city')}
                                onCheckedChange={() => handleHotelTypeChange('city')}
                              />
                              <Label htmlFor="city-hotel" className="cursor-pointer">
                                <div className="flex items-center">
                                  <Building className="mr-2 h-4 w-4" />
                                  {t('city_hotel')}
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="beach-hotel" 
                                checked={hotelType.includes('beach')}
                                onCheckedChange={() => handleHotelTypeChange('beach')}
                              />
                              <Label htmlFor="beach-hotel" className="cursor-pointer">
                                <div className="flex items-center">
                                  <Umbrella className="mr-2 h-4 w-4" />
                                  {t('beach_hotel')}
                                </div>
                              </Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* Activities */}
                        <div className="space-y-2">
                          <Label>{t('activities')}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="animation" 
                                checked={activities.includes('animation')}
                                onCheckedChange={() => handleActivityChange('animation')}
                              />
                              <Label htmlFor="animation">{t('animation')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="pool" 
                                checked={activities.includes('pool')}
                                onCheckedChange={() => handleActivityChange('pool')}
                              />
                              <Label htmlFor="pool">{t('swimming_pool')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="slide" 
                                checked={activities.includes('slide')}
                                onCheckedChange={() => handleActivityChange('slide')}
                              />
                              <Label htmlFor="slide">{t('water_slide')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="bar" 
                                checked={activities.includes('bar')}
                                onCheckedChange={() => handleActivityChange('bar')}
                              />
                              <Label htmlFor="bar">{t('bar')}</Label>
                            </div>
                          </div>
                        </div>
                        
                        {/* Meal Plan */}
                        <div className="space-y-2">
                          <Label>{t('meal_plan')}</Label>
                          <select 
                            className="w-full p-2 border border-input rounded-md bg-background"
                            value={mealPlan}
                            onChange={(e) => setMealPlan(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="breakfast">Breakfast Only</option>
                            <option value="half-board">Half Board</option>
                            <option value="full-board">Full Board</option>
                            <option value="all-inclusive">All Inclusive</option>
                          </select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex items-center justify-between">
                  <Label>{t('guests')}</Label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      type="button"
                    >
                      -
                    </Button>
                    <span className="mx-3">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                      type="button"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>{t('rooms')}</Label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      type="button"
                    >
                      -
                    </Button>
                    <span className="mx-3">{rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRooms(rooms + 1)}
                      type="button"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  {t('apply_filters')}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Search results */}
          <div className="lg:col-span-3">
            <div className="border-b border-border pb-4 mb-6">
              <p className="text-muted-foreground">
                {filteredHotels.length} {t('hotels_found')}
              </p>
            </div>
            
            {filteredHotels.length > 0 ? (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => (
                  <div key={hotel.id} className="bg-card rounded-lg overflow-hidden border border-border flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{hotel.name}</h3>
                          <p className="text-muted-foreground">{hotel.location}</p>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                          {hotel.rating}/5
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {hotel.type === 'city' && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-100">
                            {t('city_hotel')}
                          </span>
                        )}
                        {hotel.type === 'beach' && (
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full dark:bg-amber-900 dark:text-amber-100">
                            {t('beach_hotel')}
                          </span>
                        )}
                        {hotel.activities.map((activity) => (
                          <span key={activity} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-100">
                            {t(activity === 'pool' ? 'swimming_pool' : 
                              activity === 'slide' ? 'water_slide' : 
                              activity === 'animation' ? 'animation' : 'bar')}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex flex-col sm:flex-row justify-between items-end pt-4">
                        <div>
                          <p className="text-2xl font-bold">${hotel.price}</p>
                          <p className="text-sm text-muted-foreground">{t('per_night')}</p>
                        </div>
                        <Button className="mt-3 sm:mt-0">
                          {t('view_details')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {t('no_hotels_found')}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
