import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Search, Shield, User, ShoppingCart,
  Package, TrendingUp, Users, Settings, Plus, Edit, Trash2,
  CheckCircle, Clock, Truck, AlertCircle, X, ChevronRight,
  Phone, MapPin, CreditCard, DollarSign, MessageCircle,
  Eye, ToggleLeft, ToggleRight, Check, RefreshCw, BarChart2,
  Database, Code, Menu, Bell, Percent, Sliders, ExternalLink, Moon, Sun, Lock, Layers,
  Map, Navigation, CheckCircle2, CircleDashed, Wallet, ShieldCheck, Copy, Grid, Layers3, Tag, Heart, Filter, ArrowRight
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    rating: 4.8,
    salesCount: 142,
    variants: [
      { id: 'v1-1', color: 'أسود', size: 'قياسي', stock: 12, sku: 'AMR-EAR-BLK-STD', priceOffset: 0 },
      { id: 'v1-2', color: 'أبيض', size: 'قياسي', stock: 3, sku: 'AMR-EAR-WHT-STD', priceOffset: 0 }
    ]
  },
  {
    id: 'prod-2',
    title: 'ساعة ذكية مقاومة للماء مع تتبع لياقة',
    description: 'ساعة متطورة لمتابعة الأنشطة الرياضية، نبضات القلب، ومستويات الأكسجين في الدم مع شاشة AMOLED.',
    price: 599,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    rating: 4.6,
    salesCount: 89,
    variants: [
      { id: 'v2-1', color: 'أسود', size: '40mm', stock: 4, sku: 'AMR-WTC-BLK-40', priceOffset: 0 },
      { id: 'v2-2', color: 'فضي', size: '44mm', stock: 2, sku: 'AMR-WTC-SLV-44', priceOffset: 30 }
    ]
  },
  {
    id: 'prod-3',
    title: 'حقيبة ظهر جلدیة أنيقة للأعمال',
    description: 'حقيبة ظهر مصنوعة من الجلد الطبيعي الفاخر تتسع لحاسوب محمول 15 بوصة مع جيوب متعددة للتنظيم.',
    price: 280,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    rating: 4.9,
    salesCount: 64,
    variants: [
      { id: 'v3-1', color: 'بني', size: 'كبير', stock: 15, sku: 'AMR-BAG-BRN-LG', priceOffset: 0 },
      { id: 'v3-2', color: 'أسود', size: 'كبير', stock: 8, sku: 'AMR-BAG-BLK-LG', priceOffset: 0 }
    ]
  },
  {
    id: 'prod-4',
    title: 'مصباح طاولة ذكي بتصميم عصري',
    description: 'مصباح إضاءة دافئة وقابلة للتعديل مع شاحن لاسلكي مدمج في القاعدة للهواتف الذكية.',
    price: 195,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    rating: 4.5,
    salesCount: 31,
    variants: [
      { id: 'v4-1', color: 'أبيض', size: 'قياسي', stock: 9, sku: 'AMR-LMP-WHT', priceOffset: 0 }
    ]
  },
  {
    id: 'prod-5',
    title: 'مجموع العناية الكاملة بالبشرة',
    description: 'مجموعة طبيعية تحتوي على سيروم فيتامين C، كريم مرطب، ومنظف لطيف لجميع أنواع البشرة.',
    price: 210,
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    rating: 4.7,
    salesCount: 110,
    variants: [
      { id: 'v5-1', color: 'شفاف', size: 'مجموعة 100ml', stock: 20, sku: 'AMR-BTY-SET', priceOffset: 0 }
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
  const [darkMode, setDarkMode] = useState(() => getLocalStorage('amr_dark_mode', false));
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState(() => getLocalStorage('amr_products', INITIAL_PRODUCTS));
  const [orders, setOrders] = useState(() => getLocalStorage('amr_orders', [
    {
      id: 'ORD-9021',
      date: '2026-03-28',
      customerName: 'أحمد المنصور',
      customerPhone: '+963955123456',
      address: 'دمشق، المزة، شارع الفيلات',
      items: [
        { id: 'prod-1', title: 'سماعات أذن لاسلكية عزل ضوضاء فائق', price: 349, quantity: 1, color: 'أسود', size: 'قياسي' }
      ],
      subtotal: 349,
      discount: 0,
      shippingFee: 25,
      total: 374,
      status: 'pending',
      paymentMethod: 'COD'
    }
  ]));
  const [cart, setCart] = useState(() => getLocalStorage('amr_cart', []));
  const [wishlist, setWishlist] = useState(() => getLocalStorage('amr_wishlist', []));
  const [storeSettings, setStoreSettings] = useState(() => getLocalStorage('amr_settings', {
    adminWhatsApp: '+963964819337',
    shippingFee: 25,
    enableCOD: true,
    enableCard: true,
    currency: 'ل.س'
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponDetails, setAppliedCouponDetails] = useState(null);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [modalSelectedColor, setModalSelectedColor] = useState('');
  const [modalSelectedSize, setModalSelectedSize] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    city: 'دمشق',
    address: '',
    notes: '',
    paymentMethod: 'COD'
  });
  const [productFormModal, setProductFormModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'electronics',
    image: '',
    color: 'أسود',
    size: 'قياسي',
    stock: 10
  });

  useEffect(() => { window.localStorage.setItem('amr_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { window.localStorage.setItem('amr_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { window.localStorage.setItem('amr_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem('amr_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { window.localStorage.setItem('amr_settings', JSON.stringify(storeSettings)); }, [storeSettings]);
  useEffect(() => { window.localStorage.setItem('amr_dark_mode', JSON.stringify(darkMode)); }, [darkMode]);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`تمت إزالة ${product.title} من المفضلة`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`تمت إضافة ${product.title} إلى المفضلة!`, 'success');
        return [...prev, product];
      }
    });
  };

  const addToCart = (product, color, size) => {
    const selectedColor = color || (product.variants && product.variants[0]?.color) || 'قياسي';
    const selectedSize = size || (product.variants && product.variants[0]?.size) || 'قياسي';

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.color === selectedColor && item.size === selectedSize);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          color: selectedColor,
          size: selectedSize,
          quantity: 1
        }];
      }
    });

    showToast(`تمت إضافة ${product.title} إلى السلة بنجاح!`);
    setSelectedProductModal(null);
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const validCoupons = [
      { code: 'AMR2026', type: 'percent', value: 15, minSpend: 100 },
      { code: 'VIP50', type: 'fixed', value: 50, minSpend: 200 }
    ];

    const found = validCoupons.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (!found) {
      showToast('كود الخصم غير صالح أو منتهي الصلاحية', 'error');
      return;
    }
    if (cartSubtotal < found.minSpend) {
      showToast(`يتطلب هذا الكود حد أدنى للشراء بقيمة ${found.minSpend} ${storeSettings.currency}`, 'error');
      return;
    }

    setAppliedCouponDetails(found);
    showToast(`تم تطبيق الخصم "${found.code}" بنجاح!`);
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

  const shippingCost = cart.length > 0 ? Number(storeSettings.shippingFee) : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customerName: checkoutForm.name,
      customerPhone: checkoutForm.phone,
      city: checkoutForm.city,
      address: checkoutForm.address,
      notes: checkoutForm.notes,
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee: shippingCost,
      total: finalTotal,
      status: 'pending',
      paymentMethod: checkoutForm.paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);

    let message = `🛒 *طلب جديد من متجر A.M.R STORE* \n\n`;
    message += `📋 *رقم الطلب:* ${orderId}\n`;
    message += `👤 *الاسم:* ${checkoutForm.name}\n`;
    message += `📞 *الهاتف:* ${checkoutForm.phone}\n`;
    message += `📍 *العنوان:* ${checkoutForm.city} - ${checkoutForm.address}\n\n`;
    message += `📦 *المنتجات:* \n`;
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.title} (${item.color}/${item.size}) × ${item.quantity} = ${item.price * item.quantity} ${storeSettings.currency}\n`;
    });
    message += `\n💰 *المجموع الفرعي:* ${cartSubtotal} ${storeSettings.currency}`;
    if (discountAmount > 0) message += `\n🎁 *الخصم:* -${discountAmount} ${storeSettings.currency}`;
    message += `\n🚚 *رسوم الشحن:* ${shippingCost} ${storeSettings.currency}`;
    message += `\n💵 *الإجمالي الكلي:* ${finalTotal} ${storeSettings.currency}\n`;
    message += `💳 *طريقة الدفع:* ${checkoutForm.paymentMethod === 'COD' ? 'الدفع عند الاستلام' : 'بطاقة إلكترونية'}\n`;
    if (checkoutForm.notes) message += `📝 *ملاحظات:* ${checkoutForm.notes}\n`;

    const encodedMsg = encodeURIComponent(message);
    const cleanPhone = storeSettings.adminWhatsApp.replace(/[^0-9+]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    setCart([]);
    setAppliedCouponDetails(null);
    showToast('تم إرسال وتأكيد الطلب بنجاح!');
    setActiveTab('home');

    window.open(whatsappUrl, '_blank');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productFormData.title || !productFormData.price) {
      showToast('يرجى إدخال اسم المنتج والسعر', 'error');
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        title: productFormData.title,
        description: productFormData.description,
        price: Number(productFormData.price),
        category: productFormData.category,
        image: productFormData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
        variants: [
          { id: 'v-' + Date.now(), color: productFormData.color, size: productFormData.size, stock: Number(productFormData.stock), priceOffset: 0 }
        ]
      } : p));
      showToast('تم تحديث بيانات المنتج بنجاح');
    } else {
      const newProd = {
        id: 'prod-' + Date.now(),
        title: productFormData.title,
        description: productFormData.description,
        price: Number(productFormData.price),
        category: productFormData.category,
        image: productFormData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
        rating: 5.0,
        salesCount: 0,
        variants: [
          { id: 'v-' + Date.now(), color: productFormData.color, size: productFormData.size, stock: Number(productFormData.stock), priceOffset: 0 }
        ]
      };
      setProducts(prev => [newProd, ...prev]);
      showToast('تمت إضافة المنتج الجديد بنجاح');
    }

    setProductFormModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('تم حذف المنتج', 'info');
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`تم تحديث حالة الطلب ${orderId}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const adminStats = useMemo(() => {
    const totalSales = orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0);
    const lowStockCount = products.filter(p => (p.variants || []).some(v => v.stock <= 5)).length;
    return {
      totalSales,
      ordersCount: orders.length,
      productsCount: products.length,
      lowStockCount
    };
  }, [orders, products]);

  return (
    <div dir="rtl" className={`min-h-screen font-sans transition-colors duration-200 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl border text-sm font-bold ${
            toastMessage.type === 'error' ? 'bg-red-500 text-white border-red-600' :
            toastMessage.type === 'info' ? 'bg-blue-500 text-white border-blue-600' :
            'bg-emerald-600 text-white border-emerald-700'
          }`}>
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/30">
              A
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                A.M.R STORE
              </h1>
              <p className="text-[10px] text-gray-400 font-medium">تسوق عصري وسريع</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-amber-400 hover:bg-gray-700' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'}`}
              title="تبديل المظهر"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`relative p-2.5 rounded-xl border transition-all ${activeTab === 'wishlist' ? 'bg-blue-50 border-blue-200 text-blue-600' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className={`relative p-2.5 rounded-xl border transition-all ${activeTab === 'cart' ? 'bg-blue-50 border-blue-200 text-blue-600' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab(activeTab.startsWith('admin') ? 'home' : 'admin-dashboard')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab.startsWith('admin')
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : darkMode ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700' : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">{activeTab.startsWith('admin') ? 'واجهة المتجر' : 'لوحة التحكم'}</span>
            </button>
          </div>
        </div>

        {activeTab.startsWith('admin') && (
          <div className={`border-t px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs font-semibold ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'admin-dashboard' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
              الإحصائيات العامة
            </button>
            <button
              onClick={() => setActiveTab('admin-products')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'admin-products' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
              إدارة المنتجات ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('admin-orders')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'admin-orders' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
              إدارة الطلبات ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('admin-settings')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'admin-settings' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
              إعدادات المتجر
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white p-8 sm:p-12 shadow-2xl">
              <div className="relative z-10 max-w-xl space-y-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
                  عروض موسمية خاصة ✨
                </span>
                <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                  أحدث التقنيات والمنتجات بين يديك
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  اكتشف تشكيلة مميزة من المنتجات العصرية بأفضل الأسعار مع توصيل سريع والدفع عند الاستلام.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-2 bg-white text-blue-700 rounded-xl font-bold text-xs shadow-md">
                    استخدم كود AMR2026 للحصول على خصم 15%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pr-10 pl-4 py-2.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-800'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {INITIAL_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : darkMode ? 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Package className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-500 text-sm">لم نجد أي منتجات تطابق بحثك أو تصنيفك المحدد.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => {
                  const isWished = wishlist.some(w => w.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`group rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                        darkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-3 left-3 p-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow hover:scale-110 transition-transform"
                        >
                          <Heart className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
                        </button>
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] rounded-lg font-bold">
                          ★ {product.rating}
                        </span>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-sm line-clamp-1">{product.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-xs text-gray-400 block">السعر</span>
                            <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                              {product.price} {storeSettings.currency}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedProductModal(product);
                              setModalSelectedColor(product.variants?.[0]?.color || '');
                              setModalSelectedSize(product.variants?.[0]?.size || '');
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
                          >
                            عرض والتحديد
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" /> المفضلة ({wishlist.length})
              </h2>
              <button onClick={() => setActiveTab('home')} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                متابعة التسوق <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-500 text-sm">قائمة المفضلة لديك فارغة حالياً.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map(product => (
                  <div key={product.id} className={`p-4 rounded-2xl border flex gap-4 items-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <img src={product.image} alt={product.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-sm line-clamp-1">{product.title}</h4>
                      <p className="text-blue-600 font-black text-sm">{product.price} {storeSettings.currency}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg"
                      >
                        إضافة للسلة
                      </button>
                    </div>
                    <button onClick={() => toggleWishlist(product)} className="p-2 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" /> سلة المشتريات ({cart.length})
              </h2>
              <button onClick={() => setActiveTab('home')} className="text-xs text-blue-600 font-bold hover:underline">
                إضافة المزيد من المنتجات
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-500 text-sm">سلة المشتريات فارغة.</p>
                <button onClick={() => setActiveTab('home')} className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl">
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border flex gap-4 items-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                      <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <div className="flex gap-2 text-[10px] text-gray-500">
                          <span>اللون: {item.color}</span>
                          <span>•</span>
                          <span>المقاس: {item.size}</span>
                        </div>
                        <p className="text-blue-600 font-bold text-sm">{item.price} {storeSettings.currency}</p>
                      </div>

                      <div className="flex items-center border rounded-xl dark:border-gray-700">
                        <button onClick={() => updateCartQuantity(idx, -1)} className="px-2.5 py-1 text-sm font-bold text-gray-500 hover:text-gray-800">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(idx, 1)} className="px-2.5 py-1 text-sm font-bold text-gray-500 hover:text-gray-800">+</button>
                      </div>

                      <button onClick={() => removeFromCart(idx)} className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-bold text-base border-b pb-3 dark:border-gray-800">ملخص الطلب</h3>

                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="كود الخصم (مثال: AMR2026)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className={`flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                      />
                      <button type="submit" className="px-3 py-2 bg-gray-800 text-white rounded-xl text-xs font-bold">
                        تطبيق
                      </button>
                    </form>

                    {appliedCouponDetails && (
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold flex justify-between items-center">
                        <span>مطبق: {appliedCouponDetails.code}</span>
                        <button onClick={() => setAppliedCouponDetails(null)} className="text-red-500"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    )}

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>المجموع الفرعي</span>
                        <span>{cartSubtotal} {storeSettings.currency}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>الخصم</span>
                          <span>-{discountAmount} {storeSettings.currency}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-500">
                        <span>رسوم الشحن</span>
                        <span>{shippingCost} {storeSettings.currency}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between text-base font-black text-blue-600 dark:text-blue-400">
                        <span>الإجمالي الكلي</span>
                        <span>{finalTotal} {storeSettings.currency}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('checkout')}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-blue-500/30"
                    >
                      متابعة إتمام الطلب
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'checkout' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl font-bold border-b pb-4 dark:border-gray-800">إتمام الشراء والدفع</h2>

            <form onSubmit={handleCompleteOrder} className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  placeholder="أدخل اسمك الثلاثي"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">رقم الهاتف *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+963..."
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">المدينة *</label>
                  <select
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <option value="دمشق">دمشق</option>
                    <option value="ريف دمشق">ريف دمشق</option>
                    <option value="حلب">حلب</option>
                    <option value="حمص">حمص</option>
                    <option value="اللاذقية">اللاذقية</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">العنوان التفصيلي *</label>
                <input
                  type="text"
                  required
                  placeholder="المنطقة، الشارع، البناء، الطابق"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">طريقة الدفع</label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {storeSettings.enableCOD && (
                    <button
                      type="button"
                      onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: 'COD'})}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        checkoutForm.paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Truck className="w-4 h-4" /> الدفع عند الاستلام
                    </button>
                  )}
                  {storeSettings.enableCard && (
                    <button
                      type="button"
                      onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: 'CARD'})}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        checkoutForm.paymentMethod === 'CARD' ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> بطاقة إلكترونية
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-gray-500 block">المبلغ المطلوب سداده</span>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400">{finalTotal} {storeSettings.currency}</span>
                </div>
                <MessageCircle className="w-6 h-6 text-emerald-500" />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> إرسال الطلب عبر WhatsApp الآن
              </button>
            </form>
          </div>
        )}

        {activeTab === 'admin-dashboard' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold">لوحة التحكم والإحصائيات الحية</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-6 rounded-3xl border space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-xs font-bold">إجمالي المبيعات</span>
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-2xl font-black">{adminStats.totalSales} {storeSettings.currency}</p>
              </div>

              <div className={`p-6 rounded-3xl border space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-xs font-bold">عدد الطلبات</span>
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-black">{adminStats.ordersCount}</p>
              </div>

              <div className={`p-6 rounded-3xl border space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-xs font-bold">المنتجات النشطة</span>
                  <Layers className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-black">{adminStats.productsCount}</p>
              </div>

              <div className={`p-6 rounded-3xl border space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-xs font-bold">مخزون حرج (&lt;5)</span>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-2xl font-black text-red-500">{adminStats.lowStockCount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold text-sm text-blue-500">أكثر المنتجات مبيعاً</h4>
                <div className="space-y-3">
                  {products.slice(0, 5).sort((a, b) => b.salesCount - a.salesCount).map(prod => (
                    <div key={prod.id} className="flex items-center justify-between text-xs border-b pb-2 dark:border-gray-800">
                      <span className="font-bold">{prod.title}</span>
                      <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold rounded-full">
                        {prod.salesCount} مبيعة
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold text-sm text-red-500">تنبيهات انخفاض المخزون الحرج</h4>
                <div className="space-y-2">
                  {products.flatMap(p => (p.variants || []).filter(v => v.stock <= 5).map(v => ({ ...v, title: p.title }))).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 font-bold">
                      <span>{item.title} ({item.color} / {item.size})</span>
                      <span>متبقي: {item.stock} فقط</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin-products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
              <h2 className="text-xl font-bold">إدارة المنتجات والمخزون</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductFormData({ title: '', description: '', price: '', category: 'electronics', image: '', color: 'أسود', size: 'قياسي', stock: 10 });
                  setProductFormModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> إضافة منتج جديد
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full text-right text-xs rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <thead className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <tr>
                    <th className="p-4">المنتج</th>
                    <th className="p-4">التصنيف</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4">المخزون المتاح</th>
                    <th className="p-4">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  {products.map(product => {
                    const totalStock = (product.variants || []).reduce((a, b) => a + b.stock, 0);
                    return (
                      <tr key={product.id}>
                        <td className="p-4 flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold">{product.title}</span>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4 font-bold text-blue-600">{product.price} {storeSettings.currency}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full font-bold text-[10px] ${
                            totalStock <= 5 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {totalStock} قطع
                          </span>
                        </td>
                        <td className="p-4 space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setProductFormData({
                                title: product.title,
                                description: product.description,
                                price: product.price,
                                category: product.category,
                                image: product.image,
                                color: product.variants?.[0]?.color || 'أسود',
                                size: product.variants?.[0]?.size || 'قياسي',
                                stock: product.variants?.[0]?.stock || 10
                              });
                              setProductFormModal(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'admin-orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-4 dark:border-gray-800">سجل إداره الطلبات</h2>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className={`p-5 rounded-3xl border space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 dark:border-gray-800">
                    <div>
                      <span className="font-black text-blue-600 text-sm">{order.id}</span>
                      <span className="text-xs text-gray-400 mr-3">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="p-1.5 rounded-xl text-xs font-bold border bg-transparent"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="shipping">جاري الشحن</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold">{order.customerName}</p>
                      <p className="text-gray-500">{order.customerPhone}</p>
                      <p className="text-gray-500">{order.city} - {order.address}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold">المنتجات:</p>
                      {order.items.map((it, i) => (
                        <p key={i} className="text-gray-500">• {it.title} × {it.quantity}</p>
                      ))}
                      <p className="font-black text-blue-600 pt-1">الإجمالي: {order.total} {storeSettings.currency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin-settings' && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-xl font-bold border-b pb-4 dark:border-gray-800">إعدادات المتجر العامة</h2>

            <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">رقم WhatsApp المستلم للطلبات</label>
                <input
                  type="text"
                  value={storeSettings.adminWhatsApp}
                  onChange={(e) => setStoreSettings({...storeSettings, adminWhatsApp: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-xs ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">رسوم الشحن الافتراضية</label>
                <input
                  type="number"
                  value={storeSettings.shippingFee}
                  onChange={(e) => setStoreSettings({...storeSettings, shippingFee: Number(e.target.value)})}
                  className={`w-full p-3 rounded-xl border text-xs ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storeSettings.enableCOD}
                    onChange={(e) => setStoreSettings({...storeSettings, enableCOD: e.target.checked})}
                  />
                  تفعيل الدفع عند الاستلام (COD)
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storeSettings.enableCard}
                    onChange={(e) => setStoreSettings({...storeSettings, enableCard: e.target.checked})}
                  />
                  تفعيل الدفع بالبطاقة الإلكترونية
                </label>
              </div>

              <button
                onClick={() => showToast('تم حفظ الإعدادات بنجاح!')}
                className="w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 ${
            darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className="flex justify-between items-start">
              <h3 className="font-extrabold text-base">{selectedProductModal.title}</h3>
              <button onClick={() => setSelectedProductModal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <img src={selectedProductModal.image} alt="" className="w-full h-48 rounded-2xl object-cover" />

            <p className="text-xs text-gray-500 leading-relaxed">{selectedProductModal.description}</p>

            <div className="space-y-3 pt-2">
              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1.5">اختر اللون:</span>
                <div className="flex gap-2">
                  {(selectedProductModal.variants || [{ color: 'أسود' }]).map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setModalSelectedColor(v.color)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        modalSelectedColor === v.color ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 block mb-1.5">اختر المقاس / الحجم:</span>
                <div className="flex gap-2">
                  {(selectedProductModal.variants || [{ size: 'قياسي' }]).map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setModalSelectedSize(v.size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        modalSelectedSize === v.size ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4 dark:border-gray-800">
              <span className="text-xl font-black text-blue-600">{selectedProductModal.price} {storeSettings.currency}</span>
              <button
                onClick={() => addToCart(selectedProductModal, modalSelectedColor, modalSelectedSize)}
                className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/30"
              >
                إضافة إلى السلة
              </button>
            </div>
          </div>
        </div>
      )}

      {productFormModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">{editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}</h3>
              <button onClick={() => setProductFormModal(false)} className="text-gray-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">اسم المنتج *</label>
                <input
                  type="text"
                  required
                  value={productFormData.title}
                  onChange={(e) => setProductFormData({...productFormData, title: e.target.value})}
                  className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">وصف المنتج</label>
                <textarea
                  rows={3}
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({...productFormData, description: e.target.value})}
                  className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">السعر ({storeSettings.currency}) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                    className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">التصنيف</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                    className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <option value="electronics">إلكترونيات</option>
                    <option value="fashion">أزياء وملابس</option>
                    <option value="home">المنزل والديكور</option>
                    <option value="beauty">عناية وجمال</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">رابط صورة المنتج (URL)</label>
                <input
                  type="text"
                  value={productFormData.image}
                  onChange={(e) => setProductFormData({...productFormData, image: e.target.value})}
                  className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold mb-1">اللون</label>
                  <input
                    type="text"
                    value={productFormData.color}
                    onChange={(e) => setProductFormData({...productFormData, color: e.target.value})}
                    className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">المقاس</label>
                  <input
                    type="text"
                    value={productFormData.size}
                    onChange={(e) => setProductFormData({...productFormData, size: e.target.value})}
                    className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">المخزون</label>
                  <input
                    type="number"
                    value={productFormData.stock}
                    onChange={(e) => setProductFormData({...productFormData, stock: e.target.value})}
                    className={`w-full p-2.5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs mt-4"
              >
                حفظ بيانات المنتج
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className={`border-t py-8 mt-16 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-500'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-2">
          <p className="font-bold text-gray-700 dark:text-gray-200">A.M.R STORE © 2026 - جميع الحقوق محفوظة</p>
          <p>متجر إلكتروني متكامل للبيع والشحن السريع | التواصل عبر الواتساب: {storeSettings.adminWhatsApp}</p>
        </div>
      </footer>
    </div>
  );
}
