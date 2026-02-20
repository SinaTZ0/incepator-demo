import React, { useRef, useEffect } from "react";
import MagneticButton from "../components/MagneticButton";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowDownLeft, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "../lib/utils";

// --- Types / constants ---
type Variant = "default" | "accent" | "glass";

interface VariantStyle {
  container: string;
  text: string;
  subText: string;
  dotColors: string[];
}

const defaultVariantClasses: Record<Variant, VariantStyle> = {
  default: {
    // card background on light theme, falls back to text-background in dark mode via CSS vars
    container: "bg-card border-gray-200 stat-item glass-card",
    text: "dark:text-white text-dark",
    subText: "dark:text-white text-dark/80",
    dotColors: ["bg-gray-800", "bg-gray-500", "bg-gray-300"],
  },
  accent: {
    container: "bg-accent border-accent-400",
    text: "text-accent-foreground",
    subText: "text-accent-foreground",
    dotColors: ["bg-white", "bg-indigo-200", "bg-indigo-400"],
  },
  glass: {
    container: "glass-card",
    text: "text-text-primary",
    subText: "text-text-secondary",
    dotColors: ["bg-white/50", "bg-white/30", "bg-white/10"],
  },
};

interface TileProps {
  title: string;
  subtitle?: string;
  img?: string;
  cta?: { label: string; onClick?: () => void } | null;
  className?: string;
  variant?: Variant;
  /**
   * Allows callers to override a subset of the default variant styles.  Any
   * values provided here will be merged shallowly with the defaults.
   */
  variantClasses?: Partial<Record<Variant, Partial<VariantStyle>>>;
  icon?: React.ReactNode;
}

