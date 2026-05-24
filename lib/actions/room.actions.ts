'use server';

import { nanoid } from 'nanoid';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';
import { redirect } from 'next/navigation';

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  const metadata: RoomMetadata = {
    creatorId: userId,
    email,
    title: 'Untitled',
  };

  const usersAccesses: RoomAccesses = {
    [email]: ['room:write'],
  };

  const room = await liveblocks.createRoom(roomId, {
    metadata,
    usersAccesses,
    defaultAccesses: [],
  });

  revalidatePath('/');
  return parseStringify(room);
};

export const getDocument = async ({
  roomId,
  userEmail,
}: {
  roomId: string;
  userEmail: string;
}) => {
  const room = await liveblocks.getRoom(roomId);

  const hasAccess = Object.keys(room.usersAccesses).includes(userEmail);
  if (!hasAccess) {
    throw new Error('You do not have access to this document');
  }

  return parseStringify(room);
};

export const updateDocument = async (roomId: string, title: string) => {
  const updatedRoom = await liveblocks.updateRoom(roomId, {
    metadata: { title },
  });

  revalidatePath(`/documents/${roomId}`);
  return parseStringify(updatedRoom);
};

export const getDocuments = async (email: string) => {
  const rooms = await liveblocks.getRooms({ userId: email });
  return parseStringify(rooms);
};

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  const usersAccesses: RoomAccesses = {
    [email]: getAccessType(userType) as AccessType,
  };

  const room = await liveblocks.updateRoom(roomId, { usersAccesses });

  const notificationId = nanoid();
  await liveblocks.triggerInboxNotification({
    userId: email,
    kind: '$documentAccess',
    subjectId: notificationId,
    activityData: {
      userType,
      title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
      updatedBy: updatedBy.name,
      avatar: updatedBy.avatar,
      email: updatedBy.email,
    },
    roomId,
  });

  revalidatePath(`/documents/${roomId}`);
  return parseStringify(room);
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  const room = await liveblocks.getRoom(roomId);

  if (room.metadata.email === email) {
    throw new Error('You cannot remove the document owner');
  }

  const updatedRoom = await liveblocks.updateRoom(roomId, {
    usersAccesses: { [email]: null },
  });

  revalidatePath(`/documents/${roomId}`);
  return parseStringify(updatedRoom);
};

export const deleteDocument = async (roomId: string) => {
  await liveblocks.deleteRoom(roomId);
  revalidatePath('/');
  redirect('/');
};
