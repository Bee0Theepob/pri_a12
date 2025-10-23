"use client";
import React from "react";
import BookingList from "../../components/BookingList";

const MyBookingPage: React.FC = () => {
  return (
    <div>
      <h1>My Bookings</h1>
      <BookingList />
    </div>
  );
};

export default MyBookingPage;
