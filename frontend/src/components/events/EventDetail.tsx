import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <section
      className={"detail-layout " + (event.image ? "has-poster" : "no-poster")}
      aria-label="Etkinlik ayrıntıları"
    >
      {event.image && (
        <figure className="poster">
          <div className="poster-art">
            <img
              src={event.image}
              alt="Süleyman Demirel Üniversitesi amblemi"
            />
            <h2>{event.title.replace(/\s+\d{4}$/, "")}</h2>
            <p className="poster-year">{event.date.split("-")[2]}</p>
            <p className="poster-meta">
              {formatDate(event.date)} · {event.location}
            </p>
          </div>
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}
      <section className="event-info-card">
        <h2>Etkinlik Künyesi</h2>
        <dl className="event-info">
          <div>
            <dt>Tarih</dt>
            <dd>{formatDate(event.date)}, {event.time}</dd>
          </div>
          <div>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
          </div>
          <div>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
          </div>
          <div>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </div>
        </dl>
      </section>
      <section className="detail-description">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
      </section>
      <div className="detail-actions">
        <Link className="button" to="/events">
          ← Listeye dön
        </Link>
        <Link className="button" to={`/admin/${event.id}/edit`}>
          Bu etkinliği güncelle
        </Link>
      </div>
    </section>
  );
}
