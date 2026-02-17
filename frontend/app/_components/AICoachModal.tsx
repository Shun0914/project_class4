// frontend/app/_components/AICoachModal.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { get } from '@/lib/api/client';
import type { AIAnalyzeResponse } from '@/lib/types/analyze';

interface AICoachModalProps {
  isOpen: boolean;      // モーダルの開閉状態
  onClose: () => void;  // 閉じるボタン押下時の処理
  coachMode: 'angel' | 'demon'; // ユーザー設定のコーチモード（アイコン切り替え用）
}

/**
 * AIコーチによる支出分析を表示する共通モーダルコンポーネント
 * ホーム画面とダッシュボードの両方で使用されます。
 */
export function AICoachModal({ isOpen, onClose, coachMode }: AICoachModalProps) {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null); // AIからの回答テキスト
  const [isAnalyzing, setIsAnalyzing] = useState(false);            // ローディング状態

  // AI分析APIを呼び出すハンドラー
  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await get<AIAnalyzeResponse>(`/api/ai-analyze`);
      setAiAnalysis(response.ai_message);
    } catch (error) {
      console.error('AI分析エラー:', error);
      // バックエンドからのエラーメッセージに基づき、ユーザー向けメッセージを分岐
      if (error instanceof Error && error.message.includes('予算が設定されていません')) {
        setAiAnalysis('予算が設定されていません。先に予算を設定してください。');
      } else {
        setAiAnalysis('AI分析の取得に失敗しました。');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // isOpenがfalseの場合は何も描画しない
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 背景オーバーレイ（クリックで閉じる） */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={onClose}
      />
      
      {/* モーダルコンテンツ（下からせり上がるアニメーション用スタイル） */}
      <div className="relative bg-white rounded-t-[24px] w-full max-w-[390px] shadow-lg overflow-hidden">
        {/* ヘッダーエリア */}
        <div className="flex items-center justify-center px-[16px] py-[20px] w-full border-b border-[#e2e9f2] relative">
          <h2 className="font-bold text-[#2a3449] text-[20px]">AIコーチ分析</h2>
          <button
            onClick={onClose}
            className="absolute right-[16px] flex items-center justify-center size-[40px] rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <span className="text-[#7C7A78] text-[24px]">×</span>
          </button>
        </div>

        {/* メインコンテンツエリア */}
        <div className="px-[16px] py-[24px] flex flex-col gap-[20px]">
          <h3 className="font-bold text-[16px] text-[#2a3449]">今月の分析</h3>
          
          {aiAnalysis ? (
            /* 分析完了後の表示：マークダウン形式でレンダリング */
            <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] max-h-[400px] overflow-y-auto prose prose-sm max-w-none">
              <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
            </div>
          ) : isAnalyzing ? (
            /* ローディング中：スピナーを表示 */
            <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] min-h-[200px] flex items-center justify-center">
              <div className="animate-spin size-[40px] border-4 border-[#eb6b15] border-t-transparent rounded-full" />
            </div>
          ) : (
            /* 初期表示：分析開始ボタンを表示 */
            <div className="flex flex-col items-center gap-[16px]">
              <div className="bg-[#f7f6f5] rounded-[16px] px-[16px] py-[20px] min-h-[120px] flex items-center justify-center w-full">
                <p className="text-[16px] text-[#6a7282] text-center">分析開始ボタンを押してください</p>
              </div>
              <button
                onClick={handleStartAnalysis}
                className="w-full bg-gradient-to-r from-[#f5a047] to-[#f7b563] text-white py-[14px] rounded-[8px] font-bold text-[16px] hover:from-[#e08f36] hover:to-[#e6a552] transition-colors flex items-center justify-center gap-[8px]"
              >
                {/* ユーザー設定に応じた天使/鬼アイコンを表示 */}
                <Image
                  src={coachMode === 'angel' ? '/angel.svg' : '/demon.svg'}
                  alt={coachMode === 'angel' ? '天使' : '鬼'}
                  width={24}
                  height={24}
                />
                分析開始
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}