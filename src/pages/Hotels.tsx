import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HotelCard from '@/components/hotel-card';
import FilterPanel, { FilterOptions } from '@/components/FilterPanel';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

// Static list of featured hotels
const featuredHotels = [
  {
    id: "1",
    name: 'The Grand Resort',
    location: 'Paris, France',
    price: 299,
    rating: 4.8,
    reviews: 423,
    description: "A luxurious beachfront resort with stunning ocean views, multiple pools, and world-class dining options.",

    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Luxury', 'Pool']
  },
  {
    id: "2",
    name: 'Beachfront Paradise',
    location: 'Maldives',
    price: 459,
    rating: 4.9,
    reviews: 312,
    description: "A luxurious beachfront resort with stunning ocean views, multiple pools, and world-class dining options.",

    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Beach', 'All-Inclusive']
  },
  {
    id: "3",
    name: 'Urban Boutique Hotel',
    location: 'New York, USA',
    price: 249,
    rating: 4.7,
    reviews: 520,
    description: "A luxurious beachfront resort with stunning ocean views, multiple pools, and world-class dining options.",

    image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['City', 'Boutique']
  },
  {
    id: "4",
    name: 'Mountain Retreat',
    location: 'Swiss Alps',
    price: 329,
    rating: 4.8,
    reviews: 215,
    description: "A luxurious beachfront resort with stunning ocean views, multiple pools, and world-class dining options.",

    image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Mountain', 'Spa']
  }
];

const Hotels = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    rating: '',
    type: '',
    priceRange: [0, 1000],
    amenities: [],
  });

  const [filteredHotels, setFilteredHotels] = useState(featuredHotels);

  const handleFilterChange = (newFilters: FilterOptions) => {
    console.log("Applied filters:", newFilters);
    
    const filtered = featuredHotels.filter(hotel => {
      // Filter by location
      if (newFilters.location && !hotel.location.toLowerCase().includes(newFilters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by rating
      if (newFilters.rating && newFilters.rating !== 'all') {
        const minRating = parseInt(newFilters.rating);
        if (hotel.rating < minRating) {
          return false;
        }
      }
      
      // Filter by hotel type (via tags)
      if (newFilters.type && newFilters.type !== 'all' && 
          !hotel.tags.some(tag => tag.toLowerCase().includes(newFilters.type.toLowerCase()))) {
        return false;
      }
      
      // Filter by price
      if (hotel.price < newFilters.priceRange[0] || hotel.price > newFilters.priceRange[1]) {
        return false;
      }
      
      // Filter by amenities (via tags)
      if (newFilters.amenities.length > 0) {
        const lowerCaseAmenities = newFilters.amenities.map(a => a.toLowerCase());
        const lowerCaseTags = hotel.tags.map(t => t.toLowerCase());
        
        // Hotel must have at least one of the selected amenities
        if (!lowerCaseAmenities.some(amenity => lowerCaseTags.includes(amenity.toLowerCase()))) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredHotels(filtered);
  };

  const minPrice = Math.min(...featuredHotels.map(hotel => hotel.price));
  const maxPrice = Math.max(...featuredHotels.map(hotel => hotel.price));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-10 max-w-7xl mx-auto w-full md:mb-10">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-3xl font-bold mb-6">Our Hotels</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our collection of handpicked hotels for your perfect stay.
          </p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-8" initial="hidden" animate="visible" variants={fadeIn}>
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel 
              onFilterChange={handleFilterChange} 
              minPrice={minPrice} 
              maxPrice={maxPrice}
            />
          </div>
          
          {/* Hotel Listing */}
          <div className="lg:col-span-3">
            {filteredHotels.length > 0 ? (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={fadeIn}>
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </motion.div>
            ) : (
              <motion.div className="text-center py-12 bg-muted rounded-lg" variants={fadeIn}>
                <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find hotels that match your preferences.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;