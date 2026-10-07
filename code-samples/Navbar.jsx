import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const navOptions = [
  {
    to: "/",
    title: "Home",
    colour: "#BBF5F8",
  },
  {
    to: "/about",
    title: "About",
    colour: "#F1EEB6",
  },
  {
    to: "/contact",
    title: "Contact",
    colour: "#CDC8F6",
  },
  {
    to: "/login",
    title: "Login",
    colour: "#FF5412",
  },
  {
    to: "/blogs", // New Blogs button
    title: "Blogs",
    colour: "#FFD700",
  },
];

// shared hover style for normal nav links
const navLinkClasses =
  "relative text-lg font-semibold transition-all duration-200 hover:scale-105 hover:underline underline-offset-4";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* top bar */}
      <div className="flex items-center justify-between bg-black p-4">
        <img src="/bugbox.svg" alt="Bugbox logo" className="w-36" />

        {/* mobile menu icon */}
        {menuOpen ? (
          <RxCross2
            onClick={handleMenuOpen}
            size={36}
            className="text-white md:hidden"
          />
        ) : (
          <IoIosMenu
            onClick={handleMenuOpen}
            size={36}
            className="text-white md:hidden"
          />
        )}

        {/* desktop nav options */}
        <div className="ml-auto hidden gap-8 md:flex">
          {navOptions.map((option, index) => (
            <Link key={index} to={option.to}>
              {option.title === "Login" ? (
                // make Login look like a primary button
                <span className="rounded-full border border-white px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black hover:-translate-y-[1px]">
                  {option.title}
                </span>
              ) : (
                <span
                  style={{ color: option.colour }}
                  className={navLinkClasses}
                >
                  {option.title}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* mobile nav options */}
      <div
        className={`absolute z-50 flex min-h-screen w-full flex-col gap-8 bg-black p-14 py-8 text-lg font-semibold text-white transition-all duration-500 md:hidden ${
          menuOpen ? "left-0" : "-left-[1200px]"
        }`}
      >
        {navOptions.map((option, index) => (
          <Link
            key={index}
            to={option.to}
            onClick={() => setMenuOpen(false)} // close menu when a link is tapped
          >
            <span
              style={{ color: option.colour }}
              className="block transition-all duration-200 hover:scale-105 hover:underline underline-offset-4"
            >
              {option.title}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;
