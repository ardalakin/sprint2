# Kampüs Etkinlik Backend REST API — Sprint 8 (MongoDB & Mongoose)

Bu proje, **Sprint 8** kapsamında geliştirilmiş Node.js + Express + MongoDB (Mongoose) tabanlı bir REST API uygulamasıdır. Kampüs etkinlik verilerini MongoDB Atlas bulut veritabanında kalıcı (persistent) olarak saklar ve JSON olarak sunar.

Öğrenci Numarası: **2311012038**

---

## Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
cd backend
npm install
```

### 2. Ortam Değişkeni (.env) Yapılandırması
`.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```
`.env` içeriği (örnek):
```env
PORT=3000
MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@cluster0.xxxxx.mongodb.net/kampus?retryWrites=true&w=majority&appName=Cluster0
```

> **Önemli Güvenlik Kuralı:** `.env` dosyası ve gerçek veritabanı şifresi asla Git reposuna eklenmez (`.gitignore` ile korunur).

### 3. Veritabanını Örnek Veriyle Doldurma (Seed)
Veritabanına başlangıçtaki 6 özgün etkinliği yüklemek için:
```bash
npm run seed
```
*(Her çalıştırmada önceki kayıtları temizleyip tam 6 kayıt ekler).*

### 4. Sunucuyu Başlatma
Geliştirme modunda (watch mode):
```bash
npm run dev
```

Doğrudan çalıştırmak için:
```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde ayağa kalkar.

---

## REST Sözleşmesi Tablosu

| Metot | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık kontrolü ve öğrenci no | `200 OK` | — | Tamamlandı |
| **GET** | `/events` | Etkinlik listesini getir (`?category=` isteğe bağlı filtre) | `200 OK` | `500 Server error` | Sprint 8 (MongoDB) |
| **GET** | `/events/:id` | Tek etkinlik getir (MongoDB `_id`) | `200 OK` | `404 Not Found` | Sprint 8 (MongoDB) |
| **POST** | `/events` | Yeni etkinlik oluştur (`title`, `category`, `date` zorunlu) | `201 Created` | `400 Bad Request` | Sprint 8 (MongoDB) |
| **PATCH** | `/events/:id` | Etkinlik güncelle | `200 OK` | `400`, `404` | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinlik sil | `204 No Content` | `404 Not Found` | Sprint 9 |

---

## Hata Yanıt Formatı

Tüm hata yanıtları standart olarak aşağıdaki JSON formatında döndürülür:

```json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
```

* **Bulunamayan etkinlik veya rota / Geçersiz ID:** `404 Not Found` $\rightarrow$ `{"error": {"message": "Event not found"}}`
* **Mongoose Schema Doğrulama Hatası:** `400 Bad Request` $\rightarrow$ `{"error": {"message": "Event validation failed: ..."}}`
* **Beklenmeyen Hata (Hata Middleware):** `500 Internal Server Error` $\rightarrow$ `{"error": {"message": "Server error"}}`

---

## Postman İstekleri (Collection)

Otomatik test ve doğrulama için kullanılan 6 istek ([`requests/kampus-api.json`](requests/kampus-api.json)):
1. `GET http://localhost:3000/health` (200 OK — `student: "2311012038"`)
2. `GET http://localhost:3000/events` (200 OK — MongoDB'den 6 kayıt, `_id`, `createdAt`, `updatedAt` ile)
3. `GET http://localhost:3000/events/<_id>` (200 OK — Listeden alınan gerçek MongoDB `_id`)
4. `GET http://localhost:3000/events/yok` (404 Not Found — `isValidObjectId` kontrolü ile 500 değil 404)
5. `POST http://localhost:3000/events` (201 Created — Tam JSON gövdesi ile veritabanına ekleme)
6. `POST http://localhost:3000/events` (400 Bad Request — Sadece `title` gönderilerek şema doğrulama testi)
