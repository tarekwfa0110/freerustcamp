import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

/**
 * Renders the Profile page placeholder with a heading and a notice that settings are coming soon.
 *
 * @returns The JSX element for the Profile page.
 */
function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Profile</h1>
      <p className="text-muted-foreground">Profile settings are coming soon.</p>
    </div>
  );
}