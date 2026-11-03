import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="message message-error mesaj mesaj-hata" aria-labelledby="not-found-title">
      <h2 id="not-found-title">Sayfa bulunamadı</h2>
      <p>Aradığınız adres veya etkinlik mevcut değil.</p>
      <Link className="button buton" to="/">Ana sayfaya dön</Link>
    </section>
  );
}
