# 🎓 Kampüs Etkinlikleri — Sprint 6 & Vize Projesi

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-success)

React, TypeScript ve Vite ile modern bir tek sayfa uygulaması (SPA) olarak geliştirilmiş **Kampüs Etkinlikleri Yönetim Sistemi**. Uygulama; etkinlik listeleme, Türkçe karakter destekli arama, kategoriye göre filtreleme, detay görüntüleme, tam yönetim paneli (ekleme, güncelleme, silme) ile giriş, kayıt ve şifre yenileme demo akışlarını içerir.

---

## 📌 Proje ve Teslim Bilgileri

| Alan | Bilgi |
| :--- | :--- |
| **Öğrenci Adı Soyadı** | **Erol Arda Akın** |
| **Öğrenci Numarası** | **2311012038** |
| **Canlı Vercel Adresi** | [https://erolardaakin-frontend.vercel.app/](https://erolardaakin-frontend.vercel.app/) |
| **GitHub Deposu** | [https://github.com/ardalakin/sprint2](https://github.com/ardalakin/sprint2) |
| **Git Tag** | `frontend` |

---

## 🚀 Öne Çıkan Özellikler

- **🌐 Tam React Router Entegrasyonu:** `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink` ve `useNavigate` ile 10 farklı rota arasında kesintisiz geçiş.
- **⚡ Merkezi Durum Yönetimi (Context API):** `EventsContext` üzerinden tüm etkinlikler merkezi olarak yönetilir; yeni etkinlik ekleme, güncelleme veya silme işlemleri anında tüm sayfalara (Ana Sayfa, Liste, Detay, Yönetim) yansır.
- **🛡️ Kusursuz Form Doğrulaması:** 
  - **Etkinlik Formu:** 7 ayrı alanda kural doğrulaması (başlık uzunluğu, kategori seçimi, tarih/saat, yer, 1-1000 arası kontenjan, açıklama), anlık kırmızı hata bildirimleri ve `aria-invalid` erişilebilirlik desteği.
  - **Kimlik Doğrulama:** Giriş, kayıt ve şifre yenileme ekranlarında e-posta formatı, en az 6 haneli şifre ve şifre eşleşme kontrolleri.
- **🔍 Gelişmiş Arama & Filtreleme:** Başlık ve açıklamada Türkçe karakter duyarlı (`toLocaleLowerCase("tr-TR")`) gerçek zamanlı arama ve dinamik kategori filtresi.
- **📱 %100 Duyarlı (Responsive) Tasarım:** Masaüstünde tam tablo olan yönetim ekranı, mobil cihazlarda (320px–700px) otomatik olarak modern kart görünümüne dönüşür.

---

## 🗺️ Sayfalar ve Rota Haritası

| Rota | Sayfa Bileşeni | Açıklama |
| :--- | :--- | :--- |
| `/` | `HomePage` | Karşılama, yaklaşan 2 etkinlik ve hızlı bağlantılar |
| `/events` | `EventsPage` | Arama çubuğu, kategori filtresi, sonuç sayacı ve etkinlik listesi |
| `/events/:id` | `EventDetailPage` | Etkinlik detayları, poster afişi, künye ve listeye dönüş linkleri |
| `/admin` | `AdminPage` | Etkinlik yönetim tablosu, silme onayı (`window.confirm`), düzenle ve ekle butonları |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinlik bilgilerini düzenleme formu |
| `/login` | `LoginPage` | E-posta ve şifre doğrulama demosu |
| `/register` | `RegisterPage` | Ad soyad, e-posta, şifre ve şifre tekrar kontrolü içeren kayıt demosu |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantısı gönderim demosu |
| `*` | `NotFoundPage` | Tanımsız adresler ve bulunamayan kayıtlar için 404 sayfası |

---

## 🛠️ Kurulum ve Yerel Çalıştırma

Proje `frontend` klasörü içerisindedir. Bağımlılıkları kurmak ve yerel geliştirme sunucusunu başlatmak için:

```bash
# Frontend dizinine geçin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### Üretim Derlemesi ve Kontrol

```bash
# TypeScript kontrolü ve üretim derlemesi
npm run build

# Kod kalitesi denetimi (Oxlint)
npm run lint
```

---

## 📁 Klasör ve Dosya Yapısı (Slayt 21 Şablonu)

```text
frontend/
├── src/
│   ├── components/
│   │   ├── events/       # EventCard, EventDetail, EventFilter, EventList
│   │   ├── forms/        # EventForm (Kontrollü form ve hata gösterimleri)
│   │   └── layout/       # Header, Navigation, Footer
│   ├── context/          # EventsContext.tsx (Merkezi veri ve ekle/güncelle/sil)
│   ├── data/             # events.ts (Başlangıç örnek verileri)
│   ├── pages/            # 10 adet sayfa bileşeni (HomePage, EventsPage, AdminPage vb.)
│   ├── types/            # campus-event.ts (Veri modelleri ve form tipleri)
│   ├── utils/            # filter-events.ts, format-date.ts, validate-event.ts
│   ├── App.css           # Tasarım sistemi, tema renkleri ve responsive tablo stilleri
│   ├── App.tsx           # Rota tanımları (Routes, Route) ve ana sayfa kabuğu
│   ├── index.css         # Temel CSS sıfırlamaları
│   └── main.tsx          # BrowserRouter ve EventsProvider başlangıcı
├── vercel.json           # Vercel SPA rewrite (doğrudan alt rotalara erişim)
├── package.json          # Proje bağımlılıkları ve komutlar
└── README.md
```

---

## ✅ Vize Teslim Checklist & Puanlama (45/45 Puan)

- [x] **1. Tüm linkler çalışıyor (1 Puan):** `NavLink` ve `Link` ile tüm menü ve sayfa içi geçişler hatasız çalışır.
- [x] **2. Tüm sayfalar hazır (2 Puan):** 10 sayfanın tümü eksiksiz tasarlanmış ve içerikleri doldurulmuştur.
- [x] **3. Klasör ve dosya yapısı (3 Puan):** Slayt 21'deki tam mimari korunmuştur.
- [x] **4. Tüm route'lar (10 adet) tanımlandı (6 Puan):** 10 rota `App.tsx` içinde yapılandırılmıştır.
- [x] **5. Context kullanımı (7 Puan):** `EventsContext` üzerinden tüm sayfalarda ortak durum yönetimi sağlanmıştır.
- [x] **6. Ekle, sil, güncelle ve onay (10 Puan):** İşlemler `window.confirm` ile onaylıdır; değişiklikler tüm sayfalarda anında görünür.
- [x] **7. Son çalışır proje GitHub'da (2 Puan):** `git tag frontend` ile GitHub'a push edilmiştir.
- [x] **8. Vercel'de yayında (2 Puan):** Vercel üzerinde canlıda ve SPA yönlendirmeleri aktiftir.
- [x] **9. README yazıldı, Vercel linki eklendi (2 Puan):** Tüm bilgiler eksiksiz dökümante edilmiştir.
- [x] **10. Mobil görünüm (2 Puan):** Masaüstünde tablo olan yönetim ekranı telefonda kart formatına geçer.
- [x] **11. CSS bozulması yok (2 Puan):** Tasarım sistemi ve responsive düzen kusursuzdur.
- [x] **12. Arama ve filtreleme (3 Puan):** Canlı arama ve kategori süzme mekanizması çalışır.
- [x] **13. Form doğrulama (3 Puan):** Etkinlik formu, giriş, kayıt ve şifremi unuttum ekranlarında eksiksiz doğrulama mevcuttur.
