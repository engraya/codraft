'use client';

import { createDocument } from '@/lib/actions/room.actions';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(id);
  }, [error]);

  const addDocumentHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={addDocumentHandler}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3.5 py-2 text-sm font-medium text-white
                   transition-all duration-150 hover:bg-blue-400 active:scale-[0.98]
                   disabled:opacity-50 disabled:pointer-events-none shadow-sm"
      >
        <Plus
          className={`size-4 shrink-0 ${loading ? 'animate-spin' : ''}`}
          strokeWidth={2.5}
        />
        <span className="hidden sm:block">
          {loading ? 'Creating…' : 'New document'}
        </span>
      </button>

      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default AddDocumentBtn;
