import React, { useRef, useEffect } from "react";
import MagneticButton from "../components/MagneticButton";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowDownLeft, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { gsap } from "gsap";

// --- Types ---
interface TileProps {
  title: string;
  subtitle?: string;
  img?: string;
  cta?: { label: string; onClick?: () => void } | null;
  className?: string;
  variant?: "default" | "accent" | "glass";
  icon?: React.ReactNode;
}

// --- Sub-Component: Tile ---
const Tile: React.FC<TileProps> = ({ title, subtitle, img, cta, className = "", variant = "default", icon }) => {
  const reduced = useReducedMotion();
  const scaleClass = reduced ? "" : "group-hover:scale-105 transition-transform duration-700 ease-out";

  // using theme tokens so light/dark mode works consistently with other sections (see StationedTeamsSection)
  const variantClasses: Record<
    NonNullable<TileProps["variant"]>,
    {
      container: string;
      text: string;
      subText: string;
      dotColors: string[];
    }
  > = {
    default: {
      // card background on light theme, falls back to text-background in dark mode via CSS vars
      container: "bg-card border-gray-200 stat-item glass-card",
      text: "text-text-primary",
      subText: "text-text-secondary",
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

  const currentStyle = variantClasses[variant];
  const hasImage = !!img;

  return (
    <article
      className={`invert group relative flex flex-col justify-between p-6 h-full overflow-hidden rounded-2xl ${currentStyle.container} ${className} hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500`}
    >
      {/* Background Image */}
      {hasImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={img} alt="" className={`invert w-full h-full object-cover opacity-40 ${scaleClass}`} />
          <div className=" absolute inset-0 bg-gradient-to-t from-background/10 via-background/10 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between text-right">
        <div>
          {/* Header: Icon + Dots */}
          <div className="flex items-center justify-between mb-4 w-full">
            {icon && <div className="p-2 rounded-full bg-white/10 text-text-primary">{icon}</div>}
            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity" dir="ltr">
              {currentStyle.dotColors.map((color, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${color}`} aria-hidden />
              ))}
            </div>
          </div>

          <h3 className={`text-xl font-bold tracking-tight ${currentStyle.text}`}>{title}</h3>
          {subtitle && <p className={`mt-2 text-sm leading-relaxed ${currentStyle.subText}`}>{subtitle}</p>}
        </div>

        {cta && (
          <div className="mt-4 flex justify-end">
            <button
              className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${hasImage ? "text-text-primary" : currentStyle.text} opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}
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
  const textRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full min-h-screen  text-text-primary overflow-hidden selection:bg-indigo-500 selection:text-text-primary font-sans"
      dir="rtl"
      lang="fa"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 py-20 lg:py-0">
        {/* LEFT SIDE: Content & Intro */}
        <div ref={textRef} className="w-full lg:w-5/12 flex flex-col items-start text-right space-y-8">
          {/* Badge */}
          <div className="hero-subtext inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3 h-3" />
            <span>نسخه ۲.۰ مرکز نوآوری</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="hero-headline text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] bg-clip-text">
              مرکز نوآوری دانشگاه صنعتی همدان
            </h1>
          </div>

          {/* Description */}
          <p className="hero-subtext text-lg text-text-secondary leading-relaxed max-w-md border-r-2 border-indigo-500/50 pr-4">
            ما پل ارتباطی میان ایده‌های ناب دانشگاهی و بازار جهانی هستیم. فضایی امن برای رشد، یادگیری و سرمایه‌گذاری.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                شروع به کار
                <ArrowDownLeft className="w-5 h-5 group-hover:translate-y-1 group-hover:-translate-x-1 transition-transform" />
              </span>
            </MagneticButton>

            <MagneticButton className="px-8 py-4 rounded-full font-medium text-text-primary border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              مشاهده ویدیو
            </MagneticButton>
          </div>

          {/* Stats */}
          <div className="hero-subtext flex gap-8 pt-8 border-t border-white/10 w-full">
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
        </div>

        {/* RIGHT SIDE: Bento Grid */}
        <div className="w-full lg:w-7/12 h-auto lg:h-[650px]">
          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-4 h-auto lg:h-full w-full">
            {/* Tile 1: Large Feature (Spans 2 rows) */}
            <div className="grid-tile md:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[220px] lg:h-auto">
              <Tile
                title="استارتاپ"
                subtitle="برنامه جامع شتابدهی با دسترسی به منتورهای برتر صنعت"
                img="/facilities_lab_wide.webp"
                variant="default"
                cta={{ label: "مشاهده برنامه" }}
              />
            </div>

            {/* Tile 2: Support */}
            <div className="grid-tile">
              <Tile
                title="حمایت"
                subtitle="مشاوره حقوقی و مالی"
                variant="default"
                icon={<Sparkles className="w-4 h-4" />}
                cta={{ label: "بیشتر" }}
              />
            </div>

            {/* Tile 3: Events */}
            <div className="grid-tile">
              <Tile
                title="رویدادها"
                subtitle="کارگاه‌ها و همایش‌ها"
                variant="accent"
                icon={<Play className="w-4 h-4" />}
                cta={{ label: "تقویم" }}
              />
            </div>

            {/* Tile 4: Community (Wide) */}
            <div className="grid-tile md:col-span-2">
              <Tile
                title="شبکه‌سازی"
                subtitle="ارتباط با سرمایه‌گذاران و شرکای تجاری کلیدی"
                img="/network.webp"
                variant="default"
                icon={<ArrowUpRight className="w-4 h-4" />}
                cta={{ label: "عضویت" }}
              />
            </div>

            {/* Tile 5: Success Stories */}
            <div className="grid-tile">
              <Tile
                title="موفقیت‌ها"
                subtitle="داستان تیم‌های برتر"
                img="/success.webp"
                variant="default"
                cta={{ label: "خواندن" }}
              />
            </div>
            <div className="grid-tile md:col-span-2">
              <Tile
                title="مدیریت"
                subtitle="ابزارهای داخلی برای تیم‌ها و مدیران"
                variant="default"
                img="/industry_presentation.jpg"
                icon={<ArrowUpRight className="w-4 h-4" />}
                cta={{ label: "عضویت" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
