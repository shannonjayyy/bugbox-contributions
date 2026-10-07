import React from "react";
import { useNavigate } from "react-router";

export default function BestSellerBanner() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-6 max-w-7xl px-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Best-selling BugBox kits
          </p>
          <p className="text-xs text-slate-600">
            You dismissed the popup earlier — here’s a quick link if you want to browse later.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/shop")}
            className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition"
          >
            View kits
          </button>

          <button
            onClick={() => navigate("/about")}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white transition"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
