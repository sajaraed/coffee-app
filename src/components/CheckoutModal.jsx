import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Wallet, CreditCard, Building2, Phone, Truck, Edit3, Copy, Check, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CheckoutModal({ isOpen, onClose, totalAmount, onOrderSuccess }) {
  const { lang, user, location } = useApp() || {};
  const isAr = lang === 'ar';

  // خيارات الدفع بدعم اللغتين
  const PAYMENT_OPTIONS = [
    {
      id: 'jawwal_pay',
      title: isAr ? 'جوال باي' : 'Jawwal Pay',
      accountNumber: '0599000000',
      accountInfo: '0599000000',
      icon: Phone,
      color: 'text-green-500'
    },
    {
      id: 'palpay',
      title: isAr ? 'بال باي' : 'PalPay',
      accountNumber: '1234567',
      accountInfo: '1234567',
      icon: Wallet,
      color: 'text-sky-400'
    },
    {
      id: 'bop',
      title: isAr ? 'بنك فلسطين' : 'Bank of Palestine',
      accountNumber: '1234567-Gaza',
      accountInfo: '1234567 - غزة',
      icon: Building2,
      color: 'text-amber-500'
    },
    {
      id: 'cod',
      title: isAr ? 'كاش عند الاستلام' : 'Cash on Delivery',
      accountNumber: '',
      accountInfo: isAr ? 'الدفع للديلفري' : 'Pay delivery',
      icon: CreditCard,
      color: 'text-stone-300'
    }
  ];

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    area: '',
    address: '',
    paymentMethod: 'jawwal_pay',
    deliveryTime: 'now'
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({
        customerName: user?.name || '',
        phone: user?.phone || '',
        area: location?.area || (isAr ? 'الرمال' : 'Rimal'),
        address: location?.address || '',
        paymentMethod: 'jawwal_pay',
        deliveryTime: 'now'
      });
      setIsSubmitted(false);
      setCopied(false);
      setOrderId('GZ-' + Math.floor(1000 + Math.random() * 9000));
    }
  }, [isOpen, user, location, isAr]);

  if (!isOpen) return null;

  const deliveryFee = 10;
  const finalTotal = totalAmount + deliveryFee;
  const selectedPayment = PAYMENT_OPTIONS.find((p) => p.id === form.paymentMethod);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyAccount = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.address) return;

    setIsSubmitted(true);
    setTimeout(() => {
      onOrderSuccess();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4" dir={isAr ? 'rtl' : 'ltr'}>
      {/* 
        حجم الكارد يتغير حسب الشاشة:
        - على الجوال: مساحات داخلية دقيقة (p-2.5) وأقصى ارتفاع (max-h-[96vh]) لتجنب النزول.
        - على الشاشات الكبيرة (sm فما فوق): يصبح أوسع وأريح (p-5 sm:p-6).
      */}
      <div className="bg-stone-900 border border-amber-600/40 rounded-2xl sm:rounded-3xl max-w-md sm:max-w-xl w-full p-2.5 sm:p-6 relative shadow-2xl max-h-[96vh] flex flex-col justify-between overflow-y-auto custom-scrollbar">
        
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer transition hover:bg-stone-800 z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4 sm:py-8 space-y-2 sm:space-y-4 my-auto">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-500 mx-auto animate-bounce" />
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="text-base sm:text-2xl font-bold text-white">
                {isAr ? '!تم إرسال طلبك بنجاح' : 'Order Placed Successfully!'}
              </h3>
              <p className="text-amber-500 text-[10px] sm:text-xs font-semibold">
                {isAr ? `رقم الطلب: ${orderId}` : `Order ID: ${orderId}`}
              </p>
            </div>
            
            <div className={`bg-stone-950 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-800 text-[10px] sm:text-xs space-y-1 sm:space-y-2 max-w-sm mx-auto ${isAr ? 'text-right' : 'text-left'}`}>
              <p><span className="text-stone-500">{isAr ? 'الاسم:' : 'Name:'}</span> {form.customerName}</p>
              <p><span className="text-stone-500">{isAr ? 'الجوال:' : 'Phone:'}</span> {form.phone}</p>
              <p><span className="text-stone-500">{isAr ? 'العنوان:' : 'Address:'}</span> {form.area} - {form.address}</p>
              <p><span className="text-stone-500">{isAr ? 'طريقة الدفع:' : 'Payment:'}</span> {selectedPayment?.title}</p>
              <p className="font-bold text-amber-500 text-[11px] sm:text-sm pt-1.5 border-t border-stone-800">
                {isAr ? 'الإجمالي:' : 'Total:'} {finalTotal} ₪
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-3">
            {/* الهيدر وملخص السعر */}
            <div className="text-center border-b border-stone-800/80 pb-1.5 sm:pb-3">
              <h3 className="text-xs sm:text-lg font-bold text-white">
                {isAr ? 'مراجعة وإتمام الطلب' : 'Review & Complete Order'}
              </h3>
              
              <div className="bg-stone-950 px-2 sm:px-3 py-1.5 rounded-xl border border-stone-800 mt-1 sm:mt-3 text-[9px] sm:text-xs flex items-center justify-around max-w-md mx-auto text-stone-300">
                <span>{isAr ? 'المنتجات:' : 'Subtotal:'} <strong className="text-stone-100">{totalAmount} ₪</strong></span>
                <span className="text-stone-600">|</span>
                <span>{isAr ? 'التوصيل:' : 'Delivery:'} <strong className="text-stone-100">{deliveryFee} ₪</strong></span>
                <span className="text-stone-600">|</span>
                <span className="text-amber-500 font-bold">{isAr ? 'الإجمالي:' : 'Total:'} {finalTotal} ₪</span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-1.5 sm:space-y-3">
              {/* بيانات المستلم والتوصيل */}
              <div className="space-y-1 sm:space-y-2">
                <h4 className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                  <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {isAr ? 'بيانات المستلم والتوصيل' : 'Recipient Details'}
                </h4>

                <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
                  <input 
                    type="text" 
                    name="customerName"
                    required 
                    value={form.customerName}
                    onChange={handleChange}
                    placeholder={isAr ? 'الاسم الكامل' : 'Full Name'}
                    className="bg-stone-950 border border-stone-800 rounded-lg sm:rounded-xl py-1 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs text-stone-100 outline-none focus:border-amber-600 transition"
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="059xxxxxxx"
                    className="bg-stone-950 border border-stone-800 rounded-lg sm:rounded-xl py-1 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs text-stone-100 outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
                  <input 
                    type="text" 
                    name="area"
                    required 
                    value={form.area}
                    onChange={handleChange}
                    placeholder={isAr ? 'المنطقة (الرمال...)' : 'Area'}
                    className="bg-stone-950 border border-stone-800 rounded-lg sm:rounded-xl py-1 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs text-stone-100 outline-none focus:border-amber-600 transition"
                  />
                  <input 
                    type="text" 
                    name="address"
                    required 
                    value={form.address}
                    onChange={handleChange}
                    placeholder={isAr ? 'العنوان التفصيلي' : 'Detailed Address'}
                    className="bg-stone-950 border border-stone-800 rounded-lg sm:rounded-xl py-1 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs text-stone-100 outline-none focus:border-amber-600 transition"
                  />
                </div>
              </div>

              {/* وقت التوصيل */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, deliveryTime: 'now' }))}
                  className={`py-1 sm:py-2 px-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-semibold border transition cursor-pointer ${
                    form.deliveryTime === 'now' 
                      ? 'bg-amber-600/20 border-amber-600 text-amber-400' 
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  {isAr ? '⚡ في أسرع وقت (30د)' : '⚡ ASAP'}
                </button>
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, deliveryTime: 'later' }))}
                  className={`py-1 sm:py-2 px-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-semibold border transition cursor-pointer ${
                    form.deliveryTime === 'later' 
                      ? 'bg-amber-600/20 border-amber-600 text-amber-400' 
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  {isAr ? '📅 جدول لاحقاً' : '📅 Schedule'}
                </button>
              </div>

              {/* وسائل الدفع */}
              <div className="space-y-1 sm:space-y-1.5">
                <h4 className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-wider">
                  {isAr ? 'طريقة الدفع' : 'Payment Method'}
                </h4>
                
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  {PAYMENT_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = form.paymentMethod === option.id;
                    return (
                      <label 
                        key={option.id}
                        className={`flex items-center justify-between p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border cursor-pointer transition ${
                          isSelected 
                            ? 'bg-amber-950/40 border-amber-600 ring-1 ring-amber-600/40' 
                            : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${option.color}`} />
                          <div className="truncate">
                            <p className="text-[9px] sm:text-[11px] font-bold text-stone-200 truncate">{option.title}</p>
                            <p className="text-[7px] sm:text-[9px] text-stone-400 truncate">{option.accountInfo}</p>
                          </div>
                        </div>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value={option.id}
                          checked={isSelected}
                          onChange={handleChange}
                          className="accent-amber-600 shrink-0 ml-1 scale-75 sm:scale-100"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ملاحظة وزر النسخ */}
              {selectedPayment && selectedPayment.id !== 'cod' && (
                <div className="bg-amber-600/10 border border-amber-600/30 px-2.5 py-1 sm:py-2 rounded-lg sm:rounded-xl flex items-center justify-between">
                  <span className="text-[9px] sm:text-[11px] text-amber-400 truncate">
                    {isAr ? `تحويل (${finalTotal}₪) إلى ${selectedPayment.title}:` : `Transfer to ${selectedPayment.title}:`}
                    <strong className="text-white mx-1">{selectedPayment.accountNumber}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(selectedPayment.accountNumber)}
                    className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[8px] sm:text-[10px] font-semibold flex items-center gap-1 transition cursor-pointer border border-amber-600/40 shrink-0"
                  >
                    {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copied ? (isAr ? 'تم' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 sm:py-3 rounded-xl transition cursor-pointer shadow-lg shadow-amber-950/50 text-[11px] sm:text-sm mt-1"
              >
                {isAr ? `تأكيد وإرسال الطلب (${finalTotal} ₪)` : `Confirm & Place Order (${finalTotal} ₪)`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}