import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Navigation, Loader2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

// 📍 قائمة المناطق
const LOCATIONS_LIST = [
  { id: 'gaza_rimal', nameAr: 'غزة - الرمال الشمالي / الجنوبي', nameEn: 'Gaza - Rimal', coords: [31.514, 34.453] },
  { id: 'gaza_daraj', nameAr: 'غزة - حي الدرج', nameEn: 'Gaza - Al-Daraj', coords: [31.508, 34.468] },
  { id: 'gaza_nafaq', nameAr: 'غزة - شارع النفق', nameEn: 'Gaza - Al-Nafaq St.', coords: [31.523, 34.463] },
  { id: 'gaza_tuffah', nameAr: 'غزة - حي التفاح', nameEn: 'Gaza - Al-Tuffah', coords: [31.515, 34.475] },
  { id: 'gaza_shujaiya', nameAr: 'غزة - الشجاعية', nameEn: 'Gaza - Al-Shujaiya', coords: [31.500, 34.482] },
  { id: 'gaza_nasr', nameAr: 'غزة - حي النصر', nameEn: 'Gaza - Al-Nasr', coords: [31.531, 34.448] },
  { id: 'gaza_sheikh_radwan', nameAr: 'غزة - الشيخ رضوان', nameEn: 'Gaza - Sheikh Radwan', coords: [31.538, 34.458] },
  { id: 'gaza_old_city', nameAr: 'غزة - البلد القديمة', nameEn: 'Gaza - Old City', coords: [31.503, 34.466] },
  { id: 'gaza_tel_hawa', nameAr: 'غزة - تل الهوى', nameEn: 'Gaza - Tel Al-Hawa', coords: [31.492, 34.438] },
  { id: 'gaza_sabra', nameAr: 'غزة - الصبرة', nameEn: 'Gaza - Al-Sabra', coords: [31.498, 34.458] },
  { id: 'gaza_zaytoun', nameAr: 'غزة - الزيتون', nameEn: 'Gaza - Al-Zaytoun', coords: [31.488, 34.468] },
  { id: 'gaza_shati', nameAr: 'غزة - مخيم الشاطئ', nameEn: 'Gaza - Shati Camp', coords: [31.527, 34.436] },
  { id: 'jabalia_town', nameAr: 'جباليا - البلد', nameEn: 'Jabalia Town', coords: [31.528, 34.483] },
  { id: 'jabalia_camp', nameAr: 'مخيم جباليا', nameEn: 'Jabalia Camp', coords: [31.538, 34.498] },
  { id: 'beit_lahia', nameAr: 'بيت لاهيا', nameEn: 'Beit Lahia', coords: [31.551, 34.488] },
  { id: 'nuseirat', nameAr: 'مخيم النصيرات', nameEn: 'Nuseirat Camp', coords: [31.448, 34.394] },
  { id: 'deir_balah', nameAr: 'دير البلح', nameEn: 'Deir Al-Balah', coords: [31.417, 34.350] },
  { id: 'khan_yunis_center', nameAr: 'خانيونس - وسط البلد', nameEn: 'Khan Yunis - Center', coords: [31.346, 34.306] },
  { id: 'rafah_center', nameAr: 'رفح - وسط البلد', nameEn: 'Rafah - Center', coords: [31.296, 34.243] },
];

