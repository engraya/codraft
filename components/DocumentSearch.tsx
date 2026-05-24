'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState, useTransition } from 'react';

type Props = {
  initialQ?: string;
  initialSort?: string;
};

export default function DocumentSearch({ initialQ = '', initialSort = 'updated' }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);
  const [sort, setSort] = useState(initialSort);
  const [, startTransition] = useTransition();

  const navigate = (newQ: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newQ) params.set('q', newQ);
    if (newSort !== 'updated') params.set('sort', newSort);
    startTransition(() => {
      router.replace(params.toString() ? `/?${params}` : '/');
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pb-2">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/50"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            navigate(e.target.value, sort);
          }}
          placeholder="Search documents…"
          className="h-9 w-56 rounded-md bg-dark-400 pl-9 pr-3 text-sm text-white placeholder:text-blue-100/40 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          navigate(q, e.target.value);
        }}
        className="h-9 rounded-md bg-dark-400 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="updated">Last edited</option>
        <option value="created">Date created</option>
      </select>
    </div>
  );
}
