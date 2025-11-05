"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";
import "@/styles/components/header.css";
import { toggleTheme } from "@/lib/redux/slices/uiSlice";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


function StreakIconFilled() {
  return (
    <svg
      width="22"
      height="28"
      viewBox="0 0 22 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4107 1.43594L1.82266 15.7559C1.74013 15.8695 1.68841 16.0025 1.67252 16.142C1.65663 16.2815 1.67712 16.4227 1.73199 16.5519C1.78417 16.678 1.8711 16.7867 1.98266 16.8653C2.08944 16.9395 2.21665 16.9786 2.34666 16.9773H10.328L9.11866 26.3413C9.11282 26.4035 9.12534 26.4661 9.15466 26.5213C9.18189 26.5741 9.22601 26.6164 9.27999 26.6413C9.33422 26.6679 9.38977 26.6737 9.44666 26.6586C9.50315 26.6439 9.55327 26.6112 9.58933 26.5653L20.1773 12.2439C20.2599 12.1304 20.3116 11.9974 20.3275 11.8579C20.3434 11.7184 20.3229 11.5772 20.268 11.4479C20.2156 11.3223 20.1287 11.2142 20.0173 11.1359C19.9107 11.0613 19.7835 11.0217 19.6533 11.0226H11.672L12.8813 1.65861C12.8872 1.59638 12.8746 1.53381 12.8453 1.47861C12.8181 1.42576 12.774 1.38352 12.72 1.35861C12.6677 1.33508 12.6093 1.329 12.5533 1.34128C12.4968 1.35594 12.4467 1.39006 12.4107 1.43594Z"
        fill="#FFCA36"
        stroke="#FFCA36"
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSelector((state: RootState) => state.persisted.ui.theme);
  const user = useSelector((state: RootState) => state.persisted.auth.isAuthenticated ? state.persisted.auth.user : null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle isLoggedIn based on user state
  useEffect(() => {
    console.log("User in Header:", user);
    if (user) {
      setIsLoggedIn(true);
      setShowAuthButtons(false);
    } else {
      setIsLoggedIn(false);
      setShowAuthButtons(true);
    }
  }, [user]);

  // Hide auth buttons on auth pages or when logged in  


  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup" || isLoggedIn) {
      setShowAuthButtons(false);
    }
  }, [isLoggedIn, pathname]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header
      className={`fixed w-full z-50 header-padding flex items-center justify-between transition-all duration-300 ${
        scrolled ? "scrolled-header" : "transparent-header"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image
          src={theme == "light" ? IMAGES.LOGO.BLACK : IMAGES.LOGO.WHITE}
          alt="logo"
          className="w-12 h-12 logo-img"
          width={30}
          height={30}
        />
        <h1 className="text-xl font-bold text-center">simesta</h1>
      </div>

      <div className="flex items-center justify-between p-4 gap-4">
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        {showAuthButtons ? (
          <>
            <Link href={"/login"}>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button variant="secondary" size="sm">
                Sign Up
              </Button>
            </Link>
          </>
        ) : null}
        {isLoggedIn && user ? (
          <>
            <button className="flex profile-info items-center gap-2">
              <StreakIconFilled />
              <h5 className="profile-name text-md">{`${user.user_activity.streak_count}-Day Streak`}</h5>
            </button>
            <button className="profile-info flex items-center gap-2">
              <div className="padding-4 flex items-center justify-center bg-primary-500 w-5 h-5 rounded-sm">
                <h5 className="text-white text-xs">{user.name[0].toUpperCase()}</h5>
              </div>
              <h4 className="profile-name">{`${user.name.split(' ')[0]}'s Assistant`}</h4>
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}
