"use client"; // ต้องมี directive นี้

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DateReserve from "@/components/DateReserve"; // สมมติว่า DateReserve อยู่ใน components
import { useDispatch } from "react-redux";
import { addBooking } from "@/redux/features/bookSlice"; // ปรับ path ตามจริง
import { BookingItem } from "../../interface"; // ปรับ path ตามจริง

export default function BookingForm() {
  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [venue, setVenue] = useState("");
  const [bookDate, setBookDate] = useState(""); // State สำหรับวันที่จอง

  const dispatch = useDispatch();

  const handleVenueChange = (event: SelectChangeEvent<string>) => {
    setVenue(event.target.value);
  };

  // สมมติว่า DateReserve ส่งค่าวันที่มาที่ function นี้ (คุณต้องปรับ DateReserve ให้ส่งค่าด้วย)
  const handleDateChange = (date: string) => {
    setBookDate(date);
  };

  const handleBook = () => {
    if (nameLastname && tel && venue && bookDate) {
      const newBooking: BookingItem = {
        nameLastname,
        tel,
        venue,
        bookDate,
      };

      // 🚀 ส่วนสำคัญ: ส่ง action เข้า Redux Store
      dispatch(addBooking(newBooking));

      // Optional: แจ้งเตือนหรือ redirect
      alert(`จอง ${venue} วันที่ ${bookDate} สำเร็จ!`);

      // Optional: ล้างฟอร์ม
      setNameLastname("");
      setTel("");
      setVenue("");
      setBookDate("");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <TextField
        variant="standard"
        name="Name-Lastname"
        label="Name-Lastname"
        fullWidth
        value={nameLastname}
        onChange={(e) => setNameLastname(e.target.value)}
      />
      <TextField
        variant="standard"
        name="Contact-Number"
        label="Contact-Number"
        fullWidth
        value={tel}
        onChange={(e) => setTel(e.target.value)}
      />
      <Select
        variant="standard"
        id="venue"
        labelId="venue-label"
        value={venue}
        onChange={handleVenueChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          เลือก Venue
        </MenuItem>
        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
        <MenuItem value="Spark">Spark Space</MenuItem>
        <MenuItem value="GrandTable">The Grand Table</MenuItem>
      </Select>

      {/* ⚠️ คุณต้องปรับ DateReserve ให้รับ prop onChange และเรียก handleDateChange */}
      <DateReserve onDateChange={handleDateChange} />

      <button
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
        onClick={handleBook} // 🚀 เรียกใช้ function handleBook เมื่อกดปุ่ม
      >
        Book Venue
      </button>
    </div>
  );
}
