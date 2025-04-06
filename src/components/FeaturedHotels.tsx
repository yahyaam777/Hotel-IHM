
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

// Sample hotel data
const featuredHotels = [
  {
    id: 1,
    name: 'The Grand Resort',
    location: 'Paris, France',
    price: 299,
    rating: 4.8,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Luxury', 'Pool']
  },
  {
    id: 2,
    name: 'Beachfront Paradise',
    location: 'Maldives',
    price: 459,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Beach', 'All-Inclusive']
  },
  {
    id: 3,
    name: 'Urban Boutique Hotel',
    location: 'New York, USA',
    price: 249,
    rating: 4.7,
    reviews: 520,
    image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['City', 'Boutique']
  },
  {
    id: 4,
    name: 'Mountain Retreat',
    location: 'Swiss Alps',
    price: 329,
    rating: 4.8,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Mountain', 'Spa']
  }
];

const FeaturedHotels = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Hotels</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the most extraordinary places to stay around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map((hotel) => (
            <Link to={`/hotels/${hotel.id}`} key={hotel.id}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {hotel.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{hotel.location}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">${hotel.price}</span>
                      <span className="text-sm text-muted-foreground"> / night</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {hotel.reviews} reviews
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
