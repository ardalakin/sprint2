import type { FormEvent } from "react";
import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export default function EventForm({ onSubmit }: EventFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={80}
          placeholder="Örn. Girişimcilik Söyleşisi"
        />
      </div>
      <div className="form-field">
        <label htmlFor="form-category">Kategori *</label>
        <select id="form-category" name="category" defaultValue="">
          <option value="">Seçiniz</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="date">Tarih *</label>
        <input id="date" name="date" type="date" />
      </div>
      <div className="form-field">
        <label htmlFor="time">Saat *</label>
        <input id="time" name="time" type="time" />
      </div>
      <div className="form-field">
        <label htmlFor="location">Yer *</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Örn. A Blok Konferans Salonu"
        />
      </div>
      <div className="form-field">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min={1}
          max={1000}
        />
      </div>
      <div className="form-field">
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={5} />
      </div>
      <button type="submit">Kaydet</button>
    </form>
  );
}
