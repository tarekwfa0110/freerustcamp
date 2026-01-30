import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  LayoutDashboard, 
  User, 
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Curriculum", href: "/challenges", icon: BookOpen },
  { name: "Dashboard", href: "/progress", icon: LayoutDashboard },
  { name: "Certificates", href: "/certificates", icon: Award },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouterState();
  const location = router.location;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/rustacean-flat-noshadow.svg" alt="" className="h-9 w-9 object-contain" aria-hidden />
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              Free<span className="text-gradient-rust">Rust</span>Camp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 font-body text-sm font-medium transition-colors",
                    isActive
                      ? "bg-rust-500/20 text-rust-200"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-rust text-sm font-bold text-primary-foreground">
              L
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-3 font-body text-sm font-medium transition-colors",
                      isActive
                        ? "bg-rust-500/20 text-rust-200"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
