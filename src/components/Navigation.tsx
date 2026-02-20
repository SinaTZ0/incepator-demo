import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// Only include links for sections actually rendered in App.tsx
const navLinks = [
  { label: "تیم‌ها", href: "#stationed-teams" },
  { label: "رویدادها", href: "#events" },
  { label: "موفقیت‌ها", href: "#success-stories" },
  { label: "تماس", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0].href);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateIndicator = useCallback(() => {
    const container = navContainerRef.current;
    if (!container) return;
    const activeLink = container.querySelector(`a[href="${activeHref}"]`) as HTMLElement | null;
    if (activeLink) {
      const left = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;
      setIndicator({ left, width, visible: true });
    } else {
      setIndicator((s) => ({ ...s, visible: false }));
    }
  }, [activeHref]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const options = { root: null, rootMargin: "0px 0px -50% 0px", threshold: [0, 0.5, 1] };

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHref(link.href);
            }
          });
        }, options);
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveHref(href);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between md:justify-start gap-20">
          <a href="#" className="text-lg font-display font-semibold text-text-primary">
            مرکز نوآوری
          </a>

          {/* Desktop Nav */}
          <div ref={navContainerRef} className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm transition-colors ${activeHref === link.href ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
              >
                {link.label}
              </a>
            ))}

            {/* Active indicator */}
            <span
              className="absolute -bottom-1 h-0.5 bg-white rounded transition-all duration-300"
              style={{
                left: indicator.visible ? `${indicator.left}px` : "0px",
                width: indicator.visible ? `${indicator.width}px` : "0px",
                opacity: indicator.visible ? 1 : 0,
              }}
            />
          </div>

          {/* Theme Toggle (desktop) */}
          <div className="hidden md:flex items-center mr-auto">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 glass-button flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Static Logo + Theme toggle (visible when not scrolled) */}
      <div
        className={`fixed top-6 right-6 z-[200] transition-opacity duration-500 flex items-center gap-4 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="text-lg font-display font-semibold text-text-primary">مرکز نوآوری</span>
        <ThemeToggle />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[190] transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-dark-base/90 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-display text-text-primary hover:text-indigo transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Theme Toggle */}
          <div
            style={{
              transitionDelay: isMobileMenuOpen ? "280ms" : "0ms",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            className="transition-all duration-300"
          >
            <ThemeToggle />
          </div>
          <button
            className="primary-button mt-4 px-8 py-4 text-white font-medium"
            style={{
              transitionDelay: isMobileMenuOpen ? "340ms" : "0ms",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            درخواست منتورشیپ
          </button>
        </div>
      </div>
    </>
  );
}
