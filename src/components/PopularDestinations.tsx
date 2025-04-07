import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

// Sample destination data
const destinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    properties: 843,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    name: 'Santorini',
    country: 'Greece',
    properties: 546,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d3c6a0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    properties: 1245,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    name: 'Tokyo',
    country: 'Japan',
    properties: 952,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 5,
    name: 'Dubai',
    country: 'UAE',
    properties: 734,
    image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 6,
    name: 'Bali',
    country: 'Indonesia',
    properties: 628,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const PopularDestinations = () => {
    const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t('popular_destinations')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('explore_popular_destinations')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Link 
              to={`/hotels?destination=${encodeURIComponent(destination.name)}`} 
              key={destination.id}
              className={cn(
                "group relative overflow-hidden rounded-lg shadow-md h-72 transform transition-transform duration-300 hover:-translate-y-1",
                index === 0 && "md:col-span-2 md:row-span-2 lg:col-span-2 md:h-auto",
              )}
            >
              <div className="absolute inset-0">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{destination.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-white/80">{destination.country}</p>
                  <p className="text-sm">{destination.properties} properties</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;