import "./App.css";
import { useEffect, useState } from "react";
import EventDetail from "./components/events/EventDetail";
import EventFilter from "./components/events/EventFilter";
import EventList from "./components/events/EventList";
import EventForm from "./components/forms/EventForm";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import { getEventDateValue } from "./utils/format-date";

const pageTitles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik bulunamadı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const go = (nextPage: PageName, id: string | null = null): void => {
    setPage(nextPage);
    setSelectedId(id);
  };

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const pageHeading = page === "detail" ? selected?.title ?? pageTitles.detail : pageTitles[page];
  const documentTitle = page === "detail" && selected
    ? "Kampüs Etkinlikleri — " + selected.title
    : pageHeading + " | Kampüs Etkinlikleri";

  useEffect(() => { document.title = documentTitle; }, [documentTitle]);

  const upcoming = [...events]
    .sort((a, b) => getEventDateValue(a.date) - getEventDateValue(b.date))
    .slice(0, 2);
  const categories = [...new Set(events.map((event) => event.category))];
  const filteredEvents = filterByCategory(searchEvents(events, searchText), category);
  const activeMenuPage: PageName = page === "detail" || page === "update" ? "events" : page;
  const showDetail = (id: string): void => go("detail", id);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Header title={pageHeading} text={page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." : undefined} />
          <Navigation current={activeMenuPage} onNavigate={(nextPage) => go(nextPage)} />
        </div>
      </header>
      <main>
        {page === "home" && (
          <section aria-labelledby="upcoming-title">
            <h2 className="page-title" id="upcoming-title">Yaklaşan 2 Etkinlik</h2>
            <p className="intro">Kampüsteki en yakın etkinlikleri ve kayıt bilgilerini inceleyin.</p>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <p className="more-link"><button className="button" type="button" onClick={() => go("events")}>Tüm etkinlikleri gör</button></p>
          </section>
        )}
        {page === "events" && (
          <section aria-labelledby="events-title">
            <h2 className="page-title" id="events-title">Etkinlikleri keşfet</h2>
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            {filteredEvents.length > 0 && (
              <p className="sonuc-satiri" aria-live="polite">{filteredEvents.length} etkinlik bulundu</p>
            )}
            <EventList events={filteredEvents} onShowDetail={showDetail} emptyText="Etkinlik bulunamadı" />
          </section>
        )}
        {page === "detail" && (selected ? (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        ) : (
          <div className="message message-error" role="alert">
            <p>Bu etkinlik bulunamadı. Lütfen etkinlik listesine dönün.</p>
            <button className="button" type="button" onClick={() => go("events")}>Listeye dön</button>
          </div>
        ))}
        {(page === "add" || page === "update") && (
          <section aria-labelledby="form-title">
            <h2 className="page-title" id="form-title">{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="form-intro">Bu sprintte form yalnızca görünüm içindir; etkinlik bilgileri kaydedilmez veya güncellenmez.</p>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
