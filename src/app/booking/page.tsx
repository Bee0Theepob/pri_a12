import DateReserve from "@/components/DateReserve"; // ไม่จำเป็นแล้วถ้าใช้ BookingForm
import TextField from "@mui/material/TextField"; // ไม่จำเป็นแล้ว
import Select from "@mui/material/Select"; // ไม่จำเป็นแล้ว
import MenuItem from "@mui/material/MenuItem"; // ไม่จำเป็นแล้ว
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import BookingForm from "@/components/BookingForm"; // 🚀 นำเข้า BookingForm

export default async function BookingPage() {
  // ... (ส่วน Profile Code เหมือนเดิม) ...

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="w-full max-w-3xl">
        {/* ... (ส่วน Profile แสดงผลเหมือนเดิม) ... */}
      </div>

      {/* 🚀 แทนที่ฟอร์มเดิมด้วย Client Component */}
      <BookingForm />
    </main>
  );
}
