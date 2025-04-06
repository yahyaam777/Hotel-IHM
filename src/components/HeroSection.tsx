
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const handleSearch = (e: React.MouseEvent<HTMLAnchorElement> | React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (destination) searchParams.set('destination', destination);
    if (checkInDate) searchParams.set('checkIn', checkInDate.toISOString());
    if (checkOutDate) searchParams.set('checkOut', checkOutDate.toISOString());
    searchParams.set('guests', guests.toString());
    searchParams.set('rooms', rooms.toString());
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80')",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl w-full space-y-10 md:space-y-16 z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Discover Your Perfect Stay
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Book unique accommodations and experiences around the world.
          </p>
        </div>

        {/* Search Form */}
        <div className="glass rounded-xl p-3 md:p-5 max-w-5xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Destination */}
              <div className="md:col-span-2 bg-white/80 dark:bg-gray-900/80 rounded-lg p-3 flex items-center">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-2" />
                <Input
                  type="text"
                  placeholder={t('search_destination')}
                  className="border-0 bg-transparent focus-visible:ring-0 text-base"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              
              {/* Check In */}
              <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                <PopoverTrigger asChild>
                  <button 
                    type="button"
                    className="bg-white/80 dark:bg-gray-900/80 rounded-lg p-3 flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('check_in')}</p>
                        <p className="text-sm font-medium">
                          {checkInDate ? format(checkInDate, 'PPP') : 'Add date'}
                        </p>
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={(date) => {
                      setCheckInDate(date);
                      setCheckInOpen(false);
                      if (date && (!checkOutDate || date > checkOutDate)) {
                        const newCheckOut = new Date(date);
                        newCheckOut.setDate(newCheckOut.getDate() + 1);
                        setCheckOutDate(newCheckOut);
                      }
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              
              {/* Check Out */}
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <button 
                    type="button"
                    className="bg-white/80 dark:bg-gray-900/80 rounded-lg p-3 flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('check_out')}</p>
                        <p className="text-sm font-medium">
                          {checkOutDate ? format(checkOutDate, 'PPP') : 'Add date'}
                        </p>
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
              
              {/* Guests & Rooms */}
              <div className="md:flex">
                <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <PopoverTrigger asChild>
                    <button 
                      type="button"
                      className="bg-white/80 dark:bg-gray-900/80 rounded-lg p-3 flex items-center justify-between w-full text-left"
                    >
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-2" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t('guests')} & {t('rooms')}</p>
                          <p className="text-sm font-medium">
                            {guests} {guests === 1 ? 'guest' : 'guests'}, {rooms} {rooms === 1 ? 'room' : 'rooms'}
                          </p>
                        </div>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4 p-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="guests">{t('guests')}</Label>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            disabled={guests <= 1}
                            type="button"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests}</span>
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
                        <Label htmlFor="rooms">{t('rooms')}</Label>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            disabled={rooms <= 1}
                            type="button"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{rooms}</span>
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
                      <Button 
                        className="w-full mt-2" 
                        onClick={() => setGuestsOpen(false)}
                        type="button"
                      >
                        {t('apply')}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                type="submit"
                size="lg" 
                className="rounded-full px-8 bg-primary hover:bg-primary/90"
              >
                {t('search_hotels')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
