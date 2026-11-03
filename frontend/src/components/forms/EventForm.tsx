import { useState, type ChangeEvent, type FormEvent } from "react";
import type {
  Category,
  EventFormData,
  EventFormErrors,
} from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export default function EventForm({
  initialData,
  submitText,
  onSubmit,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void {
    const name = event.target.name as keyof EventFormData;
    const nextData = { ...data, [name]: event.target.value };
    setData(nextData);
    if (submitted) setErrors(validateEvent(nextData));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitted(true);
    const foundErrors = validateEvent(data);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) onSubmit(data);
  }

  function errorFor(field: keyof EventFormData): string | undefined {
    return errors[field];
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={80}
          placeholder="Örn. Girişimcilik Söyleşisi"
          value={data.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        <span className="hata-metni" id="title-error">{errorFor("title")}</span>
      </div>
      <div className="form-field">
        <label htmlFor="form-category">Kategori *</label>
        <select
          id="form-category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? "category-error" : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <span className="hata-metni" id="category-error">{errorFor("category")}</span>
      </div>
      <div className="form-field">
        <label htmlFor="date">Tarih *</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        <span className="hata-metni" id="date-error">{errorFor("date")}</span>
      </div>
      <div className="form-field">
        <label htmlFor="time">Saat *</label>
        <input
          id="time"
          name="time"
          type="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? "time-error" : undefined}
        />
        <span className="hata-metni" id="time-error">{errorFor("time")}</span>
      </div>
      <div className="form-field">
        <label htmlFor="location">Yer *</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Örn. A Blok Konferans Salonu"
          value={data.location}
          onChange={handleChange}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? "location-error" : undefined}
        />
        <span className="hata-metni" id="location-error">{errorFor("location")}</span>
      </div>
      <div className="form-field">
        <label htmlFor="capacity">Kontenjan *</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min={1}
          max={1000}
          step={1}
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={Boolean(errors.capacity)}
          aria-describedby={errors.capacity ? "capacity-error" : undefined}
        />
        <span className="hata-metni" id="capacity-error">{errorFor("capacity")}</span>
      </div>
      <div className="form-field">
        <label htmlFor="description">Açıklama *</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        <span className="hata-metni" id="description-error">{errorFor("description")}</span>
      </div>
      <button type="submit">{submitText}</button>
    </form>
  );
}
