import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContext = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContext | undefined>(undefined);

// Basic translations
const translations: Record<string, Record<string, string>> = {
  en: {
    'home': 'Home',
    'hotels': 'Hotels',
    'about': 'About',
    'contact': 'Contact',
    'search': 'Search',
    'login': 'Log In',
    'register': 'Sign Up',
    'book_now': 'Book Now',
    'search_hotels': 'Search Hotels',
    'check_in': 'Check In',
    'check_out': 'Check Out',
    'guests': 'Guests',
    'rooms': 'Rooms',
    'view_details': 'View Details',
    'details': 'Details',
    'amenities': 'Amenities',
    'reviews': 'Reviews',
    'location': 'Location',
    'price': 'Price',
    'per_night': 'per night',
    'rating': 'Rating',
    'search_destination': 'Search destination',
    'search_results': 'Search Results',
    'filter': 'Filter',
    'sort': 'Sort',
    'recommended': 'Recommended',
    'price_low_high': 'Price: Low to High',
    'price_high_low': 'Price: High to Low',
    'guest_rating': 'Guest Rating',
    'password': 'Password',
    'forgot_password': 'Forgot Password?',
    'no_account': 'Don\'t have an account?',
    'create_account': 'Create Account',
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'age': 'Age',
    'marital_status': 'Marital Status',
    'select_status': 'Select Status',
    'single': 'Single',
    'married': 'Married',
    'address': 'Address',
    'confirm_password': 'Confirm Password',
    'already_have_account': 'Already have an account?',
    'price_range': 'Price Range',
    'destination': 'Destination',
    'hotels_found': 'hotels found',
    'no_hotels_found': 'No hotels match your search criteria.',
    'apply': 'Apply',
    'admin_login': 'Admin Login',
    'client_login': 'Client Login',
    'back_to': 'Back to',
    'star_rating': 'Star Rating',
    'hotel_type': 'Hotel Type',
    'city_hotel': 'City Hotel',
    'beach_hotel': 'Beach Hotel',
    'activities': 'Activities',
    'animation': 'Animation',
    'swimming_pool': 'Swimming Pool',
    'water_slide': 'Water Slide',
    'bar': 'Bar',
    'meal_plan': 'Meal Plan',
    'arrival_date': 'Arrival Date',
    'departure_date': 'Departure Date',
    'search_hotel_name': 'Search by hotel name',
    'advanced_filters': 'Advanced Filters',
    'apply_filters': 'Apply Filters'
  },
  fr: {
    'home': 'Accueil',
    'hotels': 'Hôtels',
    'about': 'À Propos',
    'contact': 'Contact',
    'search': 'Rechercher',
    'login': 'Connexion',
    'register': 'S\'inscrire',
    'book_now': 'Réserver',
    'search_hotels': 'Rechercher des Hôtels',
    'check_in': 'Arrivée',
    'check_out': 'Départ',
    'guests': 'Voyageurs',
    'rooms': 'Chambres',
    'view_details': 'Voir les Détails',
    'details': 'Détails',
    'amenities': 'Équipements',
    'reviews': 'Avis',
    'location': 'Emplacement',
    'price': 'Prix',
    'per_night': 'par nuit',
    'rating': 'Évaluation',
    'search_destination': 'Rechercher une destination',
    'search_results': 'Résultats de recherche',
    'filter': 'Filtrer',
    'sort': 'Trier',
    'recommended': 'Recommandé',
    'price_low_high': 'Prix: croissant',
    'price_high_low': 'Prix: décroissant',
    'guest_rating': 'Avis des clients',
    'password': 'Mot de passe',
    'forgot_password': 'Mot de passe oublié?',
    'no_account': 'Pas de compte?',
    'create_account': 'Créer un compte',
    'first_name': 'Prénom',
    'last_name': 'Nom',
    'age': 'Âge',
    'marital_status': 'État civil',
    'select_status': 'Sélectionner',
    'single': 'Célibataire',
    'married': 'Marié(e)',
    'address': 'Adresse',
    'confirm_password': 'Confirmer le mot de passe',
    'already_have_account': 'Vous avez déjà un compte?',
    'price_range': 'Fourchette de prix',
    'destination': 'Destination',
    'hotels_found': 'hôtels trouvés',
    'no_hotels_found': 'Aucun hôtel ne correspond à vos critères de recherche.',
    'apply': 'Appliquer',
    'admin_login': 'Connexion Admin',
    'client_login': 'Connexion Client',
    'back_to': 'Retour à',
    'star_rating': 'Nombre d\'étoiles',
    'hotel_type': 'Type d\'hôtel',
    'city_hotel': 'Hôtel de ville',
    'beach_hotel': 'Hôtel de plage',
    'activities': 'Activités',
    'animation': 'Animation',
    'swimming_pool': 'Piscine',
    'water_slide': 'Tobbogan',
    'bar': 'Bar',
    'meal_plan': 'Formule',
    'arrival_date': 'Date d\'arrivée',
    'departure_date': 'Date de départ',
    'search_hotel_name': 'Rechercher par nom d\'hôtel',
    'advanced_filters': 'Filtres avancés',
    'apply_filters': 'Appliquer les filtres'
  },
  ar: {
    'home': 'الرئيسية',
    'hotels': 'الفنادق',
    'about': 'عن الموقع',
    'contact': 'اتصل بنا',
    'search': 'بحث',
    'login': 'تسجيل الدخول',
    'register': 'إنشاء حساب',
    'book_now': 'احجز الآن',
    'search_hotels': 'البحث عن فنادق',
    'check_in': 'تسجيل الوصول',
    'check_out': 'تسجيل المغادرة',
    'guests': 'الضيوف',
    'rooms': 'الغرف',
    'view_details': 'عرض التفاصيل',
    'details': 'التفاصيل',
    'amenities': 'المرافق',
    'reviews': 'التقييمات',
    'location': 'الموقع',
    'price': 'السعر',
    'per_night': 'لليلة الواحدة',
    'rating': 'التقييم',
    'search_destination': 'البحث عن وجهة',
    'search_results': 'نتائج البحث',
    'filter': 'تصفية',
    'sort': 'ترتيب',
    'recommended': 'موصى به',
    'price_low_high': 'السعر: من الأقل إلى الأعلى',
    'price_high_low': 'السعر: من الأعلى إلى الأقل',
    'guest_rating': 'تقييم الضيوف',
    'password': 'كلمة المرور',
    'forgot_password': 'نسيت كلمة المرور؟',
    'no_account': 'ليس لديك حساب؟',
    'create_account': 'إنشاء حساب',
    'first_name': 'الاسم الأول',
    'last_name': 'اسم العائلة',
    'age': 'العمر',
    'marital_status': 'الحالة الاجتماعية',
    'select_status': 'اختر الحالة',
    'single': 'أعزب',
    'married': 'متزوج',
    'address': 'العنوان',
    'confirm_password': 'تأكيد كلمة المرور',
    'already_have_account': 'لديك حساب بالفعل؟',
    'price_range': 'نطاق السعر',
    'destination': 'الوجهة',
    'hotels_found': 'فنادق وجدت',
    'no_hotels_found': 'لا توجد فنادق تطابق معايير البحث الخاصة بك.',
    'apply': 'تطبيق',
    'admin_login': 'تسجيل دخول المسؤول',
    'client_login': 'تسجيل دخول العميل',
    'back_to': 'العودة إلى',
    'star_rating': 'تصنيف النجوم',
    'hotel_type': 'نوع الفندق',
    'city_hotel': 'فندق المدينة',
    'beach_hotel': 'فندق الشاطئ',
    'activities': 'أنشطة',
    'animation': 'ترفيه',
    'swimming_pool': 'حمام سباحة',
    'water_slide': 'منزلق مائي',
    'bar': 'بار',
    'meal_plan': 'خطة الوجبات',
    'arrival_date': 'تاريخ الوصول',
    'departure_date': 'تاريخ المغادرة',
    'search_hotel_name': 'البحث باسم الفندق',
    'advanced_filters': 'تصفية متقدمة',
    'apply_filters': 'تطبيق التصفية'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>(() => {
    // Try to get language from localStorage, otherwise use browser language or default to English
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      return savedLanguage;
    }

    const browserLang = navigator.language.split('-')[0];
    return ['en', 'fr', 'ar'].includes(browserLang) ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set direction attribute for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // You could also add a class to handle RTL-specific styles
    if (language === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language]);

  const setLanguage = (lang: string) => {
    if (['en', 'fr', 'ar'].includes(lang)) {
      setLanguageState(lang);
    }
  };

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English or return the key itself if not found
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContext => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
