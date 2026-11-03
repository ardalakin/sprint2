import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";

export default function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="event-card">
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
      <Link className="event-link" to={`/events/${event.id}`}>
        Detayları gör
      </Link>
    </article>
  );
}
