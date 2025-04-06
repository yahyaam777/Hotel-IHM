
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hotel, MapPin, Star } from "lucide-react";

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    price: number;
    rating: number;
    description: string;
    image: string;
    tags: string[];
  };
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`${hotel.image}`} 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {hotel.tags.includes('Featured') && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{hotel.location}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{hotel.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {hotel.tags.filter(tag => tag !== 'Featured').map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div>
          <span className="font-semibold">${hotel.price}</span>
          <span className="text-sm text-muted-foreground"> / night</span>
        </div>
        <Button size="sm" asChild>
          <Link to={`/hotels/${hotel.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
