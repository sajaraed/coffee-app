import React from 'react';
import { Plus, Minus, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

function ProductCard({ product, cartQuantity, onUpdateQuantity, onOpenRecipe, index = 0 }) {
  const context = useApp() || {};
  const lang = context.lang || context.language || 'ar';
  const isAr = lang === 'ar';

  const productName = typeof product.name === 'object' ? (product.name[lang] || product.name.ar) : product.name;

  return (
    <div 
      data-aos="fade-up" 
      data-aos-duration="800"
      data-aos-delay={(index % 4) * 80}
      className="will-change-transform bg-stone-900/90 border border-stone-800 hover:border-amber-900/50 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/30 group relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div>
        {/* صورة المنتج */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-2 sm:mb-4 aspect-square bg-stone-950">
          <img 
            src={product.image} 
            alt={productName}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          />

          {/* 📖 زر الوصفة */}
          {product.recipe && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRecipe(product);
              }}
              className={`absolute top-2 ${isAr ? 'right-2' : 'left-2'} z-10 bg-stone-950/80 hover:bg-amber-600 text-amber-400 hover:text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-amber-900/40 backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-1`}
              title={isAr ? 'طريقة التحضير' : 'Recipe'}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>

        {/* العنوان والسعر */}
        <h3 className="font-bold text-stone-100 text-xs sm:text-base mb-0.5 sm:mb-1 truncate text-right">
          {productName}
        </h3>
        <p className="text-amber-500 font-extrabold text-xs sm:text-sm mb-2 sm:mb-4 text-right">
          {product.price} ₪
        </p>
      </div>

      {/* أزرار السلة */}
      <div>
        {cartQuantity > 0 ? (
          <div className="flex items-center justify-between bg-stone-950 border border-stone-800 p-1 sm:p-1.5 rounded-lg sm:rounded-xl">
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, -1)}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-200 hover:bg-stone-800 active:scale-90 transition cursor-pointer"
            >
              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="font-bold text-amber-400 text-xs sm:text-sm">{cartQuantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-200 hover:bg-stone-800 active:scale-90 transition cursor-pointer"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onUpdateQuantity(product.id, 1)}
            className="w-full bg-stone-950 hover:bg-amber-600 text-stone-300 hover:text-white border border-stone-800 hover:border-amber-600 font-bold py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 text-[11px] sm:text-xs active:scale-95 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAr ? 'إضافة' : 'Add'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// استخدام React.memo لمنع إعادة تحميل الكارت إذا لم تتغير بياناته
export default React.memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.cartQuantity === nextProps.cartQuantity &&
    prevProps.index === nextProps.index
  );
});