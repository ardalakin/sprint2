# 🎓 Kampüs Etkinlikleri — Full-Stack (Sprint 7)

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-v2.1-FF6C37?logo=postman&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-success)

Bu depo, **Kampüs Etkinlikleri Yönetim Sistemi**'nin hem modern React (SPA) frontend arayüzünü hem de **Sprint 7** kapsamında geliştirilen **Node.js + Express tabanlı REST API backend** mimarisini bir arada barındıran tam yığın (full-stack) projesidir.

---

## 📌 Proje ve Teslim Bilgileri

| Alan | Bilgi |
| :--- | :--- |
| **Öğrenci Adı Soyadı** | **Erol Arda Akın** |
| **Öğrenci Numarası** | **2311012038** |
| **Sprint** | **Sprint 7 — Backend REST API & Mimari Kurulumu** |
| **Canlı Vercel Adresi** | [https://erolardaakin-frontend.vercel.app/](https://erolardaakin-frontend.vercel.app/) |
| **GitHub Deposu** | [https://github.com/ardalakin/sprint2](https://github.com/ardalakin/sprint2) |
| **Backend API URL** | `http://localhost:3000` |

---

## 🚀 Sprint 7: Backend REST API Özellikleri

- **⚡ Modern ES Modülleri (ESM):** `package.json` içerisinde `"type": "module"` kullanılarak modern `import / export` standardıyla geliştirilmiştir.
- **🧱 Katmanlı Mimari (Separation of Concerns):** Rotalar ([`src/routes/`](backend/src/routes/event-routes.js)), iş mantığı ([`src/controllers/`](backend/src/controllers/event-controller.js)) ve veri modeli ([`src/data/`](backend/src/data/events.js)) birbirinden tamamen ayrıştırılmıştır.
- **🛡️ Güvenlik ve Ortam Değişkenleri:** Port yapılandırması `dotenv` ile `.env` dosyasından okunur; `.env.example` hazır tutulurken `.gitignore` ile gizli değişkenlerin Git'e sızması önlenmiştir.
- **🌐 Evrensel Middleware Desteği:** 
  - `cors()`: Frontend ve harici istemcilerden gelen çapraz kaynak isteklerini güvenle karşılar.
  - `express.json()`: Gelen JSON istek gövdelerini (`req.body`) otomatik olarak ayrıştırır.
- **🩺 Sağlık Kontrolü (`/health`):** Sunucu çalışma durumunu, güncel ISO zaman bilgisini ve öğrenci numarasını döndürür.
- **💾 Bellek İçi (In-Memory) Veri Saklama:** 6 adet özgün etkinlik verisi bellek içi dizi üzerinde saklanır, filtrelenebilir, ID ile aranabilir ve yeni kayıt eklenebilir.
- **📑 Standart Hata Yanıt Formatı:** Beklenmeyen rotalarda `404` ("Route not found"), eksik parametrelerde `400` ("title, category and date are required") ve bulunamayan kayıtlarda `404` ("Event not found") tutarlı bir JSON şeması ile iletilir.
- **🧪 Kapsamlı Postman Test Koleksiyonu:** 6 temel test senaryosunu içeren Postman v2.1 koleksiyonu ([`backend/requests/kampus-api.json`](backend/requests/kampus-api.json)) mevcuttur.

---

## 📋 REST API Sözleşmesi Tablosu

| Metot | Uç Nokta (Endpoint) | Amaç | Başarılı Yanıt | Hata Yanıtı | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | API karşılama ve uç nokta rehberi | `200 OK` | — | Aktif |
| **GET** | `/health` | Sağlık kontrolü ve öğrenci numarası | `200 OK` | — | Sprint 7 |
| **GET** | `/events` | Etkinlik listesi (`?category=` ile süzme) | `200 OK` | — | Sprint 7 |
| **GET** | `/events/:id` | Tekil etkinlik detayı getirme | `200 OK` | `404 Not Found` | Sprint 7 |
| **POST** | `/events` | Yeni etkinlik oluşturma (`title`, `category`, `date`) | `201 Created` | `400 Bad Request` | Sprint 7 |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini kısmi güncelleme | `200 OK` | `400`, `404` | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinliği listeden silme | `204 No Content` | `404 Not Found` | Sprint 9 |

---

## ⚠️ Standart Hata Formatı

Tüm hata durumlarında API tutarlı olarak aşağıdaki JSON gövdesini döner:

```json
{
  "error": {
    "message": "Açıklayıcı hata mesajı"
  }
}
```

* **Olmayan Rota:** `404 Not Found` $\rightarrow$ `{"error": {"message": "Route not found"}}`
* **Bulunamayan Etkinlik:** `404 Not Found` $\rightarrow$ `{"error": {"message": "Event not found"}}`
* **Eksik Alan:** `400 Bad Request` $\rightarrow$ `{"error": {"message": "title, category and date are required"}}`

---

## 🛠️ Kurulum ve Yerel Çalıştırma

### 1. Backend REST API Başlatma

```bash
# Backend dizinine geçin
cd backend

# Bağımlılıkları yükleyin (express, cors, dotenv)
npm install

# .env dosyasını oluşturun (varsayılan PORT=3000)
cp .env.example .env

# Geliştirme modunda (watch mode) başlatın
npm run dev

# Veya standart modda başlatın
npm start
```
> Sunucu varsayılan olarak `http://localhost:3000` adresinde ayağa kalkar.

### 2. Frontend Uygulamasını Başlatma

```bash
# Frontend dizinine geçin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Vite geliştirme sunucusunu başlatın
npm run dev
```
> Frontend varsayılan olarak `http://localhost:5173` adresinde açılır.

---

## 🧪 Postman Test İstekleri (Collection)

API testleri için hazırlanmış koleksiyon dosyası: [`backend/requests/kampus-api.json`](backend/requests/kampus-api.json)

| No | İstek Adı | Metot | URL | Beklenen Durum |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Health Kontrolü | `GET` | `http://localhost:3000/health` | `200 OK` |
| **2** | Etkinlik Listesi | `GET` | `http://localhost:3000/events` | `200 OK` (6 kayıt) |
| **3** | Tek Etkinlik Getir | `GET` | `http://localhost:3000/events/event-2` | `200 OK` |
| **4** | Olmayan Etkinlik | `GET` | `http://localhost:3000/events/yok` | `404 Not Found` |
| **5** | Etkinlik Oluştur | `POST` | `http://localhost:3000/events` | `201 Created` |
| **6** | Eksik Veri Doğrulama | `POST` | `http://localhost:3000/events` | `400 Bad Request` |

---

## 📁 Proje Klasör Yapısı

```text
ders2/
├── backend/                      # Sprint 7: Express REST API
│   ├── requests/
│   │   └── kampus-api.json       # Postman koleksiyonu (6 senaryo)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── event-controller.js  # İş mantığı, doğrulama ve yanıtlar
│   │   ├── data/
│   │   │   └── events.js            # 6 adet özgün etkinlik verisi
│   │   ├── routes/
│   │   │   └── event-routes.js      # Endpoint yönlendirmeleri
│   │   ├── app.js                   # Express yapılandırması & middleware'ler
│   │   └── server.js                # Port dinleme ve dotenv yüklemesi
│   ├── .env                      # Ortam değişkenleri (Git'e kapalı)
│   ├── .env.example              # Örnek ortam değişkeni şablonu
│   ├── .gitignore                # node_modules ve .env koruması
│   ├── package.json              # Backend bağımlılıkları ve script'ler
│   └── README.md                 # Backend özel dokümantasyonu
├── frontend/                     # Sprint 6: React + TS + Vite SPA
│   ├── src/
│   │   ├── components/           # UI ve form bileşenleri
│   │   ├── context/              # EventsContext durum yönetimi
│   │   ├── pages/                # 10 sayfa bileşeni (Home, Events, Admin vb.)
│   │   └── types/                # campus-event TypeScript tipleri
│   ├── package.json
│   └── vite.config.ts
├── .gitignore                    # Kök seviye yok sayılanlar
└── README.md                     # Ana proje dokümantasyonu
```

---

## ✅ Sprint 7 Tamamlanma Checklist'i

- [x] **Adım 0-1:** Backend klasörü oluşturuldu, `package.json` (`type: module`), `.env` ve `.env.example` hazırlandı.
- [x] **Adım 2-3:** Express kuruldu, `cors` ve `express.json()` middleware'leri bağlandı.
- [x] **Adım 4:** `GET /health` endpoint'i yazıldı (`status: ok`, `time`, `student: 2311012038`).
- [x] **Adım 5:** Genel `404 Route not found` hata yakalayıcısı eklendi.
- [x] **Adım 6:** `src/data/events.js` içerisine 6 adet özgün etkinlik verisi eklendi.
- [x] **Adım 7:** Router ve Controller mimarisi ayrıştırıldı (`event-routes.js`, `event-controller.js`).
- [x] **Adım 8:** `GET /events` ve `GET /events/:id` rotaları (kategori filtresi ve 404 kontrolü ile) yazıldı.
- [x] **Adım 9:** `POST /events` rotası ve zorunlu alan doğrulama (`400 Bad Request`) tamamlandı.
- [x] **Adım 10:** Postman koleksiyonu (`kampus-api.json`) hazırlandı ve `backend/README.md` dokümante edildi.
- [x] **Ek İyileştirme:** `GET /` kök rotası eklenerek tarayıcıdan doğrudan erişimde açıklayıcı rehber sağlandı.
- [x] **Güvenlik:** `.env` ve `node_modules` dizinleri `.gitignore` ile güvenceye alındı, Git'e sızması engellendi.
