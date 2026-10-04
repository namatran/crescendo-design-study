"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { content } from "@/data/content";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const { about } = content;

/** Native <dialog>: focus trap, Esc to close and inert background come for free. */
export function AboutModal({ open, onClose }: AboutModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Close only when the press both started and ended on the backdrop, so a text
  // selection dragged out of the panel doesn't dismiss it.
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal?.();
    if (!open && dialog.open) dialog.close?.();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="about-title"
      onClose={onClose}
      // A pointer event whose target is the dialog itself is on the backdrop.
      onPointerDown={(e) => (pressedBackdrop.current = e.target === e.currentTarget)}
      onClick={(e) => {
        if (pressedBackdrop.current && e.target === e.currentTarget) onClose();
        pressedBackdrop.current = false;
      }}
      className="about-modal m-auto max-h-[90dvh] w-[90%] max-w-2xl overflow-y-auto rounded-2xl bg-white p-0 text-gray-700 shadow-2xl"
    >
      <div className="relative p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={about.close}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-gray-400"
        >
          <X size={24} />
        </button>

        <h2 id="about-title" className="mb-6 pr-10 text-4xl font-bold text-gray-900">
          {about.title}
        </h2>

        <div className="space-y-4">
          <p className="text-lg">{about.lead}</p>
          <p>{about.body}</p>

          <section className="mt-8">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">{about.featuresTitle}</h3>
            <ul className="list-inside list-disc space-y-2">
              {about.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">{about.musicTitle}</h3>
            <p>{about.music}</p>
          </section>

          <section className="mt-8">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">{about.studyTitle}</h3>
            <p>{about.study}</p>
          </section>
        </div>
      </div>
    </dialog>
  );
}
