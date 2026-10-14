import { events, formatDate, escapeHTML } from "./data.js";

const container = document.querySelector("#detay");
const heading = document.querySelector("#detay-baslik");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((item) => item.id === id);

if (!event) {
  heading.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";
  container.innerHTML = `
    <div class="message message-error" role="alert">
      <p>"${escapeHTML(id || "")}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
    </div>
    <a class="button" href="etkinlikler.html">← Listeye dön</a>`;
} else {
  heading.textContent = event.title;
  document.title = `${event.title} | Kampüs Etkinlikleri`;

  const poster = event.image ? `
    <figure class="poster">
      <div class="poster-art">
        <img src="${escapeHTML(event.image)}" alt="Üniversite amblemi">
        <h2>${escapeHTML(event.title.replace(/\s+\d{4}$/, ""))}</h2>
        <p class="poster-year">${escapeHTML(event.date.slice(-4))}</p>
        <p class="poster-meta">${escapeHTML(formatDate(event.date))} · ${escapeHTML(event.location)}</p>
      </div>
      <figcaption>${escapeHTML(event.title)} afişi</figcaption>
    </figure>` : "";

  container.innerHTML = `
    <section class="detail-layout ${event.image ? "has-poster" : "no-poster"}" aria-label="Etkinlik ayrıntıları">
      ${poster}
      <section class="event-info-card">
        <h2>Etkinlik Künyesi</h2>
        <dl class="event-info">
          <div><dt>Tarih</dt><dd>${escapeHTML(formatDate(event.date))}, ${escapeHTML(event.time)}</dd></div>
          <div><dt>Yer</dt><dd>${escapeHTML(event.location)}</dd></div>
          <div><dt>Kategori</dt><dd>${escapeHTML(event.category)}</dd></div>
          <div><dt>Kontenjan</dt><dd>${escapeHTML(event.capacity)} kişi</dd></div>
        </dl>
      </section>
      <section class="detail-description">
        <h2>Açıklama</h2>
        <p>${escapeHTML(event.description)}</p>
      </section>
      <div class="detail-actions">
        <a class="button" href="etkinlikler.html">← Listeye dön</a>
        <a class="button" href="etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}">Bu etkinliği güncelle</a>
      </div>
    </section>`;
}
