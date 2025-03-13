import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  placeholder = "날짜를 선택하세요",
}) => {
  return (
    <div className="flex w-full flex-col border-b pb-3 focus:text-main">
      {label && <label className="w-20 text-gray-700">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        className="w-full border-none bg-white px-4 text-gray-900 outline-none focus:ring-0"
        calendarClassName=" shadow-lg rounded-lg"
        dayClassName={() =>
          "hover:text-white transition-all duration-200 rounded-full"
        }
      />
    </div>
  );
};

export default CustomDatePicker;
