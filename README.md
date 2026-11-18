# 🎓 Kampüs Etkinlikleri — Full-Stack (Sprint 8: MongoDB & Mongoose)

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-v8%2Fv9-880000?logo=mongoose&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-v2.1-FF6C37?logo=postman&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-success)

Bu depo, **Kampüs Etkinlikleri Yönetim Sistemi**'nin modern React (SPA) frontend arayüzü ile birlikte **Sprint 8** kapsamında geliştirilen **Node.js + Express + MongoDB (Mongoose)** tabanlı bulut veritabanı entegrasyonuna sahip tam yığın (full-stack) projesidir.

---

## 📌 Proje ve Teslim Bilgileri

| Alan | Bilgi |
| :--- | :--- |
| **Öğrenci Adı Soyadı** | **Erol Arda Akın** |
| **Öğrenci Numarası** | **2311012038** |
| **Sprint** | **Sprint 8 — MongoDB & Mongoose Entegrasyonu** |
| **Canlı Vercel Adresi** | [https://erolardaakin-frontend.vercel.app/](https://erolardaakin-frontend.vercel.app/) |
| **GitHub Deposu** | [https://github.com/ardalakin/sprint2](https://github.com/ardalakin/sprint2) |
| **Backend API URL** | `http://localhost:3000` |

---

## 🚀 Sprint 8: Veritabanı ve Mongoose Özellikleri

- **🗄️ MongoDB Atlas Entegrasyonu:** Veriler RAM belleğinden bulut MongoDB veritabanına taşınmıştır. Sunucu kapansa veya yeniden başlasa dahi eklenen kayıtlar kalıcı (persistent) olarak saklanır.
- **🧱 Bağlantı Modülü (`src/config/database.js`):** `connectDatabase()` fonksiyonu sunucu ayağa kalkmadan önce veritabanı bağlantısını kurar. URI `process.env.MONGODB_URI` üzerinden okunur.
- **📜 Şema ve Model (`src/models/event-model.js`):**
  - `title`: `required`, `trim`, `minlength: 3`, `maxlength: 100`
  - `category`: `required`, `enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"]`
  - `capacity`: `min: 0`, `default: 0`
  - `date`: `required`
  - `timestamps: true`: `createdAt` ve `updatedAt` otomatik üretilir.
- **🌱 Örnek Veri Yükleme (Seed Script):** `npm run seed` komutu `deleteMany({})` ile veritabanını temizleyip 6 adet özgün etkinliği yükler; iki kez çalıştırılsa bile kopya üretmez.
- **🛡️ Sağlam Hata Yönetimi:**
  - `isValidObjectId`: Geçersiz ID isteklerinde (`/events/yok`) 500 fırlatmak yerine doğrudan **404 Not Found** döner.
  - Mongoose `ValidationError`: Eksik veya kural dışı verilerde **400 Bad Request** döner ve sunucu asla çökmez.
  - Genel hata yakalayıcı: Express `(err, req, res, next)` middleware'i ile beklenmeyen hatalar terminalde loglanır, istemciye `500 Server error` döner.
- **🔒 Güvenlik Standartları:** Gerçek bağlantı adresi ve şifre sadece `.env` dosyasında tutulur ve `.gitignore` ile korunur. `.env.example` içinde yer tutucu kullanılır.

---

## 📋 REST API Sözleşmesi Tablosu

| Metot | Uç Nokta (Endpoint) | Amaç | Başarılı Yanıt | Hata Yanıtı | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | API karşılama ve uç nokta rehberi | `200 OK` | — | Aktif |
| **GET** | `/health` | Sağlık kontrolü ve öğrenci numarası | `200 OK` | — | Tamamlandı |
| **GET** | `/events` | Etkinlik listesi (`?category=` ile filtreleme) | `200 OK` | `500` | Sprint 8 (MongoDB) |
| **GET** | `/events/:id` | Tekil etkinlik detayı getirme | `200 OK` | `404 Not Found` | Sprint 8 (MongoDB) |
| **POST** | `/events` | Yeni etkinlik oluşturma | `201 Created` | `400 Bad Request` | Sprint 8 (MongoDB) |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini güncelleme | `200 OK` | `400`, `404` | Aktif |
| **DELETE** | `/events/:id` | Etkinliği listeden silme | `204 No Content` | `404 Not Found` | Aktif |

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

* **Bulunamayan Etkinlik / Geçersiz ID:** `404 Not Found` $\rightarrow$ `{"error": {"message": "Event not found"}}`
* **Doğrulama Hatası:** `400 Bad Request` $\rightarrow$ `{"error": {"message": "Event validation failed: ..."}}`
* **Beklenmeyen Sunucu Hatası:** `500 Server error` $\rightarrow$ `{"error": {"message": "Server error"}}`

---

## 🛠️ Kurulum ve Yerel Çalıştırma

### 1. Backend REST API Başlatma

```bash
# Backend dizinine geçin
cd backend

# Bağımlılıkları yükleyin (express, cors, dotenv, mongoose)
npm install

# .env dosyasını oluşturun
cp .env.example .env

# Veritabanını 6 örnek etkinlikle doldurun
npm run seed

# Geliştirme modunda (watch mode) başlatın
npm run dev
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
| **1** | Health Kontrolü | `GET` | `http://localhost:3000/health` | `200 OK` (`student: 2311012038`) |
| **2** | Etkinlik Listesi | `GET` | `http://localhost:3000/events` | `200 OK` (MongoDB'den 6 kayıt) |
| **3** | Tek Etkinlik Getir | `GET` | `http://localhost:3000/events/<_id>` | `200 OK` (Gerçek MongoDB `_id`) |
| **4** | Olmayan Etkinlik | `GET` | `http://localhost:3000/events/yok` | `404 Not Found` (500 değil 404) |
| **5** | Etkinlik Oluştur | `POST` | `http://localhost:3000/events` | `201 Created` (`_id` üretilir) |
| **6** | Eksik Veri Doğrulama | `POST` | `http://localhost:3000/events` | `400 Bad Request` (Mongoose validation) |

---

## 📁 Proje Klasör Yapısı (Sprint 8 Şablonu)

```text
kampus-etkinlik/
├── backend/
│   ├── requests/
│   │   └── kampus-api.json          # 6 adet test isteği içeren Postman koleksiyonu
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Mongoose bağlantı modülü
│   │   ├── controllers/
│   │   │   └── event-controller.js  # Mongoose model işlemleri & hata kontrolleri
│   │   ├── data/
│   │   │   └── seed-events.js       # 6 adet id'siz başlangıç etkinliği
│   │   ├── models/
│   │   │   └── event-model.js       # Mongoose Schema & Event modeli
│   │   ├── routes/
│   │   │   └── event-routes.js      # REST API rotaları
│   │   ├── app.js                   # Express yapılandırması & hata middleware'i
│   │   ├── seed.js                  # deleteMany + insertMany seed scripti
│   │   └── server.js                # Önce connectDatabase, sonra app.listen
│   ├── .env                         # Yerel MongoDB URI (Git'e kapalı)
│   ├── .env.example                 # mongodb://127.0.0.1:27017/kampus yer tutucu
│   ├── .gitignore                   # node_modules ve .env koruması
│   ├── package.json                 # mongoose ve "seed" scripti
│   └── README.md                    # Backend özel dokümantasyonu
├── frontend/                        # React + TS + Vite SPA (değişmedi)
└── README.md                        # Ana proje dokümantasyonu
```

---

## ✅ Sprint 8 Puanlama & Kontrol Listesi (12 / 12 Puan)

- [x] **Ön Şart 1:** `GET /health` JSON yanıtında `student = 2311012038`.
- [x] **Ön Şart 2:** Git geçmişinde ve repoda asla gerçek Atlas adresi veya şifresi yok.
- [x] **Ön Şart 3:** `.env` ve `node_modules` dizinleri `.gitignore` ile korunuyor, repoya sızmıyor.
- [x] **1. Madde (2 Puan):** Temiz indirmede `npm install + npm run dev` hatasız çalışıyor.
- [x] **2. Madde (1 Puan):** Bağlantı `config/database.js`'te, URI `.env`'den okunuyor, `.env.example` içinde yer tutucu var.
- [x] **3. Madde (2 Puan):** Schema kuralları (`required`, `trim`, `timestamps`, `enum`, `minlength`) tanımlı.
- [x] **4. Madde (2 Puan):** `npm run seed` 6 kayıt ekliyor; art arda çalışsa da `deleteMany` sayesinde 6 kayıt kalıyor.
- [x] **5. Madde (2 Puan):** `GET /events` ve `GET /events/:id` MongoDB'den çekiyor; `/events/yok` 500 değil **404** dönüyor.
- [x] **6. Madde (2 Puan):** `POST /events` 201 dönüyor; eksik veride `ValidationError` yakalanıp **400** dönüyor, sunucu çökmüyor.
- [x] **7. Madde (1 Puan):** Kalıcılık testi: Sunucu yeniden başlayınca eklenen kayıt MongoDB'de kalıyor.
