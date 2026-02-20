import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, TrendingUp, BookOpen, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 85, suffix: "٪", label: "تیم‌ها در ۶ ماه به نمونه اولیه رسیدند", icon: TrendingUp },
  { value: 120, suffix: "+", label: "انتشارات با داده باز", icon: BookOpen },
  { value: 30, suffix: "", label: "استارتاپ پشتیبانی شده", icon: Rocket },
];

const testimonials = [
  {
    quote:
      "مرکز نوآوری به ما منابع و منتورشیپی داد که پژوهش‌مان را به محصول قابل فروش تبدیل کنیم. در ۸ ماه، اولین مشتری پولی‌مان را داشتیم.",
    author: "دکتر سارا محمدی",
    role: "بنیان‌گذار، NeuroLab Technologies",
  },
  {
    quote:
      "رویکرد میان‌رشته‌ای اینجا بی‌نظیر است. با مهندسان، طراحان و دانشجویان کسب‌وکار همکاری کردم تا چیزی واقعاً نوآورانه بسازم.",
    author: "علیرضا حسینی",
    role: "دانشجوی دکترا، رباتیک",
  },
];

export default function SuccessStoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const statsContainer = statsRef.current;
    const testimonialsContainer = testimonialsRef.current;

    if (!section || !heading || !statsContainer || !testimonialsContainer) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stats animation with count-up
      const statCards = statsContainer.querySelectorAll(".stat-card");
      gsap.fromTo(
        statCards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsContainer,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Count-up animation for stats
      statCards.forEach((card) => {
        const valueEl = card.querySelector(".stat-value");
        const targetValue = parseInt(valueEl?.getAttribute("data-value") || "0");

        gsap.fromTo(
          { value: 0 },
          { value: targetValue },
          {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (valueEl) {
                valueEl.textContent = Math.round(this.targets()[0].value).toString();
              }
            },
          },
        );
      });

      // Testimonials animation
      const quoteCards = testimonialsContainer.querySelectorAll(".quote-card");
      gsap.fromTo(
        quoteCards,
        { y: 50, opacity: 0, rotate: -1 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsContainer,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="success-stories" className="section-flowing z-[110] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <h2 className="text-display-2 text-text-primary mb-4">داستان‌های موفقیت</h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            فارغ‌التحصیلان مرکز کسب‌وکارهایی راه‌اندازی کرده‌اند، داده‌های باز منتشر کرده‌اند و به تیم‌های پژوهشی برتر
            در سراسر جهان پیوسته‌اند.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card glass-card p-8 flex flex-col items-center text-center opacity-0">
              <stat.icon className="w-8 h-8 text-indigo mb-4" />
              <div className="flex items-baseline gap-1 mb-2">
                <span className="stat-value text-5xl font-display font-bold text-text-primary" data-value={stat.value}>
                  0
                </span>
                <span className="text-3xl font-display font-bold text-indigo">{stat.suffix}</span>
              </div>
              <span className="text-text-secondary text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="quote-card glass-card p-8 opacity-0">
              <Quote className="w-10 h-10 text-indigo/50 mb-4" />
              <p className="text-text-primary text-lg leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo/20 flex items-center justify-center">
                  <span className="text-indigo font-display font-semibold">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary font-medium">{testimonial.author}</p>
                  <p className="text-text-secondary text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
