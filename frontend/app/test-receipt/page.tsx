{/* 機能テスト用　レシート読み込みボタンページ */}
import Link from 'next/link';

export default function TestReceiptPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex items-center justify-center p-4">
      
      <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">機能テスト</h1>
        
        {/* オレンジグラデーションボタン */}
        <Link 
          href="/receipt" 
          className="block w-full py-4 rounded-full bg-gradient-to-r from-[#ffbd59] to-[#ff914d] text-white font-bold text-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all"
        >
          レシートを読み込む
        </Link>
        <p className="text-gray-500 mt-4 text-sm">
          ※遷移後、自動的にカメラ/ファイル選択が起動します
        </p>
      </div>
    </div>
  );
}