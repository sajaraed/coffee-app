import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onOpenCheckout
}) {
  const { lang = 'ar' } = useApp() || {};

  if (!isOpen) return null;

  const deliveryFee = 10;
  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = itemsTotal + deliveryFee;

  const handleProceedToCheckout = () => {
    onClose();
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 ${lang === 'ar' ? 'right-0 pl-10' : 'left-0 pr-10'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-stone-900 border-l border-amber-900/30 text-stone-100 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-amber-500" />
              <h2 className="text-lg font-bold">
                {lang === 'ar' ? 'سلة الطلبات' : 'Your Order Cart'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-700 mx-auto" />
                <p className="text-stone-500 text-sm">
                  {lang === 'ar' ? 'السلة فارغة حالياً' : 'Your cart is empty'}
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemName = typeof item.name === 'object' ? (item.name[lang] || item.name.ar) : item.name;
                return (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 bg-stone-950 p-3.5 rounded-2xl border border-stone-800/80"
                  >
                    <img 
                      src={item.image} 
                      alt={itemName} 
                      className="w-16 h-16 object-cover rounded-xl border border-stone-800"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-100 truncate">{itemName}</h4>
                      <p className="text-amber-500 text-xs font-black mt-1">{item.price} ₪</p>
                      
                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Item */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-600 hover:text-red-400 p-2 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Calculations & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-800 space-y-3 bg-stone-950/80">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>{lang === 'ar' ? 'مجموع المنتجات:' : 'Subtotal:'}</span>
                  <span className="font-bold text-stone-200">{itemsTotal} ₪</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    {lang === 'ar' ? 'رسوم التوصيل:' : 'Delivery Fee:'}
                  </span>
                  <span className="font-bold text-stone-200">{deliveryFee} ₪</span>
                </div>
                <div className="border-t border-stone-800 pt-2 flex justify-between items-center text-sm font-extrabold text-amber-500">
                  <span>{lang === 'ar' ? 'الإجمالي الكلي:' : 'Total:'}</span>
                  <span className="text-xl font-black">{grandTotal} ₪</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl transition cursor-pointer shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 active:scale-95 mt-2"
              >
                <span>{lang === 'ar' ? `إتمام الطلب (${grandTotal} ₪)` : `Checkout (${grandTotal} ₪)`}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}