'use client';

import { useRouter } from 'next/navigation';
import { Search, ArrowUpDown } from 'lucide-react';
import { useState, useTransition } from 'react';

type Props = {
  initialQ?: string;
  initialSort?: string;
};

export default function DocumentSearch({ initialQ = '', initialSort = 'updated' }: Props) {
  const router = useRouter();
  const [q, setQ]       = useState(initialQ);
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
    <div className="flex w-full max-w-[860px] flex-wrap items-center gap-2">
      {/* Search input */}
      <div className="relative">
        <Search
          className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#52525B]"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); navigate(e.target.value, sort); }}
          placeholder="Search documents…"
          className="h-8 w-52 rounded-lg border border-dark-500 bg-dark-300 pl-8 pr-3
                     text-sm text-[#F4F4F5] placeholder:text-[#52525B]
                     focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15
                     transition-all duration-150"
        />
      </div>

      {/* Sort selector */}
      <div className="relative flex items-center">
        <ArrowUpDown
          className="pointer-events-none absolute left-2.5 size-3 text-[#52525B]"
          aria-hidden
        />
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); navigate(q, e.target.value); }}
          className="h-8 appearance-none rounded-lg border border-dark-500 bg-dark-300 pl-7 pr-3
                     text-sm text-[#A1A1AA] focus:outline-none focus:border-blue-500/60
                     focus:ring-2 focus:ring-blue-500/15 transition-all duration-150 cursor-pointer"
        >
          <option value="updated">Last edited</option>
          <option value="created">Date created</option>
        </select>
      </div>
    </div>
  );
}
