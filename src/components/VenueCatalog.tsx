"use client";
import React from "react";
import { Card } from "./Card";
import Link from "next/link";
import { VenueJson, VenueItem } from "../../interface";

type Props = {
  venuesJson: Promise<VenueJson> | VenueJson;
};

// Async server component that accepts a Promise<VenueJson> and renders cards.
export default async function VenueCatalog({ venuesJson }: Props) {
  const venuesResult = await venuesJson;

  // map each data entry to VenueItem (already typed) and render a Card for each
  const items = venuesResult.data as VenueItem[];

  return (
    <div className="flex flex-row mx-auto pb-[15px] justify-evenly">
      {items.map((item) => (
        <div key={item.id} className="w-1/5">
          <Link href={`/venue/${item.id}`}>
            <Card venueName={item.name} imgSrc={item.picture} />
          </Link>
        </div>
      ))}
    </div>
  );
}
