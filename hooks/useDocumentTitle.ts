'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { updateDocument } from '@/lib/actions/room.actions';

export function useDocumentTitle(roomId: string, initialTitle: string) {
  const [title, setTitle] = useState(initialTitle);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track the committed title separately so the click-outside save
  // only fires when there is an actual change.
  const committedTitleRef = useRef(initialTitle);

  const save = useCallback(
    async (newTitle: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed || trimmed === committedTitleRef.current) return;
      setSaving(true);
      try {
        await updateDocument(roomId, trimmed);
        committedTitleRef.current = trimmed;
      } catch (error) {
        console.error('Failed to save title:', error);
        // Revert optimistic UI on failure
        setTitle(committedTitleRef.current);
      } finally {
        setSaving(false);
      }
    },
    [roomId]
  );

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setEditing(false);
        await save(title);
      }
      if (e.key === 'Escape') {
        setTitle(committedTitleRef.current);
        setEditing(false);
      }
    },
    [title, save]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        save(title);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, save]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return {
    title,
    setTitle,
    editing,
    setEditing,
    saving,
    containerRef,
    inputRef,
    handleKeyDown,
  };
}
