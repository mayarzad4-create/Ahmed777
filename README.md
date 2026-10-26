# A.M.R STORE

متجر إلكتروني كامل مبني بـ React + Vite + Tailwind CSS.

## التشغيل

1. تثبيت الحزم:
   ```bash
   npm install
   ```
2. تشغيل المطور:
   ```bash
   npm run dev
   ```
3. بناء المشروع للإنتاج:
   ```bash
   npm run build
   ```

## هيكل المشروع

```bash
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .gitignore
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── README.md
```

## المميزات

- واجهة متجر عربية بالكامل
- قسم المنتجات + تصنيف + بحث
- قائمة المفضلة
- سلة المشتريات
- نظام كوبونات الخصم
- صفحة إتمام الطلب عبر WhatsApp
- لوحة إدارة للمنتجات والطلبات والإعدادات
- وضع داكن/فاتح
- حفظ البيانات محلياً باستخدام localStorage
``import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, Shield, User, ShoppingCart, 
  Package, TrendingUp, Users, Settings, Plus, Edit, Trash2, 
  CheckCircle, Clock, Truck, AlertCircle, X, ChevronRight, 
  Phone, MapPin, CreditCard, DollarSign, MessageCircle, 
  Eye, ToggleLeft, ToggleRight, Check, RefreshCw, BarChart2, 
  Database, Code, Menu, Bell, Percent, Sliders, ExternalLink, Moon, Sun, Lock, Layers,
  Map, Navigation, CheckCircle2, CircleDashed, Wallet, ShieldCheck, Copy, Grid, Layers3, Tag, Heart
} from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 'all', name: 'الكل' },
  { id: 'electronics', name: 'إلكترونيات' },
  { id: 'fashion', name: 'أزياء وملابس' },
  { id: 'home', name: 'المنزل والديكور' },
  { id: 'beauty', name: 'عناية وجمال' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'سماعات أذن لاسلكية عزل ضوضاء فائق',
    description: 'سماعات مريحة مع تقنية إلغاء الضوضاء النشطة، بطارية تدوم حتى 30 ساعة وصوت نقي عالي الجودة.',
    price: 349,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.8,
    salesCount: 142,
    variants: [
      { id: 'v1-1', color: 'أسود', size: 'قياسي', stock: 12, sku: 'AMR-EAR-BLK-STD', priceOffset: 0 },
      { id: 'v1-2', color: 'أبيض', size: 'قياسي', stock: 8, sku: 'AMR-EAR-WHT-STD', priceOffset: 0 }
    ]
  },
  {
    id: 'prod-2',
    title: 'ساعة ذكية مقاومة للماء مع تتبع لياقة',
    description: 'ساعة متطورة لمتابعة الأنشطة الرياضية، نبضات القلب، ومستويات الأكسجين في الدم.',
    price: 599,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    rating: 4.6,
    salesCount: 89,
    variants: [
      { id: 'v2-1', color: 'أسود', size: '40mm', stock: 5, sku: 'AMR-WTC-BLK-40', priceOffset: 0 },
      { id: 'v2-2', color: 'أسود', size: '44mm', stock: 2, sku: 'AMR-WTC-BLK-44', priceOffset: 30 }
    ]
  }
];

const getLocalStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState('guest'); 
  const [currentUser, setCurrentUser] = useState(null);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({ email: '', password: '' });
  const [adminLoginError, setAdminLoginError] = useState('');

  const [products, setProducts] = useState(() => getLocalStorage('amr_products', INITIAL_PRODUCTS));
  const [orders, setOrders] = useState(() => getLocalStorage('amr_orders', []));
  const [users, setUsers] = useState(() => getLocalStorage('amr_users', [
    { id: 'usr-1', name: 'أحمد المنصور', phone: '+963955123456', role: 'customer', isBlocked: false }
  ]));
  
  const [cart, setCart] = useState(() => getLocalStorage('amr_cart', []));
  const [wishlist, setWishlist] = useState(() => getLocalStorage('amr_wishlist', []));

  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponDetails, setAppliedCouponDetails] = useState(null);

  const [storeSettings, setStoreSettings] = useState(() => getLocalStorage('amr_settings', {
    adminWhatsApp: '+963964819337',
    shippingFee: 25,
    enableCOD: true,
    enableCard: true
  }));

  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [modalSelectedColor, setModalSelectedColor] = useState('');
  const [modalSelectedSize, setModalSelectedSize] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => { window.localStorage.setItem('amr_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { window.localStorage.setItem('amr_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { window.localStorage.setItem('amr_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem('amr_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        setNotifications(prevNotif => [{ id: Date.now(), text: `تمت الإضافة للمفضلة: ${product.title}`, type: 'success' }, ...prevNotif]);
        return [...prev, product];
      }
    });
  };

  const handleApplyAdvancedCoupon = (e) => {
    e.preventDefault();
    const validCoupons = [
      { code: 'AMR2026', type: 'percent', value: 15, minSpend: 100 },
      { code: 'VIP50', type: 'fixed', value: 50, minSpend: 300 }
    ];

    const found = validCoupons.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (!found) {
      alert('كود الخصم غير صالح أو منتهي الصلاحية.');
      return;
    }
    if (cartSubtotal < found.minSpend) {
      alert(`عذراً، يتطلب هذا الكود حداً أدنى للشراء بقيمة ${found.minSpend} ل.س`);
      return;
    }

    setAppliedCouponDetails(found);
    setNotifications(prev => [{ id: Date.now(), text: `تم تطبيق الكود "${found.code}" بنجاح!`, type: 'success' }, ...prev]);
  };

  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const discountAmount = useMemo(() => {
    if (!appliedCouponDetails) return 0;
    if (appliedCouponDetails.type === 'percent') {
      return (cartSubtotal * appliedCouponDetails.value) / 100;
    } else {
      return Math.min(cartSubtotal, appliedCouponDetails.value);
    }
  }, [cartSubtotal, appliedCouponDetails]);

  const finalTotal = useMemo(() => Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? storeSettings.shippingFee : 0)), [cartSubtotal, discountAmount, storeSettings.shippingFee, cart.length]);

  return (
    <div dir="rtl" className={`min-h-screen font-sans ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      
      {notifications.length > 0 && (
        <div className="bg-blue-600 text-white text-xs py-2 px-4 text-center">
          <span>{notifications[0].text}</span>
        </div>
      )}

      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
            <h1 className="font-extrabold text-lg">A.M.R STORE</h1>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 border rounded-xl">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setActiveTab('wishlist')} className="relative p-2 border rounded-xl">
              <Heart className="w-5 h-5 text-red-500" />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
            </button>
            <button onClick={() => setActiveTab('cart')} className="relative p-2 border rounded-xl">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
            </button>
            <button onClick={() => { setUserRole('admin'); setActiveTab('admin-dashboard'); }} className="px-3 py-1.5 bg-gray-800 text-white text-xs rounded-xl">
              لوحة المدير
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => {
                const isWished = wishlist.some(w => w.id === product.id);
                return (
                  <div key={product.id} className={`p-4 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      <button onClick={() => toggleWishlist(product)} className="absolute top-3 left-3 p-2 bg-white/80 rounded-full shadow">
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <h3 className="font-bold text-sm mb-1">{product.title}</h3>
                    <p className="text-blue-600 font-extrabold text-base">{product.price} ل.س</p>
                    <button onClick={() => { setSelectedProductModal(product); }} className="w-full mt-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">
                      اختر المقاس والشراء
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'admin-dashboard' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">لوحة تحكم المدير وإحصائيات الأداء</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold text-sm mb-4 text-blue-500">أكثر المنتجات مبيعاً</h4>
                <div className="space-y-3">
                  {products.sort((a, b) => b.salesCount - a.salesCount).map(prod => (
                    <div key={prod.id} className="flex items-center justify-between text-xs border-b pb-2 dark:border-gray-700">
                      <span className="font-bold">{prod.title}</span>
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-600 font-bold rounded-full">{prod.salesCount} مبيعة</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold text-sm mb-4 text-red-500">تنبيهات المخزون الحرج (Low Stock)</h4>
                <div className="space-y-2">
                  {products.flatMap(p => (p.variants || []).filter(v => v.stock <= 5).map(v => ({ ...v, title: p.title }))).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-red-50 text-red-600">
                      <span>{item.title} ({item.color} / {item.size})</span>
                      <span className="font-bold">متبقي: {item.stock} فقط</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
