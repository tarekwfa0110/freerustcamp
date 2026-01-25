import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="border-b border-gray-800 bg-gray-950">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-orange-500">
                FreeRustCamp
              </a>
              <div className="flex gap-4">
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition"
                >
                  Home
                </a>
                <a
                  href="/challenges"
                  className="text-gray-300 hover:text-white transition"
                >
                  Challenges
                </a>
                <a
                  href="/progress"
                  className="text-gray-300 hover:text-white transition"
                >
                  Progress
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
