import "./App.css";
import { useEffect, useState, type FormEvent } from "react";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";
type MenuPage = Extract<PageName, "home" | "events" | "add">;

const menuItems: { label: string; page: MenuPage }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Ekle", page: "add" },
];

function parseEventDate(value: string): Date {
  const [day, month, year] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(value: string): string {
  return parseEventDate(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const go = (nextPage: PageName, id: string | null = null): void => {
    setPage(nextPage);
    setSelectedId(id);
  };

  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  const pageHeading =
    page === "detail"
      ? selected?.title ?? "Etkinlik bulunamadı"
      : page === "events"
        ? "Tüm Etkinlikler"
        : page === "add"
          ? "Etkinlik Ekle"
          : page === "update"
            ? "Etkinlik Güncelle"
            : "Kampüs Etkinlikleri";

  const documentTitle =
    page === "detail" && selected
      ? "Kampüs Etkinlikleri — " + selected.title
      : pageHeading + " | Kampüs Etkinlikleri";

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const upcoming = [...events]
    .sort(
      (first, second) =>
        parseEventDate(first.date).getTime() -
        parseEventDate(second.date).getTime(),
    )
    .slice(0, 2);

  const categories = [...new Set(events.map((event) => event.category))];
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category,
  );

  const activeMenuPage: MenuPage =
    page === "detail" || page === "update" ? "events" : page;

  function renderCard(event: CampusEvent) {
    return (
      <article className="event-card" key={event.id}>
        <h2>{event.title}</h2>
        <span className="event-category">{event.category}</span>
        <p>
          <strong>Tarih:</strong> {formatDate(event.date)}, {event.time}
        </p>
        <p>
          <strong>Yer:</strong> {event.location}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.capacity} kişi
        </p>
        <p className="event-description">{event.description}</p>
        <a
          className="event-link"
          href="#detay"
          onClick={(clickEvent) => {
            clickEvent.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <h1 className="site-heading">{pageHeading}</h1>
          {page === "home" && (
            <p className="site-subtitle">
              Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
            </p>
          )}
          <nav className="site-nav" aria-label="Ana menü">
            {menuItems.map((item) => (
              <a
                key={item.page}
                href={"#" + item.page}
                aria-current={
                  activeMenuPage === item.page ? "page" : undefined
                }
                onClick={(clickEvent) => {
                  clickEvent.preventDefault();
                  go(item.page);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {page === "home" && (
          <section aria-labelledby="upcoming-title">
            <h2 className="page-title" id="upcoming-title">
              Yaklaşan 2 Etkinlik
            </h2>
            <p className="intro">
              Kampüsteki en yakın etkinlikleri ve kayıt bilgilerini inceleyin.
            </p>
            <section className="event-grid" aria-label="Yaklaşan etkinlikler">
              {upcoming.map(renderCard)}
            </section>
            <p className="more-link">
              <button
                className="button"
                type="button"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </p>
          </section>
        )}

        {page === "events" && (
          <section aria-labelledby="events-title">
            <h2 className="page-title" id="events-title">
              Etkinlikleri keşfet
            </h2>
            <div className="filtre" role="search">
              <div className="form-field">
                <label htmlFor="event-search">Etkinlik ara</label>
                <input
                  id="event-search"
                  type="search"
                  placeholder="Etkinlik adı veya açıklama"
                  value={searchText}
                  onChange={(changeEvent) =>
                    setSearchText(changeEvent.target.value)
                  }
                />
              </div>
              <div className="form-field">
                <label htmlFor="event-category">Kategori</label>
                <select
                  id="event-category"
                  value={category}
                  onChange={(changeEvent) =>
                    setCategory(changeEvent.target.value as Category | "")
                  }
                >
                  <option value="">Tüm kategoriler</option>
                  {categories.map((eventCategory) => (
                    <option key={eventCategory} value={eventCategory}>
                      {eventCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="sonuc-satiri" aria-live="polite">
              {filteredEvents.length === 0
                ? "Etkinlik bulunamadı"
                : filteredEvents.length + " etkinlik bulundu"}
            </p>
            {filteredEvents.length > 0 && (
              <section className="event-grid" aria-label="Etkinlik sonuçları">
                {filteredEvents.map(renderCard)}
              </section>
            )}
          </section>
        )}

        {page === "detail" && (
          <>
            {!selected && (
              <div className="message message-error" role="alert">
                <p>Bu etkinlik bulunamadı. Lütfen etkinlik listesine dönün.</p>
                <button
                  className="button"
                  type="button"
                  onClick={() => go("events")}
                >
                  Listeye dön
                </button>
              </div>
            )}
            {selected && (
              <section
                className={
                  "detail-layout " + (selected.image ? "has-poster" : "no-poster")
                }
                aria-label="Etkinlik ayrıntıları"
              >
                {selected.image && (
                  <figure className="poster">
                    <div className="poster-art">
                      <img
                        src={selected.image}
                        alt="Süleyman Demirel Üniversitesi amblemi"
                      />
                      <h2>{selected.title.replace(/\s+\d{4}$/, "")}</h2>
                      <p className="poster-year">
                        {selected.date.split("-")[2]}
                      </p>
                      <p className="poster-meta">
                        {formatDate(selected.date)} · {selected.location}
                      </p>
                    </div>
                    <figcaption>{selected.title} afişi</figcaption>
                  </figure>
                )}
                <section className="event-info-card">
                  <h2>Etkinlik Künyesi</h2>
                  <dl className="event-info">
                    <div>
                      <dt>Tarih</dt>
                      <dd>
                        {formatDate(selected.date)}, {selected.time}
                      </dd>
                    </div>
                    <div>
                      <dt>Yer</dt>
                      <dd>{selected.location}</dd>
                    </div>
                    <div>
                      <dt>Kategori</dt>
                      <dd>{selected.category}</dd>
                    </div>
                    <div>
                      <dt>Kontenjan</dt>
                      <dd>{selected.capacity} kişi</dd>
                    </div>
                  </dl>
                </section>
                <section className="detail-description">
                  <h2>Açıklama</h2>
                  <p>{selected.description}</p>
                </section>
                <div className="detail-actions">
                  <button
                    className="button"
                    type="button"
                    onClick={() => go("events")}
                  >
                    ← Listeye dön
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={() => go("update", selected.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        {(page === "add" || page === "update") && (
          <section aria-labelledby="form-title">
            <h2 className="page-title" id="form-title">
              {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            </h2>
            <p className="form-intro">
              Bu sprintte form yalnızca görünüm içindir; etkinlik bilgileri
              kaydedilmez veya güncellenmez.
            </p>
            <form
              className="form"
              onSubmit={(submitEvent: FormEvent<HTMLFormElement>) =>
                submitEvent.preventDefault()
              }
            >
              <div className="form-field">
                <label htmlFor="title">Etkinlik Adı *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Girişimcilik Söyleşisi"
                />
              </div>
              <div className="form-field">
                <label htmlFor="form-category">Kategori *</label>
                <select id="form-category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {categories.map((eventCategory) => (
                    <option key={eventCategory} value={eventCategory}>
                      {eventCategory}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="date">Tarih *</label>
                <input id="date" name="date" type="date" />
              </div>
              <div className="form-field">
                <label htmlFor="time">Saat *</label>
                <input id="time" name="time" type="time" />
              </div>
              <div className="form-field">
                <label htmlFor="location">Yer *</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>
              <div className="form-field">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min={1}
                  max={1000}
                />
              </div>
              <div className="form-field">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </div>
              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <p>Erol Arda Akın · 2311012038 · 2026</p>
      </footer>
    </>
  );
}

export default App;
