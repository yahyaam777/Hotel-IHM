
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Traveler',
    content: 'HotelHub made finding and booking my business trips so easy. The interface is intuitive, and I love the detailed hotel information.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Family Vacation',
    content: 'We used HotelHub for our family vacation and found the perfect hotel with kid-friendly amenities. The booking process was seamless.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Solo Traveler',
    content: 'As a solo traveler, I appreciate the detailed reviews and safety information. HotelHub helps me find the best accommodations wherever I go.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/63.jpg'
  }
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t('what_our_guests_say')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('guest_experiences')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                  ))}
                </div>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex items-center pt-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;