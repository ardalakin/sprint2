[Canlı site](https://sprint2-sprint2.vercel.app/)

# Kampüs Etkinlikleri — Sprint 5

React ve TypeScript ile hazırlanan kampüs etkinlikleri uygulaması. Sprint 5, Sprint 4'teki ekranları aynı tutarak arayüzü yeniden kullanılabilir bileşenlere ayırır.

## Dosyalar

- frontend/src/App.tsx sayfa durumunu ve bileşenler arasındaki veriyi yönetir.
- frontend/src/components/layout/ Header, menü ve alt bilgi bileşenlerini içerir.
- frontend/src/components/events/ Etkinlik kartı, listesi, filtresi ve detay bileşenlerini içerir.
- frontend/src/components/forms/EventForm.tsx ekleme ve güncelleme formunu içerir.
- frontend/src/types/page.ts ekran adları için PageName türünü tanımlar.
- frontend/src/types/campus-event.ts etkinlik alanlarını ve kategori türünü tanımlar.
- frontend/src/data/events.ts tipli altı etkinlik kaydını tutar.
- frontend/src/utils/filter-events.ts arama, kategori filtreleme ve kimliğe göre bulma işlevlerini sağlar.
- frontend/src/utils/format-date.ts etkinlik tarihlerini Türkçe biçimde gösterir.
- frontend/src/App.css Sprint 4'teki görünümü ve responsive düzeni korur.
- frontend/public/images.png Kariyer Günleri detayında kullanılan üniversite amblemidir.

## Yerel çalıştırma

PowerShell'de:

cd frontend
npm.cmd run dev
npm.cmd run build

Komut İstemi'nde npm run dev ve npm run build komutları kullanılabilir.
