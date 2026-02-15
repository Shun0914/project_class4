'use client';

import { useState } from 'react';

export default function ReceiptPage() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8000/receipt/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      alert('解析に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 text-slate-900">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-center text-blue-900">レシート読み込み</h1>

        {/* アップロードエリア */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-200 mb-6">
          <label className="block mb-4 text-center font-bold text-gray-700">
            レシートを撮影または選択
          </label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
          />
          {image && (
            <p className="mt-4 text-center text-blue-600 font-bold">
              📸 準備OK: {image.name}
            </p>
          )}
        </div>

        {/* 解析ボタン */}
        <button
          onClick={handleUpload}
          disabled={!image || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-black py-4 rounded-2xl shadow-xl disabled:bg-gray-400 transition-all mb-10"
        >
          {loading ? 'AIが解析中...' : 'レシートを読み込む'}
        </button>

        {/* 編集・確認フォーム */}
        {result && (
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-300 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black mb-6 border-b-4 border-blue-500 pb-2">読み取り内容を確認</h2>
            
            <div className="space-y-6">
              {/* 店名・日付 */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-black text-gray-500 uppercase tracking-wider">店名</label>
                  <input type="text" className="w-full p-3 border-2 border-gray-300 rounded-xl font-bold text-lg text-black focus:border-blue-500 outline-none" defaultValue={result.store} />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-500 uppercase tracking-wider">日付</label>
                  <input type="date" className="w-full p-3 border-2 border-gray-300 rounded-xl font-bold text-lg text-black focus:border-blue-500 outline-none" defaultValue={result.date} />
                </div>
              </div>

              {/* 品目リスト */}
              <div>
                <label className="block text-sm font-black text-gray-500 mb-2 uppercase tracking-wider">品目リスト</label>
                <div className="space-y-3">
                  {result.items?.map((item: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input type="text" className="flex-1 p-3 border-2 border-gray-200 rounded-xl font-bold text-black" defaultValue={item.name} />
                      <div className="relative">
                        <span className="absolute left-2 top-3 text-gray-500 font-bold">¥</span>
                        <input type="number" className="w-28 p-3 pl-6 border-2 border-gray-200 rounded-xl font-bold text-right text-black" defaultValue={item.price} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 合計金額 */}
              <div className="border-t-4 border-gray-100 pt-6 flex justify-between items-center">
                <span className="text-xl font-black text-gray-700">合計金額</span>
                <div className="text-3xl font-black text-blue-700">
                  <span className="mr-1">¥</span>
                  <input type="number" className="w-36 text-right border-b-4 border-blue-700 outline-none" defaultValue={result.total} />
                </div>
              </div>

              {/* 保存ボタン */}
              <button 
                onClick={() => alert('保存処理（バックエンド送信）は次のステップで実装しましょう！')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95"
              >
                この内容で一括保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}