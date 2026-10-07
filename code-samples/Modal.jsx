import React, { useEffect, useRef } from "react";

export default function Modal({
  isOpen,
  onClose,
  title = "Dialog",
  children,
  closeOnOverlayClick = true,
  initialFocusSelector,
  ariaLabelledById,
}) {
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous focus
    previouslyFocusedRef.current = document.activeElement;

    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus management
    const focusModal = () => {
      const root = modalRef.current;
      if (!root) return;

      let el = null;
      if (initialFocusSelector) {
        el = root.querySelector(initialFocusSelector);
      }
      if (!el) {
        el = root.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
      }
      (el || root).focus();
    };

    // Small delay ensures elements exist
    const t = setTimeout(focusModal, 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === "Tab") {
        const root = modalRef.current;
        if (!root) return;

        const focusables = Array.from(
          root.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((node) => !node.hasAttribute("disabled"));

        if (focusables.length === 0) {
          e.preventDefault();
          root.focus();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        // Trap focus
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore previous focus
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusSelector]);

  if (!isOpen) return null;

  const labelledBy = ariaLabelledById || "modal-title";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          if (closeOnOverlayClick) onClose?.();
        }}
      />

      {/* Panel */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl outline-none"
      >
        <div className="flex items-start justify-between gap-3 border-b p-4">
          <h2 id={labelledBy} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1 text-sm font-medium hover:bg-black/5"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
