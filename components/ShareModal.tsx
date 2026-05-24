'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSelf } from '@liveblocks/react/suspense';
import { useState } from 'react';
import { Input } from './ui/input';
import UserTypeSelector from './UserTypeSelector';
import Collaborator from './Collaborator';
import { updateDocumentAccess } from '@/lib/actions/room.actions';
import { UserPlus, Share2 } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [email, setEmail]       = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');
  const [error, setError]       = useState('');

  const shareDocumentHandler = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await updateDocumentAccess({ roomId, email, userType, updatedBy: user.info });
      setEmail('');
    } catch (err) {
      console.error('Failed to share:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          disabled={currentUserType !== 'editor'}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dark-500 bg-dark-300
                     px-3 py-1.5 text-sm font-medium text-[#A1A1AA]
                     transition-all duration-150 hover:bg-dark-400 hover:text-[#F4F4F5]
                     disabled:opacity-40 disabled:pointer-events-none"
        >
          <Share2 className="size-3.5 shrink-0" strokeWidth={2} />
          <span className="hidden sm:block">Share</span>
        </button>
      </DialogTrigger>

      <DialogContent className="shad-dialog">
        <DialogHeader className="gap-1">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 mb-1">
            <UserPlus className="size-4.5 text-blue-400" strokeWidth={1.75} />
          </div>
          <DialogTitle className="text-base font-semibold text-[#F4F4F5]">
            Share document
          </DialogTitle>
          <DialogDescription className="text-sm text-[#71717A]">
            Invite people by email. They&apos;ll get access immediately.
          </DialogDescription>
        </DialogHeader>

        {/* Invite row */}
        <div className="mt-5 space-y-2">
          <label htmlFor="share-email" className="text-xs font-medium text-[#A1A1AA]">
            Email address
          </label>

          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center rounded-lg border border-dark-500 bg-dark-300
                            focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/15
                            transition-all duration-150 overflow-hidden">
              <Input
                id="share-email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && shareDocumentHandler()}
                className="share-input"
              />
              <div className="border-l border-dark-500 px-1">
                <UserTypeSelector userType={userType} setUserType={setUserType} />
              </div>
            </div>

            <button
              type="submit"
              onClick={shareDocumentHandler}
              disabled={loading || !email.trim()}
              className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white
                         transition-all hover:bg-blue-400 active:scale-[0.98]
                         disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? 'Sending…' : 'Invite'}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400" role="alert">{error}</p>
          )}
        </div>

        {/* Collaborators */}
        {collaborators.length > 0 && (
          <div className="mt-5 space-y-1">
            <p className="mb-3 text-xs font-medium text-[#71717A] uppercase tracking-wider">
              People with access
            </p>
            <ul className="divide-y divide-dark-400">
              {collaborators.map((collaborator) => (
                <Collaborator
                  key={collaborator.id}
                  roomId={roomId}
                  creatorId={creatorId}
                  email={collaborator.email}
                  collaborator={collaborator}
                  user={user.info}
                />
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
