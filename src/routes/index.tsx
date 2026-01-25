import { createFileRoute } from '@tanstack/react-router';
import { sections } from '@/data/challenges';
import { BookOpen, Clock, Target } from 'lucide-react';

// @ts-expect-error - TanStack Router file-based routing types
export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Welcome to FreeRustCamp
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Learn Rust through hands-on, project-based learning. Take your skills from
          "finished the Rust book" to "job-ready Rust developer" with our comprehensive
          350-450 hour curriculum.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <BookOpen className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Learn by Building</h3>
            <p className="text-gray-400">
              Every concept is learned through hands-on challenges and real projects.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Target className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Immediate Feedback</h3>
            <p className="text-gray-400">
              Automated tests provide instant validation of your solutions.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Clock className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Portfolio Ready</h3>
            <p className="text-gray-400">
              Build projects suitable for your GitHub and resume.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Curriculum Sections</h2>
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      Section {section.id}: {section.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{section.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{section.challenges.length} challenges</span>
                      <span>•</span>
                      <span>{section.estimated_hours} hours</span>
                    </div>
                  </div>
                  <a
                    href={`/challenges/${section.id}`}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                  >
                    Start
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
          <p className="text-gray-400 mb-4">
            Begin with Section 1: Fundamentals & CLI Tools. You'll learn Rust syntax,
            ownership, and build your first command-line applications.
          </p>
          <a
            href="/challenges/1"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            Start Learning
          </a>
        </div>
      </div>
    </div>
  );
}
