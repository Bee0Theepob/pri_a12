"use client";
// สมมติว่าคุณใช้ library เลือกวันที่ เช่น @mui/x-date-pickers หรือ react-datepicker

import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // ตัวอย่าง
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
// กำหนด prop type
interface DateReserveProps {
  onDateChange: (date: string) => void;
}

export default function DateReserve({ onDateChange }: DateReserveProps) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    // 🚀 ส่งค่าวันที่กลับไปในรูปแบบที่ต้องการ (เช่น YYYY/MM/DD)
    if (newValue) {
      onDateChange(newValue.format("YYYY/MM/DD"));
    } else {
      onDateChange("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Booking Date"
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{ textField: { fullWidth: true, variant: "standard" } }}
      />
    </LocalizationProvider>
  );
}
