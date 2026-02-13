'use client';

type Props = {
  message: string | null;
  kind?: 'success' | 'error';
  onClose?: () => void;
};

export function Snackbar({ message, kind = 'success', onClose }: Props) {
  if (!message) return null;

  const base =
    'fixed left-1/2 bottom-24 z-[60] -translate-x-1/2 rounded-md px-4 py-3 text-sm shadow-lg';
  const color = kind === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white';

  return (
    <div role="status" className={base + ' ' + color} onClick={onClose}>
      {message}
    </div>
  );
}
