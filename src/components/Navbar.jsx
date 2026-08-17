import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ShoppingBag, 
  Menu, 
  X, 
  Globe, 
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DateDisplay from './DateDisplay';

export default function Navbar({ onOpenLocation, onOpenCart, cartCount: propCartCount }) {
  const { 
    location, 
    cart, 
    lang, 
    setLang 
  } = useApp() || {};

  const isAr = lang === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = propCartCount ?? (cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 shadow-2xl py-2 sm:py-3' 
          : 'bg-linear-to-b from-stone-950/90 via-stone-950/60 to-transparent py-2.5 sm:py-4'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 1️⃣ الشعار + زر الموقع */}
          <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-6 min-w-0">
            {/* الشعار */}
            <a href="#" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-600 flex items-center justify-center text-white font-black text-base sm:text-xl shadow-lg shadow-amber-600/30 group-hover:scale-105 transition">
                G
              </div>
              <span className="text-base sm:text-xl font-black tracking-tight text-white hidden xs:inline-block">
                Gaza<span className="text-amber-500">Bites</span>
              </span>
            </a>

            {/* 📍 زر تحديد الموقع */}
            <button
              onClick={onOpenLocation}
              className="flex items-center gap-1 sm:gap-2 bg-stone-900/90 hover:bg-stone-800 border border-stone-800 hover:border-amber-600/50 px-2 sm:px-3.5 py-1 sm:py-2 rounded-xl sm:rounded-2xl transition cursor-pointer text-xs font-medium text-stone-200 shadow-sm max-w-27.5 xs:max-w-36 sm:max-w-50"
            >
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-md sm:rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-500 shrink-0">
                <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="flex flex-col items-start min-w-0 overflow-hidden text-right">
                <span className="text-[8px] sm:text-[10px] text-stone-400 font-normal leading-none mb-0.5 whitespace-nowrap">
                  {isAr ? 'التوصيل إلى' : 'Deliver to'}
                </span>
                <span className="truncate font-semibold text-amber-400 text-[10px] sm:text-xs w-full">
                  {location?.area || location?.city || (isAr ? 'اختر موقعك' : 'Select Location')}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-stone-400 shrink-0 hidden sm:block" />
            </button>
          </div>

          {/* 2️⃣ عرض التاريخ للشاشات الكبيرة */}
          <div className="hidden lg:flex items-center">
            <DateDisplay />
          </div>

          {/* 3️⃣ أدوات التحكم السريعة (السلة، اللغة، الموبايل) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* 🌐 زر تغيير اللغة (يعمل في كافة الشاشات بشكل أنيق ووحيد) */}
            <button
              onClick={() => setLang && setLang(isAr ? 'en' : 'ar')}
              className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title={isAr ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-4 h-4 text-amber-500" />
              <span className="uppercase">{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* 🛒 زر السلة مع العداد */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-600 hover:bg-amber-500 text-white transition cursor-pointer shadow-lg shadow-amber-950/50 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-950 text-amber-400 text-[9px] sm:text-[10px] font-black border-2 border-amber-600 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

         
          </div>

        </div>

      </div>
    </header>
  );
}