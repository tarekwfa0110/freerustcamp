import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, ExternalLink } from 'lucide-react';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  content?: React.ReactNode;
  helpUrl?: string;
  videoUrl?: string;
  forumUrl?: string;
  docsUrl?: string;
}

export function HelpModal({
  open,
  onOpenChange,
  title = 'Get Help',
  content,
  helpUrl,
  videoUrl,
  forumUrl,
  docsUrl,
}: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <img src="/cuddlyferris.svg" alt="" className="h-8 w-8 shrink-0 object-contain" aria-hidden />
            <HelpCircle className="h-6 w-6 text-rust-400 shrink-0" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          {content && (
            <DialogDescription className="text-base pt-2">
              {content}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {helpUrl && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(helpUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Help Documentation
            </Button>
          )}
          
          {videoUrl && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(videoUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Watch Video Tutorial
            </Button>
          )}
          
          {forumUrl && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(forumUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ask on Forum
            </Button>
          )}
          
          {docsUrl && (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(docsUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Rust Documentation
            </Button>
          )}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
