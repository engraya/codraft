'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { Editor } from '@/components/editor/Editor';
import Header from '@/components/Header';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import ActiveCollaborators from './ActiveCollaborators';
import { Input } from './ui/input';
import Image from 'next/image';
import Loader from './Loader';
import ShareModal from './ShareModal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const {
    title,
    setTitle,
    editing,
    setEditing,
    saving,
    containerRef,
    inputRef,
    handleKeyDown,
  } = useDocumentTitle(roomId, roomMetadata.title);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !saving ? (
                <Input
                  type="text"
                  value={title}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="document-title-input"
                />
              ) : (
                <p className="document-title">{title}</p>
              )}

              {currentUserType === 'editor' && !editing && (
                <button
                  aria-label="Edit document title"
                  onClick={() => setEditing(true)}
                  className="pointer"
                >
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </button>
              )}

              {currentUserType !== 'editor' && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {saving && (
                <p className="text-sm text-gray-400" aria-live="polite">
                  saving…
                </p>
              )}
            </div>

            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
