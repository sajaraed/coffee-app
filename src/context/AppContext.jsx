import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products'; // تأكدي من مسار ملف المنتجات

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('app_location');
    return saved ? JSON.parse(saved) : null;
  });

  // إضافة حالة المنتجات والسلة
  const [products] = useState(initialProducts || []);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('app_user');
    }
  }, [user]);

  useEffect(() => {
    if (location) {
      localStorage.setItem('app_location', JSON.stringify(location));
    } else {
      localStorage.removeItem('app_location');
    }
  }, [location]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const saveLocation = (locData) => setLocation(locData);

  return (
    <AppContext.Provider 
      value={{ 
        lang, 
        setLang, 
        user, 
        login, 
        logout, 
        location, 
        saveLocation,
        products,
        cart,
        setCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);