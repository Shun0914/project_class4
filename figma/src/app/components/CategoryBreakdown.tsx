import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ExpenseBreakdownModal } from "./ExpenseBreakdownModal";

interface Category {
  id: number;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface CategoryBreakdownProps {
  categories: Category[];
  year: number;
  month: number;
  onManualEntryClick?: () => void;
}

function CategoryItem({ category }: { category: Category }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Category Name with Color Dot */}
      <div className="flex gap-[4px] items-center pr-[4px]">
        <div
          className="rounded-[18px] shrink-0 size-[8px]"
          style={{ backgroundColor: category.color }}
        />
        <p className="font-['Noto_Sans_JP',sans-serif] font-normal leading-none text-[#2a3449] text-[16px]">
          {category.name}
        </p>
      </div>

      {/* Amount and Percentage */}
      <div className="flex gap-[4px] items-center">
        <div className="flex items-end text-[#2a3449] text-center font-['Noto_Sans_JP',sans-serif] font-bold leading-none">
          <p className="text-[16px]">
            {category.amount.toLocaleString()}
          </p>
          <p className="text-[12px]">
            円
          </p>
        </div>
        <p className="font-['Noto_Sans_JP',sans-serif] font-bold leading-none text-[#445371] text-[12px] text-right w-[37px]">
          {category.percentage}%
        </p>
      </div>
    </div>
  );
}

export function CategoryBreakdown({ categories, year, month, onManualEntryClick }: CategoryBreakdownProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-[rgba(255,255,255,0.8)] flex flex-col items-start p-[16px] rounded-[16px] w-full hover:bg-[rgba(255,255,255,0.9)] transition-colors"
      >
        {/* Header */}
        <div className="flex gap-[4px] items-center pb-[8px] w-full">
          <p className="flex-1 font-['Noto_Sans_JP',sans-serif] font-bold leading-[1.5] text-[#2a3449] text-[16px] text-left">
            内訳
          </p>
          <ChevronRight className="size-[16px] text-[#6f6d6c]" />
        </div>

        {/* Category List */}
        <div className="flex flex-col gap-[12px] items-start pt-[8px] w-full">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </button>

      {/* Expense Breakdown Modal */}
      <ExpenseBreakdownModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        year={year}
        month={month}
        onManualEntryClick={onManualEntryClick}
      />
    </>
  );
}