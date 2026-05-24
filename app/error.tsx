'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-dark-100 p-8 text-white">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-center text-blue-100">
        {error.message || 'An unexpected error occurred.'}
        {error.digest && (
          <span className="mt-2 block text-xs text-blue-100/60">Reference: {error.digest}</span>
        )}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-md bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md bg-dark-400 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-dark-300"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
