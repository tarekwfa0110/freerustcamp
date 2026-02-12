import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/certificates')({
  component: CertificatesPage,
});

/**
 * Renders the Certificates page with a heading and a placeholder message.
 *
 * @returns The page's JSX content containing a container with the title "Certificates" and a subtitle indicating tracking will appear soon.
 */
function CertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-2">Certificates</h1>
      <p className="font-body text-muted-foreground">Certificate tracking will appear here soon.</p>
    </div>
  );
}