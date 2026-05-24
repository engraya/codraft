'use client';

import { useState } from 'react';
import { deleteDocument } from '@/lib/actions/room.actions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);
    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Delete document"
          className="inline-flex size-8 items-center justify-center rounded-lg
                     text-[#71717A] transition-all duration-100
                     hover:bg-red-500/10 hover:text-red-400
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
        >
          <Trash2 className="size-3.5" strokeWidth={1.75} />
        </button>
      </DialogTrigger>

      <DialogContent className="shad-dialog">
        <DialogHeader className="gap-3">
          {/* Icon */}
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
            <Trash2 className="size-5 text-red-400" strokeWidth={1.75} />
          </div>

          <div>
            <DialogTitle className="text-base font-semibold text-[#F4F4F5]">
              Delete document
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-[#71717A]">
              This action is permanent and cannot be undone. All collaborators
              will lose access immediately.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-2 sm:gap-2">
          <DialogClose asChild>
            <button className="flex-1 rounded-lg border border-dark-500 bg-dark-300 px-4 py-2
                               text-sm font-medium text-[#A1A1AA] transition-colors
                               hover:bg-dark-400 hover:text-[#F4F4F5]">
              Cancel
            </button>
          </DialogClose>

          <button
            onClick={deleteDocumentHandler}
            disabled={loading}
            className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white
                       transition-all hover:bg-red-400 active:scale-[0.98]
                       disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
