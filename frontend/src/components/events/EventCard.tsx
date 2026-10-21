import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export default function EventCard({
  event,
  onShowDetail,
}: EventCardProps) {
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
      <a
        className="event-link"
        href="#detay"
        onClick={(clickEvent) => {
          clickEvent.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}
