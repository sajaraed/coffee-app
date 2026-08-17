import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import RecipeModal from './components/RecipeModal';
import LocationModal from './components/LocationModal';
import CheckoutModal from './components/CheckoutModal';

const MainContent = () => {
  const { products, cart, setCart, lang = 'ar' } = useApp();
  
  // حالات التحكم في النوافذ المنبثقة
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForRecipe, setSelectedProductForRecipe] = useState(null);
  
  // حالات البحث والتصفية
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // معالجة السلة: زيادة، نقصان، أو حذف
  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + delta;
        return newQuantity <= 0 ? prevCart.filter((item) => item.id !== productId) : prevCart.map((item) => item.id === productId ? { ...item, quantity: newQuantity } : item);
      } else if (delta > 0) {
        const productToAdd = products.find((p) => p.id === productId);
        return productToAdd ? [...prevCart, { ...productToAdd, quantity: 1 }] : prevCart;
      }
      return prevCart;
    });
  };

  const handleRemoveItem = (productId) => setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

  // بيانات تصنيفات المنتجات
  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'hot', labelAr: 'مشروبات ساخنة', labelEn: 'Hot Drinks' },
    { id: 'cold', labelAr: 'مشروبات باردة', labelEn: 'Cold Drinks' },
    { id: 'desserts', labelAr: 'حلويات', labelEn: 'Desserts' },
    { id: 'beans', labelAr: 'حبوب القهوة', labelEn: 'Coffee Beans' },
  ];

  // فلترة المنتجات بناءً على البحث والتصنيف
  const filteredProducts = products.filter((product) => {
    const productCat = (product.categoryId || '').toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesCategory = selectedCategory === 'all' || productCat === selectedCategory.toLowerCase();
    const matchesSearch = !query || (product.name?.ar?.toLowerCase().includes(query) || product.name?.en?.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const itemsTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* شريط التنقل العلوي */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenLocation={() => setIsLocationOpen(true)} />

      {/* قسم الترحيب الرئيسي */}
      <div className="pt-44 pb-16 px-6 max-w-7xl mx-auto text-center space-y-10">
        
        {/* العناوين */}
        <div className="space-y-4">
          <p className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase">
            {lang === 'ar' ? 'أصالة القهوة المختصة - غزة' : 'Specialty Coffee - Gaza'}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white">
            {lang === 'ar' ? 'استمتع بأفضل لحظات القهوة ☕' : 'Enjoy the Best Coffee Moments ☕'}
          </h1>
        </div>

        {/* حاوية موحدة لعرض البحث والتصنيفات بنفس العرض تماماً لترتيب الشكل */}
        <div className="max-w-xl mx-auto space-y-4">
          
          {/* حقل البحث */}
          <div className="w-full">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن مشروبك المفضل...' : 'Search for your favorite drink...'}
              className="w-full bg-stone-900 border border-stone-800 rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-xs text-stone-200 outline-none focus:border-amber-600 transition shadow-inner"
            />
          </div>

          {/* أزرار التصنيفات: مربعات أصغر وأكثر دقة بالجوال، وتكبر تدريجياً على اللابتوب */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-1.5 px-1 sm:py-2.5 sm:px-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium transition cursor-pointer text-center truncate ${
                  selectedCategory === cat.id 
                    ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/40' 
                    : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-800'
                }`}
              >
                {lang === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* قسم عرض الكاردات */}
      <main className="max-w-7xl mx-auto px-6 pb-32 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                cartQuantity={cart.find(i => i.id === product.id)?.quantity || 0}
                onUpdateQuantity={handleUpdateQuantity}
                onOpenRecipe={setSelectedProductForRecipe}
              />
            ))
          ) : (
            <p className="text-stone-500 col-span-full text-center py-20 text-xs">
              {lang === 'ar' ? 'لا توجد نتائج مطابقة.' : 'No matching products found.'}
            </p>
          )}
        </div>
      </main>

      {/* النوافذ الجانبية والمودالات */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} totalAmount={itemsTotal} onOrderSuccess={() => { setCart([]); setIsCheckoutOpen(false); }} />
      <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
      {selectedProductForRecipe && <RecipeModal product={selectedProductForRecipe} onClose={() => setSelectedProductForRecipe(null)} />}
    </div>
  );
};

function App() {
  return <AppProvider><MainContent /></AppProvider>;
}

export default App;