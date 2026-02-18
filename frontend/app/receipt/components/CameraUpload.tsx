'use client';

import { RefObject } from 'react';

type Props = {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  imageName: string | null;
  // ↓↓↓ ここに | null を追加しました！これでエラーが消えます ↓↓↓
  fileInputRef: RefObject<HTMLInputElement | null>;
};

export default function CameraUpload({ onFileSelect, isLoading, imageName, fileInputRef }: Props) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border-2 border-dashed border-gray-200 text-center relative overflow-hidden group hover:border-[#ffbd59] transition-colors">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        onChange={(e) => {
          if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
        }}
        disabled={isLoading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="space-y-4">
        <div className="text-5xl text-gray-300 group-hover:text-[#ffbd59] transition-colors">📸</div>
        <p className="font-bold text-gray-500 group-hover:text-[#ff914d] transition-colors">
          {imageName ? 'ファイルを選択済み' : 'ここをタップしてカメラを起動'}
        </p>
        {imageName && <p className="text-sm text-[#ff914d] font-bold truncate px-4">{imageName}</p>}
        <p className="text-xs text-gray-400">(画像またはPDF)</p>
      </div>
    </div>
  );
}