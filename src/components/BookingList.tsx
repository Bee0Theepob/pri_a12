"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeBooking } from "../redux/features/bookSlice";
import { BookingItem } from "../../interface"; // Ensure this path is correct

const BookingList: React.FC = () => {
  const dispatch = useDispatch();
  const bookings: BookingItem[] = useSelector(
    (state: RootState) => state.book.bookItems
  );

  const handleCancelBooking = (booking: BookingItem) => {
    // Add a confirmation dialog for better user experience
    if (
      window.confirm(
        `Are you sure you want to cancel the booking for ${booking.venue} on ${booking.bookDate}?`
      )
    ) {
      dispatch(removeBooking(booking));
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl text-gray-500 border-2 border-dashed p-8 rounded-lg">
          😔 No Venue Bookings found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
        My Venue Bookings ({bookings.length})
      </h2>

      {/* Grid Layout for Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Card Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-indigo-700 truncate">
                {booking.venue}
              </h3>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium text-gray-800">Date:</span>{" "}
                  {booking.bookDate}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    Contact Person:
                  </span>{" "}
                  {booking.nameLastname}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  {booking.tel}
                </p>
              </div>
            </div>

            {/* Cancel Button Footer */}
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => handleCancelBooking(booking)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md transition-colors duration-200"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
