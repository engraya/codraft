'use client';

import Image from 'next/image';
import { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';
import { Button } from './ui/button';
import { removeCollaborator, updateDocumentAccess } from '@/lib/actions/room.actions';

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {
  const [userType, setUserType] = useState<UserType>(collaborator.userType ?? 'viewer');
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);
    try {
      await updateDocumentAccess({
        roomId,
        email,
        userType: type as UserType,
        updatedBy: user,
      });
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
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            {loading && (
              <span className="text-10-regular pl-2 text-blue-100">
                updating…
              </span>
            )}
          </p>
          <p className="text-sm font-light text-blue-100">{collaborator.email}</p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">Owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            disabled={loading}
            className="remove-btn"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
