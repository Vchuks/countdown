import { useEffect, useState } from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import type { EventData, InputData } from "./types/formdata";
import EventCard from "./components/EventCard";

function App() {
  const [openFormData, setOpenFormData] = useState<EventData | null | string>(
    null,
  );
  const [allEvents, setAllEvents] = useState<EventData[]>(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const handleSubmit = (
    data: InputData,
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const safeData: InputData = {
      ...data,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
    };
    if (openFormData === "new") {
      const newData = {
        ...safeData,
        id: Date.now().toString(),
        date: new Date(safeData.date).toISOString(),
      };
      setAllEvents((prev) => [...prev, newData]);
    } else {
      const updatedEvents = allEvents.map((event) =>
        event.id === (openFormData as EventData).id
          ? {
              ...event,
              title: safeData.title,
              date: new Date(safeData.date).toISOString(),
              description: safeData.description,
            }
          : event,
      );
      setAllEvents(updatedEvents);
    }
    setOpenFormData(null);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("events", JSON.stringify(allEvents));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [allEvents]);

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    const filteredEvents = allEvents.filter((event) => event.id !== id);
    setAllEvents(filteredEvents);
  };

  return (
    <div className="bg-[rgba(8,11,18,0.85)] p-10 min-h-dvh">
      <div className="text-center space-y-4 h-full flex flex-col items-center justify-center">
        <h1>Hi there!</h1>
        <p className="pb-6">You can create and manage your events here.</p>
        <button
          className="bg-[#1a1a1a] active:scale-95 text-white text-xs font-semibold tracking-widest px-8 py-3 rounded-lg transition"
          onClick={() => setOpenFormData("new")}
        >
          Create an Event
        </button>
      </div>

      <section className="mt-10">
        {allEvents.length === 0 ? (
          <p className="text-center text-gray-400">
            No events yet. Start by creating one!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => setOpenFormData(event)}
                onDelete={() => handleDelete(event.id)}
              />
            ))}
          </div>
        )}
      </section>

      {openFormData && (
        <EventForm
          prefilled={openFormData === "new" ? null : openFormData}
          onSave={handleSubmit}
          onClose={() => setOpenFormData(null)}
        />
      )}
    </div>
  );
}

export default App;
