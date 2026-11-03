import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string): void {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section aria-labelledby="admin-title">
      <div className="admin-heading">
        <div>
          <h2 className="page-title bolum-baslik" id="admin-title">Etkinlik Yönetimi</h2>
          <p className="intro">Etkinlik ekleyin, düzenleyin veya listeden kaldırın.</p>
        </div>
        <Link className="button buton" to="/admin/new">+ Yeni etkinlik</Link>
      </div>

      {events.length === 0 ? (
        <p>Henüz etkinlik yok.</p>
      ) : (
        <div className="table-wrapper">
          <table className="tablo">
            <thead>
              <tr>
                <th scope="col">Etkinlik</th>
                <th scope="col">Tarih</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td data-baslik="Etkinlik">{event.title}</td>
                  <td data-baslik="Tarih">{formatDate(event.date)}, {event.time}</td>
                  <td data-baslik="Kategori">{event.category}</td>
                  <td data-baslik="İşlemler" className="islemler">
                    <Link className="button buton button-small buton-small" to={`/admin/${event.id}/edit`}>
                      Düzenle
                    </Link>
                    <button
                      className="button buton button-sil buton-sil button-small buton-small"
                      type="button"
                      onClick={() => handleDelete(event.id, event.title)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
