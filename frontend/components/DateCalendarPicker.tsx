"use client"; // Next.jsでFramer MotionやuseStateを使うために必須です

import { useState, useEffect } from "react";
// motion/react から framer-motion に変更（Next.jsプロジェクトの標準に合わせます）
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateCalendarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate: Date;
  onConfirm: (date: Date) => void;
}

export function DateCalendarPicker({
  isOpen,
  onClose,
  initialDate,
  onConfirm,
}: DateCalendarPickerProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate);
      setViewYear(initialDate.getFullYear());
      setViewMonth(initialDate.getMonth());
    }
  }, [isOpen, initialDate]);

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days = [];
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

    const headers = weekDays.map((day, index) => (
      <div
        key={`header-${index}`}
        className="flex items-center justify-center h-[40px]"
      >
        <p
          className={`font-sans font-bold text-[12px] ${
            index === 0 ? "text-[#fa4848]" : index === 6 ? "text-[#3ec3db]" : "text-[#5a6b8b]"
          }`}
        >
          {day}
        </p>
      </div>
    ));

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-[40px]" />
      );
    }

// Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 時間をリセットして日付のみで比較

      // 未来日かどうかの判定
      const isFuture = date > today;

      const isSelected =
        selectedDate.getFullYear() === viewYear &&
        selectedDate.getMonth() === viewMonth &&
        selectedDate.getDate() === day;
      
      const isToday =
        today.getFullYear() === viewYear &&
        today.getMonth() === viewMonth &&
        today.getDate() === day;
      
      const dayOfWeek = date.getDay();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isFuture && setSelectedDate(date)} // 未来日の場合はクリックを無視
          disabled={isFuture} // 未来日の場合はボタンを無効化
          className={`h-[40px] flex items-center justify-center rounded-full transition-colors ${
            isSelected
              ? "bg-[#eb6b15]"
              : isToday
              ? "bg-[#fff5f0]"
              : isFuture
              ? "cursor-not-allowed opacity-30" // 未来日の見た目：半透明で禁止マーク
              : "hover:bg-[#f5f7fa]"
          }`}
        >
          <p
            className={`font-sans text-[16px] ${
              isSelected
                ? "font-bold text-white"
                : isFuture
                ? "text-gray-400" // 未来日はグレーアウト
                : dayOfWeek === 0
                ? "font-normal text-[#fa4848]"
                : dayOfWeek === 6
                ? "font-normal text-[#3ec3db]"
                : "font-normal text-[#2a3449]"
            }`}
          >
            {day}
          </p>
        </button>
      );
    }

    return (
      <>
        {headers}
        {days}
      </>
    );
  };

  const monthNames = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-[16px] py-[16px] border-b border-[#e2e9f2]">
              <button
                type="button"
                onClick={onClose}
                className="font-sans font-normal text-[16px] text-[#5a6b8b]"
              >
                キャンセル
              </button>
              <h3 className="font-sans font-bold text-[16px] text-[#2a3449]">
                日付選択
              </h3>
              <button
                type="button"
                onClick={handleConfirm}
                className="font-sans font-bold text-[16px] text-[#eb6b15]"
              >
                完了
              </button>
            </div>

            <div className="px-[16px] py-[20px]">
              <div className="flex items-center justify-between mb-[16px]">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-[#f5f7fa] transition-colors"
                >
                  <ChevronLeft className="w-[20px] h-[20px] text-[#5a6b8b]" />
                </button>
                <p className="font-sans font-bold text-[18px] text-[#2a3449]">
                  {viewYear}年 {monthNames[viewMonth]}
                </p>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-[#f5f7fa] transition-colors"
                >
                  <ChevronRight className="w-[20px] h-[20px] text-[#5a6b8b]" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-[4px]">
                {renderCalendar()}
              </div>
            </div>

            <div className="h-[20px]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}