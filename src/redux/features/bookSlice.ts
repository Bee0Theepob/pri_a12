import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingItem } from '../../../interface';

interface BookState {
    bookItems: BookingItem[];
}

const initialState: BookState = {
    bookItems: [],
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBooking: (state: BookState, action: PayloadAction<BookingItem>) => {
            const existingIndex = state.bookItems.findIndex(
                (item: BookingItem) =>
                    item.venue === action.payload.venue &&
                    item.bookDate === action.payload.bookDate
            );

            if (existingIndex !== -1) {
                state.bookItems[existingIndex] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state: BookState, action: PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter(
                (item: BookingItem) =>
                    item.nameLastname !== action.payload.nameLastname ||
                    item.tel !== action.payload.tel ||
                    item.venue !== action.payload.venue ||
                    item.bookDate !== action.payload.bookDate
            );
        },
    },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export { bookSlice }; // Explicitly export the slice
export default bookSlice.reducer;
