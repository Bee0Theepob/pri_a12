"use client";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

interface CardProps {
  venueName: string;
  imgSrc: string;
  rating?: number | null;
  onRatingChange?: (rating: number | null) => void;
}

export function Card({ venueName, imgSrc, rating, onRatingChange }: CardProps) {
  const ratingId = `${venueName} Rating`;
  return (
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-t-lg bg-white">
        <Image
          src={imgSrc}
          alt="Card"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[30%] p-[10px] text-black flex flex-col gap-2">
        {venueName}
        {typeof onRatingChange === "function" && rating !== undefined ? (
          <Rating
            id={ratingId}
            name={ratingId}
            data-testid={ratingId}
            value={rating}
            onChange={(e, newValue) => {
              e.stopPropagation();
              onRatingChange?.(newValue);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
        ) : null}
      </div>
    </InteractiveCard>
  );
}
