import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, lang } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    
    login({ name, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-stone-900 border border-amber-600/40 rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-amber-600/20 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-600/30">
            <LogIn className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </h3>
          <p className="text-stone-400 text-xs mt-1">
            {lang === 'ar' ? 'سجل دخولك لمتابعة طلباتك وحفظ خياراتك' : 'Sign in to manage your orders'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-stone-300 font-medium mb-1.5">
              {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-500 absolute top-3.5 right-3" />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-600 rounded-xl py-2.5 pr-10 pl-3 text-sm text-stone-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-300 font-medium mb-1.5">
              {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute top-3.5 right-3" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-600 rounded-xl py-2.5 pr-10 pl-3 text-sm text-stone-100 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition cursor-pointer mt-2"
          >
            {lang === 'ar' ? 'دخول' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}