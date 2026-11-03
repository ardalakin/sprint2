/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type {
  CampusEvent,
  Category,
  EventFormData,
} from "../types/campus-event";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData, existingImage?: string): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    ...(existingImage ? { image: existingImage } : {}),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData): void {
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
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
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
