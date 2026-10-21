import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

export default function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre" role="search">
      <div className="form-field">
        <label htmlFor="event-search">Etkinlik ara</label>
        <input
          id="event-search"
          type="search"
          placeholder="Etkinlik adı veya açıklama"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="event-category">Kategori</label>
        <select
          id="event-category"
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value as Category | "")
          }
        >
          <option value="">Tüm kategoriler</option>
          {categories.map((eventCategory) => (
            <option key={eventCategory} value={eventCategory}>
              {eventCategory}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
