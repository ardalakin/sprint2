# Kampüs Etkinlik Backend REST API

Bu proje, Sprint 7 kapsamında geliştirilmiş Node.js + Express tabanlı bir REST API uygulamasıdır. Kampüs etkinlik verilerini bellek içi (in-memory) saklar ve JSON olarak sunar.

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
`.env` içeriği:
```env
PORT=3000
```

### 3. Sunucuyu Başlatma
Geliştirme modunda (watch mode) çalıştırmak için:
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

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu sağlık kontrolü ve öğrenci no | 200 OK | — | Bu sprint |
| **GET** | `/events` | Etkinlik listesini getir (`?category=` isteğe bağlı filtre) | 200 OK | — | Bu sprint |
| **GET** | `/events/:id` | Tek etkinlik getir | 200 OK | 404 Not Found | Bu sprint |
| **POST** | `/events` | Yeni etkinlik oluştur (`title`, `category`, `date` zorunlu) | 201 Created | 400 Bad Request | Bu sprint |
| **PATCH** | `/events/:id` | Etkinlik güncelle | 200 OK | 400, 404 | Sprint 9 |
| **DELETE** | `/events/:id` | Etkinlik sil | 204 No Content | 404 | Sprint 9 |

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

Örnekler:
* Bulunamayan etkinlik veya rota: `404 Not Found` $\rightarrow$ `{"error": {"message": "Event not found"}}`
* Eksik zorunlu alanlar: `400 Bad Request` $\rightarrow$ `{"error": {"message": "title, category and date are required"}}`

---

## Postman İstekleri (Collection)

Otomatik test ve doğrulama için kullanılan 6 istek:
1. `GET http://localhost:3000/health` (200 OK)
2. `GET http://localhost:3000/events` (200 OK - 6 kayıt)
3. `GET http://localhost:3000/events/event-2` (200 OK)
4. `GET http://localhost:3000/events/yok` (404 Not Found)
5. `POST http://localhost:3000/events` (201 Created)
6. `POST http://localhost:3000/events` (400 Bad Request - eksik alan)

İlgili collection dosyası: `requests/kampus-api.json`
