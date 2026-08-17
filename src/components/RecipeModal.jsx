import React from 'react';
import { X, Coffee, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RecipeModal({ product, onClose }) {
  const { lang = 'ar' } = useApp() || {};

  if (!product) return null;

  const name = product.name[lang] || product.name.ar;
  const ingredients = product.ingredients?.[lang] || product.ingredients?.ar;
  const allergens = product.allergens?.[lang] || product.allergens?.ar;
  const recipe = product.recipe?.[lang] || product.recipe?.ar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-stone-900 border border-amber-600/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition-all">
        
        {/* Header Image */}
        <div className="relative h-48 bg-stone-950">
          <img src={product.image} alt={name} className="w-full h-full object-cover opacity-60" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-stone-900/80 hover:bg-stone-800 text-stone-300 p-2 rounded-full backdrop-blur-sm transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-amber-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'التفاصيل والمكونات' : 'Details & Ingredients'}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">{name}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Ingredients Section */}
          {ingredients && (
            <div className="bg-stone-950/60 p-4 rounded-2xl border border-amber-900/30">
              <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'المكونات الأساسية' : 'Ingredients'}
              </h4>
              <p className="text-stone-200 text-sm leading-relaxed">{ingredients}</p>
            </div>
          )}

          {/* Allergy Warning Box */}
          {allergens && (
            <div className="bg-amber-950/40 border border-amber-600/50 p-4 rounded-2xl flex items-start gap-3 text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-amber-400 uppercase mb-0.5">
                  {lang === 'ar' ? 'تنبيه الحساسية' : 'Allergen Warning'}
                </h5>
                <p className="text-xs text-amber-100/90 leading-relaxed">{allergens}</p>
              </div>
            </div>
          )}

          {/* Recipe Section */}
          {recipe && (
            <div className="bg-stone-950/40 p-4 rounded-2xl border border-stone-800">
              <h4 className="text-stone-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                {lang === 'ar' ? 'طريقة التحضير' : 'Recipe'}
              </h4>
              <p className="text-stone-300 text-xs leading-relaxed">{recipe}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition cursor-pointer mt-2"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}