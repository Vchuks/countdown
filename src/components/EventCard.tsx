import { Pencil, TrashAlt } from "@boxicons/react";
import type { CountDownProps } from "../types/formdata";
import { useEffect, useState } from "react";
const EventCard = ({ event, onEdit, onDelete }: CountDownProps) => {
  const getTimeLeft = (selectedEvent: Date) => {
    const now = Date.now();
    const diff = new Date(selectedEvent).getTime() - now;
    if (diff <= 0) return null;
    const totalSeconds = diff / 1000;
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: Math.floor(totalSeconds % 60),
      diff,
    };
  };

  const pad = (n: number) =>
    String(Math.max(0, Math.floor(n))).padStart(2, "0");

  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(new Date(event?.date) || new Date()),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (event.date) {
        setTimeLeft(getTimeLeft(new Date(event.date)));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [event.date]);

  const getUrgency = (diff?: number) => {
    if (!diff) return "past";
    const days = diff / 86400000;
    if (days <= 3) return "soon";
    if (days <= 30) return "mid";
    return "far";
  };
  return (
    <div
      key={event.id}
      className="bg-[rgb(53,50,50,0.8)] shadow shadow-[#EEEEEE] rounded-lg p-6 cursor-pointer transition hover:shadow-sm hover:shadow-[#EEEEEE]"
    >
      <div className="flex items-center justify-end gap-3 mb-2 ">
        <Pencil onClick={onEdit} />
        <TrashAlt onClick={onDelete} />
      </div>
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-sm text-gray-200 mb-4">
        {new Date(event.date).toLocaleDateString()}
      </p>
      {event.description && (
        <p className="text-sm text-gray-800">{event.description}</p>
      )}
      {timeLeft ? (
        <div className="flex gap-4">
          {[
            { v: timeLeft.days, l: "Days" },
            { v: timeLeft.hours, l: "Hrs" },
            { v: timeLeft.minutes, l: "Min" },
            { v: timeLeft.seconds, l: "Sec" },
          ].map(({ v, l }) => (
            <div className="time-unit" key={l}>
              <div className="time-value">{pad(v)}</div>
              <div className="time-label">{l}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="past-label">Event happened</div>
      )}
      <p
        className={`text-sm font-semibold mt-4 ${getUrgency(timeLeft?.diff) === "mid" ? "text-yellow-500" : getUrgency(timeLeft?.diff) === "soon" ? "text-red-500" : getUrgency(timeLeft?.diff) === "far" ? "text-green-500" : "text-gray-500"}`}
      >
        Urgency: {getUrgency(timeLeft?.diff)}{" "}
      </p>
    </div>
  );
};

export default EventCard;
