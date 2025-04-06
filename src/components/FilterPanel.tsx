import React, { useState } from 'react'; 
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type FilterOptions = {
  location: string;
  rating: string;
  type: string;
  priceRange: [number, number];
  amenities: string[];
};

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  minPrice: number;
  maxPrice: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  onFilterChange,
  minPrice = 0,
  maxPrice = 1000
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    rating: '',
    type: '',
    priceRange: [minPrice, maxPrice],
    amenities: [],
  });

  const amenitiesList = ["Pool", "Restaurant", "Spa", "Fitness", "Bar"];

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      
      return { ...prev, amenities: newAmenities };
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[0] === maxPrice ? maxPrice : value[0]] }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      location: '',
      rating: '',
      type: '',
      priceRange: [minPrice, maxPrice],
      amenities: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.location !== '' ||
      (filters.rating !== '' && filters.rating !== 'all') ||
      (filters.type !== '' && filters.type !== 'all') ||
      filters.priceRange[0] !== minPrice ||
      filters.priceRange[1] !== maxPrice ||
      filters.amenities.length > 0
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>
      
      <div className="space-y-6">
        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="location">Destination</Label>
          <Input
            id="location"
            placeholder="City or region"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
        
        {/* Star Rating */}
        <div className="space-y-2">
          <Label htmlFor="stars">Star Rating</Label>
          <Select
            value={filters.rating}
            onValueChange={(value) => setFilters({ ...filters, rating: value })}
          >
            <SelectTrigger id="stars">
              <SelectValue placeholder="All ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ratings</SelectItem>
              <SelectItem value="5">5 stars</SelectItem>
              <SelectItem value="4">4 stars & above</SelectItem>
              <SelectItem value="3">3 stars & above</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Hotel Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Hotel Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Beach">Beach</SelectItem>
              <SelectItem value="Mountain">Mountain</SelectItem>
              <SelectItem value="City">City</SelectItem>
              <SelectItem value="Historic">Historic</SelectItem>
              <SelectItem value="Luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${filters.priceRange[0]} - ${maxPrice}
            </span>
          </div>
          <Slider
            defaultValue={[minPrice]}
            max={maxPrice}
            step={10}
            onValueChange={handlePriceChange}
          />
        </div>
        
        {/* Amenities */}
        <div className="space-y-3">
          <Label>Amenities</Label>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox 
                  id={`amenity-${amenity}`} 
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>

        {hasActiveFilters() && (
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
