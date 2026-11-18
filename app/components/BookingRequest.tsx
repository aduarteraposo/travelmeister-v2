"use client";

import { toast } from "@/components/ui/toast";

export default function BookingRequest({
  text,
  notes,
}: {
  text: string;
  notes: string[];
}) {
  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.add({ type: "success", description: "Copied!" });
      },
      () => {
        toast.add({
          type: "error",
          description: "Couldn't copy",
          timeout: 5000,
        });
      }
    );
  }

  return (
    <>
      {text && (
        <>
          <p className="rounded-xl border bg-gray-100 p-4 mb-4">{text}</p>
          <button
            className="bg-black text-white font-medium rounded-full px-5 py-2"
            type="button"
            onClick={() => copyTextToClipboard(text)}
          >
            Copy text
          </button>
        </>
      )}
      {notes.length > 0 && (
        <ul className="list-disc pl-4 mt-6 text-sm">
          {notes.map((n, i) => (
            <li key={i} className="mb-1">
              {n}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
