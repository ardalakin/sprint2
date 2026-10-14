[Canlı site](https://sprint2-sprint2.vercel.app/)

# Kampüs Etkinlikleri — Sprint 4

Vite, React ve TypeScript ile hazırlanan kampüs etkinlikleri uygulaması. Sprint 3'teki görünüm ve altı örnek etkinlik korunur; sayfalar React state'i ile gösterilir.

## Dosyalar

- frontend/package.json proje komutlarını ve bağımlılıklarını tanımlar.
- frontend/package-lock.json yüklenen paket sürümlerini sabitler.
- frontend/node_modules/ npm ile indirilen paketleri içerir ve Git'e eklenmez.
- frontend/tsconfig*.json TypeScript derleme ayarlarını belirler.
- frontend/vite.config.ts Vite ve React eklentisinin ayarlarını tutar.
- frontend/index.html Türkçe belgeyi ve React uygulamasının yerleşeceği #root alanını tanımlar.
- frontend/src/main.tsx React uygulamasını #root alanında başlatır.
- frontend/src/App.tsx ana sayfa, etkinlikler, detay, ekleme ve güncelleme görünümlerini içerir.
- frontend/src/App.css öğrenci numarasına göre hazırlanan Sprint 3 stilini uygular.
- frontend/src/index.css genel stil dosyasıdır; bu sprintte boştur.
- frontend/src/types/campus-event.ts etkinlik alanlarını ve kategori türünü tanımlar.
- frontend/src/data/events.ts tipli altı etkinlik kaydını tutar.
- frontend/src/utils/filter-events.ts arama, kategori filtreleme ve kimliğe göre bulma işlevlerini sağlar.
- frontend/public/images.png Kariyer Günleri detayında kullanılan üniversite amblemidir.
- 

## Yerel çalıştırma

cd frontend
npm install
npm run dev

Üretim derlemesi için npm run build, derlemeyi yerel önizlemek için npm run preview komutlarını kullan.


