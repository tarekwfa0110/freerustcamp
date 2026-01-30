import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '@/components/Navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
