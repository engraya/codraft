'use client';

import Image from 'next/image';
import { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';
import { removeCollaborator, updateDocumentAccess } from '@/lib/actions/room.actions';

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {
  const [userType, setUserType] = useState<UserType>(collaborator.userType ?? 'viewer');
  const [loading, setLoading]  = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);
    try {
      await updateDocumentAccess({ roomId, email, userType: type as UserType, updatedBy: user });
    } catch (error) {
      console.error('Failed to update access:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);
    try {
      await removeCollaborator({ roomId, email });
    } catch (error) {
      console.error('Failed to remove collaborator:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="flex items-center justify-between gap-3 py-3">
      {/* Avatar + name */}
      <div className="flex min-w-0 items-center gap-2.5">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={32}
          height={32}
          className="size-8 rounded-full ring-2 ring-dark-400 shrink-0"
        />
        <div className="min-w-0">
          <p className="line-clamp-1 text-sm font-medium text-[#F4F4F5]">
            {collaborator.name}
            {loading && (
              <span className="ml-1.5 text-xs font-normal text-[#71717A]">
                updating…
              </span>
            )}
          </p>
          <p className="line-clamp-1 text-xs text-[#71717A]">{collaborator.email}</p>
        </div>
      </div>

      {/* Role / actions */}
      {creatorId === collaborator.id ? (
        <span className="shrink-0 rounded-md bg-dark-400 px-2 py-0.5 text-xs font-medium text-[#71717A]">
          Owner
        </span>
      ) : (
        <div className="flex shrink-0 items-center gap-1">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="rounded-lg px-2 py-1 text-xs font-medium text-[#71717A]
                       transition-colors hover:bg-red-500/10 hover:text-red-400
                       disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
