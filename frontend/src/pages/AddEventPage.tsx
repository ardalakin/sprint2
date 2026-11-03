import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  capacity: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventFormData): void {
    addEvent(data);
    navigate("/admin");
  }

  return (
    <section aria-labelledby="form-title">
      <h2 className="page-title bolum-baslik" id="form-title">Etkinlik Ekle</h2>
      <p className="form-intro">Yeni etkinlik bilgilerini doldurup kaydedin.</p>
      <EventForm initialData={emptyForm} submitText="Kaydet" onSubmit={handleSubmit} />
    </section>
  );
}
