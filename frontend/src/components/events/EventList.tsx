import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

export default function EventList({
  events,
  onShowDetail,
  emptyText,
}: EventListProps) {
  if (events.length === 0) {
    return emptyText ? (
      <p className="sonuc-satiri" aria-live="polite">
        {emptyText}
      </p>
    ) : null;
  }

  return (
    <section className="event-grid" aria-label="Etkinlik listesi">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onShowDetail={onShowDetail}
        />
      ))}
    </section>
  );
}
