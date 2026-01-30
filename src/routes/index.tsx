import { createFileRoute, Link } from '@tanstack/react-router';
import { sections } from '@/data/challenges';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/StatCard';
import {
  ArrowRight,
  BookOpen,
  Code2,
  Trophy,
  Zap,
  Clock,
  Users,
  CheckCircle2,
  Terminal,
  Cpu,
  Globe,
  Rocket,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

const stats = [
  { icon: Clock, label: 'Hours of Content', value: '410+' },
  { icon: BookOpen, label: 'Challenges', value: '200+' },
  { icon: Code2, label: 'Practice Projects', value: '25' },
  { icon: Trophy, label: 'Certifications', value: '5' },
];

const sectionIcons = [Terminal, Cpu, Zap, Globe, Rocket];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(18_82%_45%/0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Hero mascot */}
            <img
              src="/rustacean-flat-happy.svg"
              alt=""
              className="mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 opacity-90"
              aria-hidden
            />
            {/* Badge */}
            <Badge variant="outline" className="mb-6 border-rust-500/50 px-4 py-1.5">
              <Zap className="mr-2 h-3 w-3 text-rust-300" />
              <span className="text-rust-200">100% Free • Open Source</span>
            </Badge>

            {/* Title */}
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn{' '}
              <span className="text-gradient-rust">Rust</span>
              <br />
              The Hard Way
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg text-muted-foreground sm:text-xl">
              Master systems programming through hands-on challenges, practice projects,
              and real-world applications. No prior experience required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/challenges">
                <Button variant="hero" size="xl">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/challenges">
                <Button variant="outline" size="xl">
                  Browse Curriculum
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-rust-400" />
                <span className="font-body">50,000+ Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-body">10,000+ Completions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-metal-700 bg-metal-800/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
              Comprehensive <span className="text-gradient-rust">Curriculum</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
              Five complete sections taking you from zero to Rust professional.
              Each section includes challenges, practice projects, and a certification project.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = sectionIcons[index] || Terminal;
              return (
                <div
                  key={section.id}
                  className="group relative overflow-hidden rounded-xl border border-metal-600 bg-gradient-card p-6 transition-all duration-300 hover:border-rust-500/50 hover:shadow-rust"
                >
                  {/* Section number */}
                  <div className="absolute -right-4 -top-4 font-display text-8xl font-bold text-metal-700/50">
                    {index + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-rust-500/20">
                      <Icon className="h-6 w-6 text-rust-300" />
                    </div>
                    <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mb-4 font-body text-sm text-muted-foreground">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-4 font-body text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {section.estimated_hours} hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Code2 className="h-3 w-3" />
                        {section.challenges.length} challenges
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/challenges">
              <Button variant="outline" size="lg">
                View Full Curriculum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-metal-700 bg-metal-800/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
              Why <span className="text-gradient-rust">FreeRustCamp?</span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-rust shadow-rust">
                <Terminal className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                Learn by Doing
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Hands-on challenges and projects that reinforce concepts through practice
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-rust shadow-rust">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                Instant Feedback
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Run code in the browser and get immediate test results as you learn
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-rust shadow-rust">
                <Trophy className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                Earn Certificates
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Complete certification projects to earn verifiable credentials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-metal-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <img src="/rustacean-flat-noshadow.svg" alt="" className="h-6 w-6 object-contain" aria-hidden />
              <span className="font-display text-sm font-bold text-foreground">
                FreeRustCamp
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              © 2024 FreeRustCamp. Open source under MIT License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
