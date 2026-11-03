import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { getEventDateValue } from "../utils/format-date";

export default function HomePage() {
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => getEventDateValue(a.date) - getEventDateValue(b.date))
    .slice(0, 2);

  return (
    <section aria-labelledby="upcoming-title">
      <p className="intro">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      <h2 className="page-title bolum-baslik" id="upcoming-title">Yaklaşan 2 Etkinlik</h2>
      <p className="intro">Kampüsteki en yakın etkinlikleri ve kayıt bilgilerini inceleyin.</p>
      <EventList events={upcoming} />
      <p className="more-link">
        <Link className="button buton" to="/events">Tüm etkinlikleri gör</Link>
      </p>
    </section>
  );
}
