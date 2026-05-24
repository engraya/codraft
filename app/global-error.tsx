'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-dark-100 p-8 text-white">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="max-w-md text-center text-blue-100">
          An unexpected error occurred. Our team has been notified.
          {error.digest && (
            <span className="mt-2 block text-xs text-blue-100/60">
              Reference: {error.digest}
            </span>
          )}
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
