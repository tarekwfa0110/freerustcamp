import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProjectPreview } from '@/types/challenge';

interface ProjectPreviewModalProps {
  preview: ProjectPreview;
  open: boolean;
  onClose: () => void;
}

export function ProjectPreviewModal({ preview, open, onClose }: ProjectPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {preview.title}
          </DialogTitle>
          {preview.description && (
            <DialogDescription className="text-base text-muted-foreground mt-2">
              {preview.description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {preview.example_output && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Example Output:
            </h3>
            <pre className="bg-metal-900 border border-metal-700 rounded-lg p-4 overflow-x-auto font-mono text-sm text-foreground whitespace-pre-wrap">
              {preview.example_output}
            </pre>
          </div>
        )}
        
        <DialogFooter className="mt-6">
          <Button onClick={onClose} size="lg" className="w-full sm:w-auto">
            Start coding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
