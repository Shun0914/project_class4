'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { AnalysisResult } from './types';
import CameraUpload from './components/CameraUpload';
import EditModal from './components/EditModal';

export default function ReceiptPage() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // input要素への参照を作成
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 画面遷移時に自動でファイル選択（カメラ）を起動する
  useEffect(() => {
    const timer = setTimeout(() => {
      if (fileInputRef.current && !image && !loading && !result) {
        fileInputRef.current.click();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 解析API呼び出し
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

      if (!response.ok) throw new Error('解析失敗');

      // バックエンドから直接データが返ってくる想定でシンプルに受け取る
      const data: AnalysisResult = await response.json();
      setResult(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert('レシートの解析に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  // 保存処理
  const handleSave = async () => {
    if (!result) return;
    setSaving(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('ログインしてください。');
      setSaving(false);
      return;
    }

    try {
      const savePromises = result.items.map(async (item) => {
        if (!item.name || item.price === 0) return;
        
        // user_idはバックエンド側でトークンから取得するため不要です
        const expenseData = {
          expense_date: result.date,
          store: result.store, 
          item: item.name,
          price: Number(item.price),
          category_id: 1, // 仮のカテゴリID
        };

        const res = await fetch('http://localhost:8000/expenses', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(expenseData),
        });

        if (!res.ok) throw new Error('保存失敗');
      });

      await Promise.all(savePromises);
      alert('すべての明細を保存しました！');
      
      // 保存成功後、モーダルを閉じてホーム画面に戻る
      setIsModalOpen(false);
      router.push('/'); // ← ホーム画面へ自動遷移
      
    } catch (error) {
      console.error(error);
      alert('保存に失敗しました。ログイン状態を確認してください。');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#fdfaf5] p-4 pb-20 text-gray-800">
      <div className="max-w-md mx-auto pt-6">
        
        {/* ヘッダー部分（戻るボタンあり） */}
        <div className="relative flex items-center justify-center mb-8">
          <Link 
            href="/" 
            className="absolute left-0 p-2 text-gray-500 hover:text-[#ff914d] transition-colors rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">レシート入力</h1>
        </div>

        <CameraUpload 
          onFileSelect={setImage} 
          isLoading={loading} 
          imageName={image?.name || null}
          fileInputRef={fileInputRef}
        />

        <button
          onClick={handleUpload}
          disabled={!image || loading}
          className="w-full mt-8 bg-gradient-to-r from-[#ffbd59] to-[#ff914d] hover:opacity-95 text-white text-xl font-bold py-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'AIが解析中...' : '読み取る'}
        </button>

        {/* 編集モーダル */}
        {result && (
          <EditModal
            isOpen={isModalOpen}
            data={result}
            isSaving={saving}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            onUpdate={setResult}
          />
        )}
      </div>
    </div>
  );
}