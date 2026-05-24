'use client';

import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button';
import Image from 'next/image';
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
      setError(err instanceof Error ? err.message : 'Failed to create document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        onClick={addDocumentHandler}
        disabled={loading}
        className="gradient-blue flex gap-1 shadow-md disabled:opacity-60"
      >
        <Image
          src="/assets/icons/add.svg"
          alt={loading ? 'Creating…' : 'Add document'}
          width={24}
          height={24}
          className={loading ? 'animate-pulse' : ''}
        />
        <p className="hidden sm:block">{loading ? 'Creating…' : 'Start a blank document'}</p>
      </Button>
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default AddDocumentBtn;
