'use client';

import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import { ReactNode, useCallback } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  const resolveUsers = useCallback(
    async ({ userIds }: { userIds: string[] }) => {
      return await getClerkUsers({ userIds });
    },
    []
  );

  const resolveMentionSuggestions = useCallback(
    async ({ text, roomId }: { text: string; roomId: string }) => {
      const currentUser = clerkUser?.emailAddresses[0]?.emailAddress;
      if (!currentUser) return [];

      return await getDocumentUsers({ roomId, currentUser, text });
    },
    [clerkUser]
  );

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
