# Kampüs Etkinlikleri — Sprint 6 ve Vize

React, TypeScript ve Vite ile hazırlanmış kampüs etkinlikleri uygulaması. Etkinlikleri listeler, arar ve kategoriye göre süzer; detay ve yönetim sayfaları sunar. Ekleme, güncelleme ve silme işlemleri Context üzerinden uygulama açıkken sayfalar arasında paylaşılır. Veriler bellekte tutulur ve sayfa yenilendiğinde örnek verilere döner. Giriş, kayıt ve şifre yenileme ekranları doğrulama demosudur; bilgiler hiçbir yere gönderilmez.

**Canlı adres:** [https://sprint2-sprint2.vercel.app/](https://sprint2-sprint2.vercel.app/)  
*(Vercel domain ayarlarından eklenen özel domain: `https://erolardaakin-frontend.vercel.app`)*

## Kurulum ve çalıştırma

Bu klasörde (`frontend`):

```bash
npm install
npm run dev
```

Üretim derlemesini kontrol etmek için:

```bash
npm run build
```

## Sayfalar ve rotalar

| Adres | Sayfa | Açıklama |
| --- | --- | --- |
| `/` | `HomePage` | Yaklaşan 2 etkinlik ve tanıtım |
| `/events` | `EventsPage` | Etkinlik arama, kategoriye göre filtreleme ve liste |
| `/events/:id` | `EventDetailPage` | Etkinlik detayları ve afişi |
| `/admin` | `AdminPage` | Etkinlik yönetimi (düzenleme, silme ve yeni etkinlik butonu) |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | `EditEventPage` | Etkinlik güncelleme formu |
| `/login` | `LoginPage` | Giriş formu doğrulama demosu |
| `/register` | `RegisterPage` | Kayıt formu doğrulama demosu |
| `/forgot-password` | `ForgotPasswordPage` | Şifremi unuttum doğrulama demosu |
| `*` | `NotFoundPage` | Bulunamayan adres sayfası (404) |

## Önemli dosyalar

- `src/App.tsx`: Router rotalarını (10 adet) ve ortak sayfa kabuğunu tanımlar.
- `src/main.tsx`: `BrowserRouter` ve `EventsProvider` ile uygulamayı başlatır.
- `src/context/EventsContext.tsx`: Etkinlik listesini ve `addEvent`, `updateEvent`, `deleteEvent` işlemlerini Context üzerinden paylaşır.
- `src/pages/`: Her rota için sayfa bileşenlerini içerir.
- `src/components/`: Ortak layout, etkinlik ve form bileşenlerini içerir.
- `src/utils/validate-event.ts`: Etkinlik formu doğrulama kurallarını uygular.
- `vercel.json`: Vercel'de alt rotaların doğrudan açılmasını sağlar (SPA rewrite).
