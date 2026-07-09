import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/solar-calculator", label: "Solar Sizing" },
    { to: "/battery-calculator", label: "Battery Storage" },
    { to: "/pump-sizing", label: "Pump Calculator" },
    { to: "/gate-sizing", label: "Gate Calculator" },
    { to: "/payback-calculator", label: "Payback ROI" },
  ];
  
  const footerLinks = [
    { to: "/faq", label: "FAQ" },
    { to: "/assumptions", label: "Assumptions" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-slate-200">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rounded">
            <div className="w-4 h-1 bg-yellow-400 rotate-45 translate-x-0.5"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 underline underline-offset-4 decoration-yellow-500">SOLAR</span>
          <span className="text-sm font-medium text-slate-400 ml-1 hidden sm:inline-block">| RuralOpsTools</span>
        </Link>
          
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  isActive 
                    ? "text-sm font-semibold text-slate-900 border-b-2 border-slate-900 pb-1"
                    : "text-sm font-medium text-slate-500 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {[...navLinks, ...footerLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-base font-medium",
                  location.pathname === link.to ? "text-slate-900 font-bold" : "text-slate-600"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1 w-full mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
        <Outlet />
      </main>

      <footer className="py-3 sm:py-0 sm:h-10 bg-slate-200 border-t border-slate-300 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-2 sm:gap-0">
        <div className="text-[10px] text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} RuralOpsTools
        </div>
        <div className="flex gap-4 items-center">
          {footerLinks.map((link) => (
             <Link
                key={link.to}
                to={link.to}
                className="text-[10px] text-slate-500 hover:text-slate-900 font-bold uppercase tracking-wider"
             >
               {link.label}
             </Link>
          ))}
          <span className="hidden sm:inline-block text-[10px] text-slate-300">|</span>
          <span className="hidden sm:flex text-[10px] text-slate-500 items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Live
          </span>
        </div>
      </footer>
    </div>
  );
}
