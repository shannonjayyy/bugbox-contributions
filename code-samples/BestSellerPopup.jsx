import React, { useEffect, useMemo, useState } from "react";
import Modal from "./ui/Modal";

const KEY = "bbx_best_seller_popup_dismissed_v1";
const COOKIE = "bbx_popup_dismissed_v1";

function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export default function BestSellerPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const bestSellingProducts = useMemo(
    () => [
      {
        name: "BugBox Starter Kit",
        description: "Perfect entry kit for primary classes.",
        badge: "Most Popular",
      },
      {
        name: "BugBox Playground Pack",
        description: "Hands-on group activities pack.",
        badge: "Classroom Ready",
      },
      {
        name: "BugBox Teacher Toolkit",
        description: "Resources for lesson planning.",
        badge: "Teacher Favourite",
      },
    ],
    []
  );

  useEffect(() => {
    const dismissed =
      safeGet(window.localStorage, KEY) ||
      safeGet(window.sessionStorage, KEY) ||
      getCookie(COOKIE);

    if (!dismissed) {
      const t = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    // Write FIRST (so it persists), then close
    safeSet(window.localStorage, KEY, "1");
    safeSet(window.sessionStorage, KEY, "1");
    setCookie(COOKIE, "1");

    // even if storage is blocked, we still close UI
    setIsOpen(false);
  };

  const viewAllKits = () => {
    dismiss();
    window.location.href = "/shop";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={dismiss}
      title="Best-Selling BugBox Kits"
      initialFocusSelector='button[data-primary="true"]'
    >
      <div className="space-y-4">
        <p className="text-sm text-black/70">
          Explore our most popular kits—picked to help students learn hands-on.
        </p>

        <div className="grid gap-3">
          {bestSellingProducts.map((p) => (
            <div key={p.name} className="rounded-xl border p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">{p.name}</div>
                <span className="rounded-full bg-black/5 px-2 py-1 text-xs">
                  {p.badge}
                </span>
              </div>
              <div className="mt-1 text-sm text-black/70">{p.description}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            Maybe later
          </button>

          <button
            type="button"
            data-primary="true"
            onClick={viewAllKits}
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            View all kits
          </button>
        </div>
      </div>
    </Modal>
  );
}
