import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CompletionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message?: string;
  onContinue?: () => void;
  onClose?: () => void;
}

export function CompletionModal({
  open,
  onOpenChange,
  title,
  message,
  onContinue,
  onClose,
}: CompletionModalProps) {
  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    onOpenChange(false);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-green-500/20 p-2 flex items-center justify-center">
              <img src="/rustacean-flat-happy.svg" alt="" className="h-8 w-8 object-contain" aria-hidden />
            </div>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </div>
          {message && (
            <DialogDescription className="text-base pt-2">
              {message}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          {onContinue && (
            <Button onClick={handleContinue}>
              Continue
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
