import React from 'react';
import { Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DateDisplay() {
  const { lang } = useApp() || { lang: 'ar' };
  const isAr = lang === 'ar';

  const today = new Date();

  // 1️⃣ التاريخ الميلادي
  const gregorianDate = new Intl.DateTimeFormat(isAr ? 'ar-EG' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(today);

  let hijriDate = '';
  try {
    hijriDate = new Intl.DateTimeFormat(isAr ? 'ar-SA-u-ca-islamic-umaalqura' : 'en-US-u-ca-islamic-umaalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(today);
  } catch {
    hijriDate = '';
  }

  return (
    <div 
      className="inline-flex items-center gap-2 bg-stone-900/80 border border-amber-600/30 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-medium"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="w-6 h-6 rounded-xl bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500 shrink-0">
        <Calendar className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-2 text-stone-300 text-[11px] sm:text-xs">
        <span className="font-semibold text-stone-200">
          {gregorianDate}
        </span>

        {hijriDate && (
          <>
            <span className="text-amber-600/60 font-bold">•</span>
            <span className="text-amber-400 font-medium">
              {hijriDate}
            </span>
          </>
        )}
      </div>
    </div>
  );
}