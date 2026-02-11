import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/certificates')({
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Certificates</h1>
      <p className="text-muted-foreground">Certificate tracking will appear here soon.</p>
    </div>
  );
}