// --- Sub-Component: Tile ---
const Tile: React.FC<TileProps> = ({
  title,
  subtitle,
  img,
  cta,
  className = "",
  variant = "default",
  variantClasses: userVariantClasses,
  icon,
}) => {
  const reduced = useReducedMotion();
  const scaleClass = reduced ? "" : "group-hover:scale-105 transition-transform duration-700 ease-out";

  // merge any overrides supplied by the caller with the defaults
  const mergedVariantClasses: Record<Variant, VariantStyle> = {
    default: {
      ...defaultVariantClasses.default,
      ...(userVariantClasses?.default || {}),
    },
    accent: {
      ...defaultVariantClasses.accent,
      ...(userVariantClasses?.accent || {}),
    },
    glass: {
      ...defaultVariantClasses.glass,
      ...(userVariantClasses?.glass || {}),
    },
  };

  const currentStyle = mergedVariantClasses[variant];
  const hasImage = !!img;

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between p-6 h-full overflow-hidden rounded-none",
        currentStyle.container,
        className,
        "hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500",
      )}
    >
      {/* Background Image */}
      {hasImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={img} alt="" className={`w-full h-full object-cover opacity-80 ${scaleClass}`} />
          <div className="absolute inset-0 bg-blue-300/50 dark:bg-slate-900/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between text-right">
        <div>
          {/* Header: Icon + Dots */}
          <div className="flex items-center justify-between mb-4 w-full">
            {icon && <div className={cn("p-2 rounded-full bg-white/10 text-text-primary")}>{icon}</div>}
            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity" dir="ltr">
              {currentStyle.dotColors.map((color, i) => (
                <span key={i} className={cn("w-1.5 h-1.5 rounded-full", color)} aria-hidden />
              ))}
            </div>
          </div>

          <h3 className={cn("text-xl font-bold tracking-tight", currentStyle.text)}>{title}</h3>
          {subtitle && <p className={cn("mt-2 text-sm leading-relaxed", currentStyle.subText)}>{subtitle}</p>}
        </div>

        {cta && (
          <div className="mt-4 flex justify-end">
            <button
              className={cn(
                "flex items-center gap-1 text-xs font-bold uppercase tracking-wider",
                hasImage ? "text-text-primary" : currentStyle.text,
                "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300",
              )}
            >
              {cta.label}
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

// --- Main Hero Component ---
export default function HeroBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-headline", { y: 100, opacity: 0, duration: 1, stagger: 0.1 })
        .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".bento-grid", { x: 50, opacity: 0, duration: 1 }, "-=0.8")
        .from(".grid-tile", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen text-text-primary selection:bg-indigo-500 selection:text-text-primary font-sans"
      dir="rtl"
      lang="fa"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full h-full p-4 lg:p-6">
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 auto-rows-fr w-full min-h-[90svh] mt-12">
          <article className="grid-tile lg:col-span-2 lg:row-span-2 row-span-2 p-6 lg:p-8 glass-card border border-white/10 rounded-none flex flex-col justify-between text-right overflow-hidden">
            <div className="space-y-8">
              <div className="hero-subtext inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-wide rounded-none">
                <Sparkles className="w-3 h-3" />
                <span>نسخه ۲.۰ مرکز نوآوری</span>
              </div>

              <div className="space-y-2">
                <h1 className="hero-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] bg-clip-text">
                  مرکز نوآوری دانشگاه صنعتی همدان
                </h1>
              </div>

              <p className="hero-subtext text-base lg:text-lg text-text-secondary leading-relaxed max-w-2xl border-r-2 border-indigo-500/50 pr-4">
                ما پل ارتباطی میان ایده‌های ناب دانشگاهی و بازار جهانی هستیم. فضایی امن برای رشد، یادگیری و
                سرمایه‌گذاری.
              </p>

              <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton className="group relative px-8 py-4 bg-white text-black rounded-none font-bold text-lg hover:bg-indigo-50 transition-colors overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    شروع به کار
                    <ArrowDownLeft className="w-5 h-5 group-hover:translate-y-1 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>

                <MagneticButton className="px-8 py-4 rounded-none font-medium text-text-primary border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  مشاهده ویدیو
                </MagneticButton>
              </div>
            </div>

            <div className="hero-subtext flex flex-wrap gap-8 pt-8 border-t border-white/10 w-full">
              <div>
                <div className="text-2xl font-bold text-text-primary">+۱۲۰</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">استارتاپ فعال</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">$۴.۵M</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">سرمایه جذب شده</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">۹۸٪</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">رضایت</div>
              </div>
            </div>
          </article>

          <div className="grid-tile lg:col-span-2 h-full">
            <Tile
              title="شبکه‌سازی"
              subtitle="ارتباط با سرمایه‌گذاران و شرکای تجاری کلیدی"
              img="/network.webp"
              variant="default"
              icon={<ArrowUpRight className="w-4 h-4" />}
              cta={{ label: "عضویت" }}
            />
          </div>

          <div className="grid-tile lg:row-span-2 h-full">
            <Tile
              title="مدیریت"
              subtitle="ابزارهای داخلی برای تیم‌ها و مدیران"
              variant="default"
              img="/industry_presentation.jpg"
              icon={<ArrowUpRight className="w-4 h-4" />}
              cta={{ label: "عضویت" }}
            />
          </div>

          <div className="grid-tile h-full">
            <Tile
              title="موفقیت‌ها"
              subtitle="داستان تیم‌های برتر"
              img="/success.webp"
              variant="default"
              cta={{ label: "خواندن" }}
            />
          </div>

          <div className="grid-tile h-full">
            <Tile
              title="رویدادها"
              subtitle="کارگاه‌ها و همایش‌ها"
              variant="accent"
              icon={<Play className="w-4 h-4" />}
              cta={{ label: "تقویم" }}
            />
          </div>

          <div className="grid-tile h-full">
            <Tile
              title="موفقیت‌ها"
              subtitle="این بخش بعداً به‌روزرسانی می‌شود"
              img="/success.webp"
              variant="default"
              cta={{ label: "خواندن" }}
            />
          </div>

          <div className="grid-tile h-full">
            <Tile
              title="حمایت"
              subtitle="مشاوره حقوقی و مالی"
              variant="default"
              icon={<Sparkles className="w-4 h-4" />}
              cta={{ label: "بیشتر" }}
              variantClasses={{
                default: {
                  text: "text-black dark:invert",
                  subText: "text-black/80 dark:invert",
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
