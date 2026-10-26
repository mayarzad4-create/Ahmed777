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
