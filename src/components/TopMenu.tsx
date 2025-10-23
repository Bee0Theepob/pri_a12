"use client";

import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TopMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("venue_token")
        : null;
    setLoggedIn(Boolean(token));

    const onRoute = () => {
      const t = localStorage.getItem("venue_token");
      setLoggedIn(Boolean(t));
    };

    // listen to storage events (other tabs) and route changes
    const onStorage = (e: StorageEvent) => {
      if (e.key === "venue_token") setLoggedIn(Boolean(e.newValue));
    };

    window.addEventListener("storage", onStorage);

    // there's no simple public router event in next/navigation; re-run check on focus
    window.addEventListener("focus", onRoute);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onRoute);
    };
  }, []);

  function handleSignOut(e: React.MouseEvent) {
    e.preventDefault();
    try {
      localStorage.removeItem("venue_token");
      localStorage.removeItem("venue_user");
    } catch (err) {
      // ignore
    }
    // full reload to reset app state
    window.location.href = "/login";
  }

  return (
    <div className="h-[70px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row-reverse items-center">
      <Image
        src={"/img/logo.png"}
        className="h-full w-auto mr-[10px]"
        alt="logo"
        width={500}
        height={500}
        sizes="200vh"
      />
      {/* <TopMenuItem title="my bookings" pageRef="/mybooking" /> */}
      <TopMenuItem title="booking" pageRef="/booking" />
      <div className="flex flex-reverse mr-[5px] gap-[5px] left-4  absolute">
        {loggedIn ? (
          <a
            href="#"
            onClick={handleSignOut}
            className="text-sm text-gray-700 hover:underline"
          >
            Sign Out
          </a>
        ) : (
          // <Link
          //   href="/login"
          //   className="text-sm text-gray-700 hover:underline"
          // >
          //   Sign In
          // </Link>
          <TopMenuItem title="Sign In" pageRef="/login" />
        )}
        <TopMenuItem title="my bookings" pageRef="/mybooking" />
      </div>
    </div>
  );
}
