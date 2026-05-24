'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { Editor } from '@/components/editor/Editor';
import Header from '@/components/Header';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import ActiveCollaborators from './ActiveCollaborators';
import { Input } from './ui/input';
import Loader from './Loader';
import ShareModal from './ShareModal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Pencil, CheckCircle2 } from 'lucide-react';

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
            {/* ── Document title (center) ── */}
            <div
              ref={containerRef}
              className="flex flex-1 items-center justify-center gap-2 px-2"
            >
              {editing && !saving ? (
                <Input
                  type="text"
                  value={title}
                  ref={inputRef}
                  placeholder="Untitled"
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="document-title-input max-w-xs"
                  autoFocus
                />
              ) : (
                <p className="document-title line-clamp-1 max-w-xs">{title || 'Untitled'}</p>
              )}

              {/* Edit title button (owner/editor only) */}
              {currentUserType === 'editor' && !editing && (
                <button
                  aria-label="Edit document title"
                  onClick={() => setEditing(true)}
                  className="flex size-6 items-center justify-center rounded-md text-[#52525B]
                             transition-all hover:bg-dark-400 hover:text-[#A1A1AA]"
                >
                  <Pencil className="size-3" strokeWidth={2} />
                </button>
              )}

              {/* View-only badge */}
              {currentUserType !== 'editor' && !editing && (
                <span className="view-only-tag">View only</span>
              )}

              {/* Auto-save indicator */}
              {saving && (
                <span
                  aria-live="polite"
                  className="flex items-center gap-1 text-xs text-[#52525B]"
                >
                  <CheckCircle2 className="size-3 text-emerald-500 animate-pulse" />
                  Saving…
                </span>
              )}
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2 shrink-0">
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
