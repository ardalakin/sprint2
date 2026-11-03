import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  const eventId = event.id;
  const initialData: EventFormData = {
    title: event.title,
    category: event.category,
    capacity: String(event.capacity),
    date: event.date,
    time: event.time,
    location: event.location,
    description: event.description,
  };

  function handleSubmit(data: EventFormData): void {
    updateEvent(eventId, data);
    navigate("/admin");
  }

  return (
    <section aria-labelledby="form-title">
      <h2 className="page-title" id="form-title">Etkinlik Güncelle</h2>
      <p className="form-intro">“{event.title}” etkinliğinin bilgilerini düzenleyin.</p>
      <EventForm
        key={event.id}
        initialData={initialData}
        submitText="Güncelle"
        onSubmit={handleSubmit}
      />
    </section>
  );
}
