import * as React from "react";
import ImageList from "../Imagelist/Imagelist";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router";

/**
 * Task 5 / Phase 5 – Homepage Hero Layout Polish
 * - Cleaner spacing + alignment
 * - Better responsive layout
 * - Improved CTA button styling
 * - Stronger visual hierarchy
 */

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-6 py-12 md:flex md:items-center md:justify-between md:gap-12 lg:py-20">
        {/* LEFT SIDE – Text & CTA */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          {/* Animated heading */}
          <div className="flex items-center justify-center gap-3 text-4xl font-bold text-red-500 md:justify-start md:text-6xl">
            <p>We</p>
            <ReactTyped
              strings={["simplify", "teach", "make it easy!"]}
              typeSpeed={100}
              backSpeed={50}
              loop
              className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent"
            />
          </div>

          {/* Subtext */}
          <p className="mx-auto max-w-xl text-sm text-gray-700 md:mx-0 md:text-base">
            BugBox makes STEM teaching easier with ready-to-run kits, clear
            guides, and engaging activities. It helps teachers focus on teaching
            while students stay hands-on and curious.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => navigate("/shop")}
              className="rounded-full bg-[#7060EC] px-10 py-3 text-sm font-semibold text-white shadow-md duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#7060EC] focus:ring-offset-2"
            >
              Purchase now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – Images */}
        <div className="flex-1 mt-10 md:mt-0">
          <div className="rounded-3xl border border-gray-100 bg-white/80 p-3 shadow-md backdrop-blur">
            <ImageList />
          </div>
        </div>
      </section>
    </div>
  );
}
