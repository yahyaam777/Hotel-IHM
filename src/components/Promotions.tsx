
import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Sparkles, Percent } from 'lucide-react';

// Add translations to use-language.tsx later

const promotions = [
  {
    id: 1,
    title: {
      en: 'Summer Special',
      fr: 'Offre d\'été',
      ar: 'عرض الصيف'
    },
    description: {
      en: 'Get 25% off on beach resorts for stays between June and August.',
      fr: 'Obtenez 25% de réduction sur les stations balnéaires pour les séjours entre juin et août.',
      ar: 'احصل على خصم 25% على منتجعات الشاطئ للإقامة بين يونيو وأغسطس.'
    },
    discount: '25%',
    type: 'seasonal',
    icon: CalendarDays
  },
  {
    id: 2,
    title: {
      en: 'Last Minute Deals',
      fr: 'Offres de dernière minute',
      ar: 'عروض اللحظة الأخيرة'
    },
    description: {
      en: 'Book within 48 hours of stay and get up to 40% discount.',
      fr: 'Réservez dans les 48 heures précédant votre séjour et bénéficiez jusqu\'à 40% de réduction.',
      ar: 'احجز قبل 48 ساعة من الإقامة واحصل على خصم يصل إلى 40%.'
    },
    discount: '40%',
    type: 'flash',
    icon: Sparkles
  },
  {
    id: 3,
    title: {
      en: 'Extended Stay',
      fr: 'Séjour prolongé',
      ar: 'إقامة طويلة'
    },
    description: {
      en: 'Stay 7+ nights and get 15% off your entire booking.',
      fr: 'Séjournez 7+ nuits et obtenez 15% de réduction sur l\'ensemble de votre réservation.',
      ar: 'أقم لمدة 7+ ليالي واحصل على خصم 15% على حجزك بالكامل.'
    },
    discount: '15%',
    type: 'loyalty',
    icon: Percent
  }
];

const Promotions = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-12 bg-accent/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' ? 'Offres Spéciales' : 
             language === 'ar' ? 'عروض خاصة' : 
             'Special Offers'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'fr' ? 'Découvrez nos promotions exclusives et économisez sur votre prochain séjour.' : 
             language === 'ar' ? 'اكتشف عروضنا الحصرية ووفر في إقامتك القادمة.' : 
             'Discover our exclusive promotions and save on your next stay.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="bg-background rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 border border-border"
            >
              <div className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {promo.discount} OFF
                  </Badge>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <promo.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {promo.title[language as keyof typeof promo.title]}
                    </h3>
                    <p className="text-muted-foreground">
                      {promo.description[language as keyof typeof promo.description]}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full bg-primary/10 text-primary hover:bg-primary/20 py-2 rounded-md transition-colors">
                    {language === 'fr' ? 'Voir plus' : 
                     language === 'ar' ? 'المزيد' : 
                     'Learn more'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
