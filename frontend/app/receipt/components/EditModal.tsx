'use client';

import { AnalysisResult, ReceiptItem } from '../types';

type Props = {
  isOpen: boolean;
  data: AnalysisResult;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
  onUpdate: (newData: AnalysisResult) => void;
};

export default function EditModal({ isOpen, data, isSaving, onClose, onSave, onUpdate }: Props) {
  if (!isOpen) return null;

  // 店名の変更
  const handleStoreChange = (value: string) => {
    onUpdate({ ...data, store: value });
  };

  // 日付の変更
  const handleDateChange = (value: string) => {
    onUpdate({ ...data, date: value });
  };

  // 品目データの変更ハンドラ
  const handleItemChange = (index: number, field: keyof ReceiptItem, value: string | number) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[index][field] = value;
    onUpdate({ ...data, items: newItems });
  };

  // 行追加
  const handleAddItem = () => {
    onUpdate({
      ...data,
      items: [...data.items, { name: '', price: 0 }]
    });
  };

  // 行削除
  const handleDeleteItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    onUpdate({ ...data, items: newItems });
  };

  const currentTotal = data.items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* ヘッダー */}
        <div className="bg-[#ffbd59] p-6 text-white flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold">内容確認</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* コンテンツエリア（スクロール可能） */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          
          {/* 店名と日付の編集 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 pl-1">日付</label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ffbd59] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 pl-1">店名</label>
              <input
                type="text"
                value={data.store}
                onChange={(e) => handleStoreChange(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ffbd59] transition-colors"
                placeholder="店名を入力"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="text-xs font-bold text-gray-400 pl-1 mb-2 block">購入品目</label>
            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center group">
                  {/* 連番 */}
                  <span className="text-gray-400 font-bold text-sm w-6 text-center shrink-0">
                    {index + 1}
                  </span>
                  
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ffbd59] transition-colors"
                    placeholder="品名"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                    className="w-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-right focus:outline-none focus:border-[#ffbd59] transition-colors font-mono"
                    placeholder="金額"
                  />
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    {/* ゴミ箱アイコン */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddItem}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-[#ffbd59] hover:text-[#ffbd59] transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            行を追加
          </button>
        </div>

        {/* フッター */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 space-y-3">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-bold">合計</span>
            <span className="text-3xl font-bold text-[#ff914d]">¥{currentTotal.toLocaleString()}</span>
          </div>
          
          <button
            onClick={onSave}
            disabled={isSaving}
            className="w-full py-4 bg-gradient-to-r from-[#ffbd59] to-[#ff914d] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                保存中...
              </>
            ) : (
              'この内容で保存する'
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isSaving}
            className="w-full py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
          >
            キャンセルして戻る
          </button>
        </div>

      </div>
    </div>
  );
}