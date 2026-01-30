import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, Video, MessageSquare, BookOpen } from 'lucide-react';

interface ToolPanelProps {
  onOpenHelp?: () => void;
  onOpenVideo?: () => void;
  onOpenForum?: () => void;
  onOpenDocs?: () => void;
  helpUrl?: string;
  videoUrl?: string;
  forumUrl?: string;
  docsUrl?: string;
}

export function ToolPanel({
  onOpenHelp,
  onOpenVideo,
  onOpenForum,
  onOpenDocs,
  helpUrl,
  videoUrl,
  forumUrl,
  docsUrl,
}: ToolPanelProps) {
  const handleHelp = () => {
    if (onOpenHelp) {
      onOpenHelp();
    } else if (helpUrl) {
      window.open(helpUrl, '_blank');
    }
  };

  const handleVideo = () => {
    if (onOpenVideo) {
      onOpenVideo();
    } else if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  const handleForum = () => {
    if (onOpenForum) {
      onOpenForum();
    } else if (forumUrl) {
      window.open(forumUrl, '_blank');
    }
  };

  const handleDocs = () => {
    if (onOpenDocs) {
      onOpenDocs();
    } else if (docsUrl) {
      window.open(docsUrl, '_blank');
    }
  };

  return (
    <div className="border-t border-metal-600 bg-metal-800/50 px-4 py-3 flex items-center gap-2">
      {(onOpenHelp || helpUrl) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelp}
          className="h-8 px-3 gap-2 text-muted-foreground hover:text-foreground"
          aria-label="Get help"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Help</span>
        </Button>
      )}
      
      {(onOpenVideo || videoUrl) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleVideo}
          className="h-8 px-3 gap-2 text-muted-foreground hover:text-foreground"
          aria-label="Watch video"
        >
          <Video className="h-4 w-4" />
          <span className="text-sm">Video</span>
        </Button>
      )}
      
      {(onOpenForum || forumUrl) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleForum}
          className="h-8 px-3 gap-2 text-muted-foreground hover:text-foreground"
          aria-label="Open forum"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">Forum</span>
        </Button>
      )}
      
      {(onOpenDocs || docsUrl) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDocs}
          className="h-8 px-3 gap-2 text-muted-foreground hover:text-foreground"
          aria-label="Open documentation"
        >
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">Docs</span>
        </Button>
      )}
    </div>
  );
}
