import { useEffect, useState } from "react";
import type { EventFormProps } from "../types/formdata";

const EventForm = ({ prefilled, onSave, onClose }: EventFormProps) => {
  const [form, setForm] = useState(
    typeof prefilled === "object"
      ? { ...prefilled }
      : { title: "", date: "", description: "" },
  );
  const [submitted, setSubmitted] = useState(false);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#EEEEEE] bg-white text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#EEEEEE] focus:border-transparent transition";

  return (
    <div className=" absolute top-0 left-0 h-dvh w-full bg-[rgba(239,241,247,0.2)] flex items-center justify-center p-6">
      <div
        className={`w-full max-w-lg bg-[#dbd9d9] transition-all duration-500 ease-linear border border-[#EEEEEE] rounded-2xl shadow-lg p-10 ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        <div className="mb-5 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {prefilled ? "Edit Event" : "Add New Event"}
          </h2>
          <p className="mt-1 text-sm text-[#1C1917] font-light">
            Create your event.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (form.title !== undefined && form.date !== undefined) {
              if (!form.title.trim() || !form.date) {
                alert("Please fill in both the Title and Date.");
                return;
              }
              onSave(
                {
                  title: form.title ?? "",
                  date: form.date ?? "",
                  description: form.description ?? "",
                },
                e,
              );
              setSubmitted(true);
              setTimeout(() => {
                setSubmitted(false);
                onClose();
              }, 500);
            }
          }}
        >
          <div>
            <label className="block text-sm font-semibold tracking-widest uppercase text-[#1C1917] mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title ?? ""}
              onChange={handleChange}
              placeholder="Give it a name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold tracking-widest uppercase text-[#1C1917] mb-2">
              Date
            </label>
            <input
              type="datetime-local"
              name="date"
              value={form.date ?? ""}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold tracking-widest uppercase text-[#1C1917] mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={form.description ?? ""}
              onChange={handleChange}
              placeholder="Enter more details..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              className="bg-red-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" w-full bg-[#1a1a1a] active:scale-95 text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-lg transition"
            >
              {prefilled ? "Update" : "Create"}
            </button>
          </div>
          {submitted && (
            <p className="text-sm text-center text-green-600 font-medium animate-pulse">
              Event Added!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventForm;
