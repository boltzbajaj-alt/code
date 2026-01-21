import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d1526] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="CodeTrack logo" className="h-9 w-11" />
          <span className="text-[28px] font-semibold">CodeTrack</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-3 text-md md:flex">
          <SignedOut>
            <Link className="rounded-md bg-white px-3 py-1 text-[#0d1526]" to="/">
              Home
            </Link>
            <a className="rounded-md px-3 py-1 hover:bg-white/10" href="#features">
              Features
            </a>
            <Link className="rounded-md px-3 py-1 hover:bg-white/10" to="/contact">
              Contact
            </Link>
            <Link
              className="rounded-md bg-[#2f64ff] px-3 py-1 text-white hover:bg-[#2956d8]"
              to="/sign-up"
            >
              SignUp
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0d1526] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <SignedOut>
              <Link
                className="rounded-md bg-white px-3 py-2 text-center text-sm text-[#0d1526]"
                to="/"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <a
                className="rounded-md px-3 py-2 text-center text-sm hover:bg-white/10"
                href="#features"
                onClick={toggleMenu}
              >
                Features
              </a>
              <Link
                className="rounded-md px-3 py-2 text-center text-sm hover:bg-white/10"
                to="/contact"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                className="rounded-md bg-[#2f64ff] px-3 py-2 text-center text-sm text-white hover:bg-[#2956d8]"
                to="/sign-up"
                onClick={toggleMenu}
              >
                SignUp
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
