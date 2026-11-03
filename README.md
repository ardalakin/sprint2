# Kampüs Etkinlikleri — Sprint 6 ve Vize

React, TypeScript ve Vite ile hazırlanmış kampüs etkinlikleri uygulaması. Etkinlikleri listeler, arar ve kategoriye göre süzer; detay ve yönetim sayfaları sunar. Ekleme, güncelleme ve silme işlemleri Context üzerinden uygulama açıkken sayfalar arasında paylaşılır. Veriler bellekte tutulur ve sayfa yenilendiğinde örnek verilere döner. Giriş, kayıt ve şifre yenileme ekranları doğrulama demosudur; bilgiler hiçbir yere gönderilmez.

**Canlı adres:** [https://sprint2-sprint2.vercel.app/](https://sprint2-sprint2.vercel.app/)  
*(Vercel domain ayarlarından eklenen özel domain: `https://erolardaakin-frontend.vercel.app`)*  
**GitHub Deposu:** [https://github.com/ardalakin/sprint2](https://github.com/ardalakin/sprint2)

## Kurulum ve çalıştırma

frontend klasöründe:

    npm install
    npm run dev

Üretim derlemesini kontrol etmek için:

    npm run build

## Sayfalar ve rotalar

| Adres | Sayfa |
| --- | --- |
| / | Ana sayfa |
| /events | Etkinlik listesi, arama ve filtreleme |
| /events/:id | Etkinlik ayrıntısı |
| /admin | Etkinlik yönetimi |
| /admin/new | Etkinlik ekleme |
| /admin/:id/edit | Etkinlik güncelleme |
| /login | Giriş doğrulama demosu |
| /register | Kayıt doğrulama demosu |
| /forgot-password | Şifre yenileme demosu |
| * | Bulunamayan adres sayfası |

## Önemli dosyalar

- frontend/src/App.tsx: Router rotalarını ve ortak sayfa kabuğunu tanımlar.
- frontend/src/main.tsx: BrowserRouter ve EventsProvider ile uygulamayı başlatır.
- frontend/src/context/EventsContext.tsx: Etkinlik listesini ve ekle/güncelle/sil işlemlerini paylaşır.
- frontend/src/pages/: Her rota için sayfa bileşenlerini içerir.
- frontend/src/components/: Ortak görünüm, etkinlik ve form bileşenlerini içerir.
- frontend/src/utils/validate-event.ts: Etkinlik formu doğrulama kurallarını uygular.
- frontend/vercel.json: Vercel'de alt rotaların doğrudan açılmasını sağlar.

GitHub'a gönderme ve Vercel dağıtımını güncelleme proje sahibinin teslim adımlarıdır.
