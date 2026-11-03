import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((event) => event.category))];
  const filteredEvents = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section aria-labelledby="events-title">
      <h2 className="page-title" id="events-title">Etkinlikleri keşfet</h2>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <p className="sonuc-satiri" aria-live="polite">
        {filteredEvents.length} etkinlik bulundu
      </p>
      <EventList events={filteredEvents} emptyText="Etkinlik bulunamadı" />
    </section>
  );
}
