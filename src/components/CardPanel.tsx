"use client";
import { Card } from "./Card";
import { useReducer } from "react";
import Link from "next/link";

export default function CardPanel() {
  type Action =
    | { type: "set"; venue: string; rating: number | null }
    | { type: "remove"; venue: string };
  const initialRatings = new Map<string, number | null>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);

  function reducer(state: Map<string, number | null>, action: Action) {
    switch (action.type) {
      case "set": {
        const newState = new Map(state);
        newState.set(action.venue, action.rating);
        return newState;
      }
      case "remove": {
        const newState = new Map(state);
        newState.delete(action.venue);
        return newState;
      }
      default:
        return state;
    }
  }

  const [ratings, dispatch] = useReducer(reducer, initialRatings);

  const mockCards = [
    { cid: "001", venueName: "The Bloom Pavilion", imgSrc: "/img/bloom.jpg" },
    { cid: "002", venueName: "Spark Space", imgSrc: "/img/sparkspace.jpg" },
    { cid: "003", venueName: "The Grand Table", imgSrc: "/img/grandtable.jpg" },
  ];

  return (
    <div>
      <div className="flex flex-row mx-auto pb-[15px] justify-evenly">
        {mockCards.map((mockcard) => (
          <Link href={`/venue/${mockcard.cid}`} className="w-1/5">
            <Card
              venueName={mockcard.venueName}
              imgSrc={mockcard.imgSrc}
              rating={ratings.get(mockcard.venueName) ?? 0}
              onRatingChange={(r) =>
                dispatch({ type: "set", venue: mockcard.venueName, rating: r })
              }
              key={mockcard.cid}
            />
          </Link>
        ))}
      </div>
      <div className="text-xl">Venue List with Rating : {ratings.size}</div>
      <div className="mt-6 flex flex-col items-start gap-2 mb-4 pb-4">
        {[...ratings.entries()].map(([venue, rating]) => (
          <div
            key={venue}
            data-testid={venue}
            className="cursor-pointer px-4 py-2 border rounded w-fit hover:bg-gray-100 mx-10"
            onClick={() => dispatch({ type: "remove", venue })}
          >
            {venue}: {rating}
          </div>
        ))}
      </div>
    </div>
  );
}
