/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type {
  CampusEvent,
  Category,
  EventFormData,
} from "../types/campus-event";

const API_BASE_URL = "http://localhost:3000";

interface EventsContextValue {
  events: CampusEvent[];
  loading: boolean;
  error: string | null;
  addEvent: (data: EventFormData) => Promise<void>;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
  refreshEvents: () => Promise<void>;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData, existingImage?: string): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity) || 0,
    date: data.date,
    time: data.time ?? "",
    location: data.location.trim(),
    description: data.description.trim(),
    ...(existingImage ? { image: existingImage } : {}),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchEvents(): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/events`);
      if (!res.ok) {
        throw new Error(`API hatası: ${res.status}`);
      }
      const data: CampusEvent[] = await res.json();
      setEvents(data);
    } catch (err) {
      console.warn("Backend API'ye bağlanılamadı, yerel veriler kullanılıyor:", err);
      setError("Backend bağlantısı kurulamadı. Yerel veriler gösteriliyor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  async function addEvent(data: EventFormData): Promise<void> {
    const payload = {
      title: data.title.trim(),
      category: data.category,
      capacity: Number(data.capacity) || 0,
      date: data.date,
      time: data.time ?? "",
      location: data.location.trim(),
      description: data.description.trim(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedEvent: CampusEvent = await res.json();
        setEvents((currentEvents) => [...currentEvents, savedEvent]);
        return;
      }
    } catch (err) {
      console.warn("POST /events başarısız oldu, yerel hafızaya ekleniyor:", err);
    }

    // API başarısız veya kapalıysa yerel state'e ekle
    setEvents((currentEvents) => [
      ...currentEvents,
      toEvent(`event-${Date.now()}`, data),
    ]);
  }

  function updateEvent(id: string, data: EventFormData): void {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? toEvent(id, data, event.image) : event,
      ),
    );
  }

  function deleteEvent(id: string): void {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    );
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
        addEvent,
        updateEvent,
        deleteEvent,
        refreshEvents: fetchEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (context === null) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalıdır.");
  }
  return context;
}