export default function LocationModal({ isOpen, onClose }) {
  const { saveLocation, setLocation, location, lang } = useApp() || {};
  const isAr = lang === 'ar';

  const [selectedAreaId, setSelectedAreaId] = useState(LOCATIONS_LIST[2].id);
  const [coords, setCoords] = useState(
    location?.lat && location?.lng ? [location.lat, location.lng] : LOCATIONS_LIST[2].coords
  );
  const [areaName, setAreaName] = useState(location?.area || location?.city || (isAr ? LOCATIONS_LIST[2].nameAr : LOCATIONS_LIST[2].nameEn));
  const [addressDetails, setAddressDetails] = useState(location?.address || '');
  const [isLoadingGps, setIsLoadingGps] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    const L = window.L;
    if (!L) return;

    const timer = setTimeout(() => {
      if (!mapInstanceRef.current) {
        // إنشاء الخريطة
        const map = L.map(mapRef.current, { zoomControl: false }).setView(coords, 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'OpenStreetMap'
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `<div style="background-color: #d97706; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #1c1917; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transform: translate(-50%, -100%);">
                  <span style="font-size: 16px;">📍</span>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(map);

        mapInstanceRef.current = map;
        markerRef.current = marker;
      }

      // 💡 السطر الأهم: إجبار الخريطة على حساب أبعادها بعد ظهور المودال
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // عند اختيار منطقة من Dropdown
  const handleSelectArea = (e) => {
    const areaId = e.target.value;
    setSelectedAreaId(areaId);

    const found = LOCATIONS_LIST.find((item) => item.id === areaId);
    if (found) {
      const newCoords = found.coords;
      const newName = isAr ? found.nameAr : found.nameEn;

      setCoords(newCoords);
      setAreaName(newName);

      if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.setView(newCoords, 15);
        markerRef.current.setLatLng(newCoords);
        mapInstanceRef.current.invalidateSize();
      }
    }
  };

  const handleDetectGps = () => {
    if (!navigator.geolocation) return;
    setIsLoadingGps(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const newCoords = [latitude, longitude];

        setCoords(newCoords);

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView(newCoords, 16);
          markerRef.current.setLatLng(newCoords);
          mapInstanceRef.current.invalidateSize();
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&accept-language=${isAr ? 'ar' : 'en'}`
          );
          const data = await res.json();
          const preciseArea = data.address?.road || data.address?.neighbourhood || data.address?.suburb || (isAr ? 'موقعي الفعلي' : 'My Location');
          setAreaName(preciseArea);
        } catch {
          setAreaName(isAr ? 'موقع GPS' : 'GPS Location');
        } finally {
          setIsLoadingGps(false);
        }
      },
      () => setIsLoadingGps(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalLocation = {
      area: areaName,
      city: areaName,
      address: addressDetails || (isAr ? 'عنوان محدد' : 'Selected Area'),
      lat: coords[0],
      lng: coords[1]
    };

    if (saveLocation) saveLocation(finalLocation);
    else if (setLocation) setLocation(finalLocation);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-stone-900 border border-amber-600/40 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
        
        <button onClick={onClose} className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} text-stone-400 hover:text-white p-2 rounded-full cursor-pointer transition z-10`}>
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-10 h-10 bg-amber-600/20 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-600/30">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">{isAr ? 'اختر موقع التوصيل' : 'Select Delivery Location'}</h3>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-300 block">{isAr ? 'المنطقة / الحي:' : 'Area / Neighborhood'}</label>
          <select
            value={selectedAreaId}
            onChange={handleSelectArea}
            className="w-full bg-stone-950 border border-stone-800 text-stone-100 rounded-xl px-3.5 py-2.5 text-xs font-medium outline-none focus:border-amber-600 transition cursor-pointer"
          >
            {LOCATIONS_LIST.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {isAr ? loc.nameAr : loc.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* 🗺️ الخريطة المضمونة */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-800 h-52 bg-stone-950">
          <div ref={mapRef} className="w-full h-full z-0" style={{ minHeight: '200px' }} />
          
          <button
            type="button"
            onClick={handleDetectGps}
            disabled={isLoadingGps}
            className="absolute bottom-3 right-3 z-10 bg-stone-900/90 hover:bg-stone-800 text-amber-500 border border-amber-600/40 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer transition"
          >
            {isLoadingGps ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
            <span>{isAr ? 'تحديد موقعي' : 'My Location'}</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex justify-between items-center text-xs">
            <div>
              <span className="text-stone-400 block text-[10px]">{isAr ? 'المنطقة المحددة:' : 'Selected Area:'}</span>
              <span className="font-bold text-amber-400 text-sm">{areaName}</span>
            </div>
            
            <div className="text-right">
              <span className="text-stone-400 block text-[10px]">{isAr ? 'معلم قريب:' : 'Landmark / Details:'}</span>
              <input 
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder={isAr ? 'أدخل التفاصيل...' : 'Landmark...'}
                className="bg-transparent text-stone-200 text-xs outline-none text-right border-b border-stone-800 focus:border-amber-600 transition"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer">
            <Check className="w-4 h-4" />
            <span>{isAr ? 'تأكيد وحفظ العنوان' : 'Confirm Location'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}