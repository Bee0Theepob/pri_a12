"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Banner() {
  const { data: session } = useSession();
  let localUser: any = null;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("venue_user");
      if (raw) localUser = JSON.parse(raw);
    } catch (e) {
      // ignore
    }
  }
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  return (
    <div
      className="banner block p-[5px] m-0 w-screen h-[50vh] relative"
      onClick={() => setIndex((prevIndex) => (prevIndex + 1) % covers.length)}
    >
      <Image
        src={covers[index]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />
      <div className="bannerText relative text-white top-[100px] z-20 text-center">
        <h1 className="text-4xl font-medium">
          where every event finds its venue
        </h1>
        <h3 className="text-xl font-serif">
          Finding the perfect venue has never been easier. Whether it's a
          wedding corporate event, or private party, we connecting people to the
          perfect place.
        </h3>
      </div>
      {(session && session.user) || localUser ? (
        <div className="absolute top-4 right-4 text-white z-30">
          Welcome {session?.user?.name || localUser?.name}
        </div>
      ) : null}

      <button
        className="bg-white text-cyan-600 border border0cyan-600 font-semibold py-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/venue");
        }}
      >
        Select Venue
      </button>
    </div>
  );
}
