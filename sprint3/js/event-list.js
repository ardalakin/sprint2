import { events, formatDate, escapeHTML, dateToISO } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  return `
    <article class="event-card">
      <h2>${escapeHTML(event.title)}</h2>
      <span class="event-category">${escapeHTML(event.category)}</span>
      <p>Tarih: ${escapeHTML(formatDate(event.date))}, ${escapeHTML(event.time)}</p>
      <p>Yer: ${escapeHTML(event.location)}</p>
      <p>Kontenjan: ${escapeHTML(event.capacity)} kişi</p>
      <p class="event-description">${escapeHTML(event.description)}</p>
      <a class="event-link" href="etkinlik-detay.html?id=${encodeURIComponent(event.id)}">Detayları gör</a>
    </article>`;
}

function render(items) {
  list.innerHTML = items.map(createCard).join("");
}

if (list.dataset.limit) {
  const upcoming = [...events]
    .sort((a, b) => dateToISO(a.date).localeCompare(dateToISO(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(upcoming);
} else {
  render(events);

  const filterForm = document.querySelector("#filtre-formu");
  const search = document.querySelector("#arama");
  const categorySelect = document.querySelector("#kategori-filtre");
  const resultLine = document.querySelector("#sonuc");

  for (const category of new Set(events.map((event) => event.category))) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  }

  function filterEvents() {
    const term = search.value.trim().toLocaleLowerCase("tr-TR");
    const selectedCategory = categorySelect.value;
    const filtered = events.filter((event) => {
      const searchableText = `${event.title} ${event.category} ${event.location} ${event.description}`
        .toLocaleLowerCase("tr-TR");
      const textMatches = searchableText.includes(term);
      const categoryMatches = !selectedCategory || event.category === selectedCategory;
      return textMatches && categoryMatches;
    });

    render(filtered);
    resultLine.textContent = filtered.length
      ? `${filtered.length} etkinlik listeleniyor.`
      : "Aramanıza uygun etkinlik bulunamadı.";
  }

  filterForm.addEventListener("submit", (event) => event.preventDefault());
  search.addEventListener("input", filterEvents);
  categorySelect.addEventListener("change", filterEvents);
  resultLine.textContent = `${events.length} etkinlik listeleniyor.`;
}
