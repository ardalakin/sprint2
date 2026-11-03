import type { EventFormData, EventFormErrors } from "../types/campus-event";

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};
  const title = data.title.trim();
  const location = data.location.trim();
  const description = data.description.trim();
  const capacity = Number(data.capacity);

  if (title.length < 3) errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  if (data.category === "") errors.category = "Bir kategori seçin.";
  if (!data.date) errors.date = "Bir tarih seçin.";
  if (!data.time) errors.time = "Bir saat seçin.";
  if (!location) errors.location = "Etkinlik yerini girin.";
  if (
    data.capacity.trim() === "" ||
    !Number.isInteger(capacity) ||
    capacity < 1 ||
    capacity > 1000
  ) {
    errors.capacity = "Kontenjan 1 ile 1000 arasında tam sayı olmalı.";
  }
  if (description.length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalı.";
  }

  return errors;
}
