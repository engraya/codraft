'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { parseStringify } from '../utils';
import { liveblocks } from '../liveblocks';

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  const { data } = await clerkClient.users.getUserList({
    emailAddress: userIds,
  });

  const users = data.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.emailAddresses[0].emailAddress,
    avatar: user.imageUrl,
  }));

  // Preserve the original order and drop any emails that Clerk didn't return
  const sortedUsers = userIds
    .map((email) => users.find((u) => u.email === email))
    .filter((u): u is (typeof users)[number] => u !== undefined);

  return parseStringify(sortedUsers);
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  const room = await liveblocks.getRoom(roomId);

  const users = Object.keys(room.usersAccesses).filter(
    (email) => email !== currentUser
  );

  if (!text.length) return parseStringify(users);

  const query = text.toLowerCase();
  return parseStringify(
    users.filter((email) => email.toLowerCase().includes(query))
  );
};
