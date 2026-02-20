import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building2, Users, Calendar, ExternalLink, Rocket, Target, Briefcase } from "lucide-react";
// import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const stationedTeams = [
  {
    name: "نورال‌فلو AI",
    logo: "/team_neuralflow.jpg",
    industry: "هوش مصنوعی",
    description: "ساخت ابزارهای نسل جدید بهینه‌سازی شبکه عصبی برای خطوط یادگیری ماشین سازمانی.",
    members: 8,
    founded: "۱۴۰۳",
    stage: "سری A",
    color: "from-violet-500/20 to-indigo-500/20",
  },
  {
    name: "گرین‌گرید انرژی",
    logo: "/team_greengrid.jpg",
    industry: "فناوری پاک",
    description: "راه‌حل‌های شبکه هوشمند برای مدیریت و توزیع انرژی تجدیدپذیر.",
    members: 6,
    founded: "۱۴۰۲",
    stage: "بذری",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "مدسینک سلامت",
    logo: "/team_medsync.jpg",
    industry: "سلامت دیجیتال",
    description: "پلتفرم پایش بیمار و تحلیل پیش‌بینانه سلامت مبتنی بر هوش مصنوعی.",
    members: 10,
    founded: "۱۴۰۳",
    stage: "پیش‌بذری",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    name: "کوانتوم‌لیپ لبز",
    logo: "/team_quantumleap.jpg",
    industry: "محاسبات کوانتومی",
    description: "توسعه الگوریتم‌های کوانتومی برای مدل‌سازی و بهینه‌سازی مالی.",
    members: 5,
    founded: "۱۴۰۴",
    stage: "پیش‌بذری",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "ادوورس XR",
    logo: "/team_eduverse.jpg",
    industry: "فناوری آموزش",
    description: "تجربیات آموزشی غوطه‌ور VR/AR برای یادگیری STEM مدارس.",
    members: 7,
    founded: "۱۴۰۳",
    stage: "بذری",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "آگری‌بات سیستمز",
    logo: "/team_agribot.jpg",
    industry: "فناوری کشاورزی",
    description: "ربات‌های کشاورزی خودران و راه‌حل‌های کشاورزی دقیق.",
    members: 9,
    founded: "۱۴۰۲",
    stage: "سری A",
    color: "from-lime-500/20 to-green-500/20",
  },
];

const stats = [
  { value: "۲۴", label: "تیم فعال", icon: Building2 },
  { value: "+۱۸۰", label: "اعضای تیم", icon: Users },
  { value: "۱۵M$", label: "کل سرمایه جذب شده", icon: Target },
  { value: "۶", label: "خروج موفق", icon: Rocket },
];

export default function StationedTeamsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("همه");

  const industries = ["همه", ...new Set(stationedTeams.map((t) => t.industry))];

  const filteredTeams =
    activeFilter === "همه" ? stationedTeams : stationedTeams.filter((t) => t.industry === activeFilter);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Stats animation
      const statElements = section.querySelectorAll(".stat-item");
      gsap.fromTo(
        statElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statElements,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards animation
      const cardElements = cards.querySelectorAll(".team-card");
      gsap.fromTo(
        cardElements,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [filteredTeams]);

  return (
    <section ref={sectionRef} id="stationed-teams" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-button px-4 py-2 mb-6 border-indigo-300 rounded-full">
            <Building2 className="w-4 h-4 text-indigo" />
            <span className="text-sm text-[#FFC107]">تیم‌های مستقر</span>
          </div>
          <h2 className="text-display-2 text-text-primary mb-4">
            استارتاپ‌های <span className="text-gradient">مقیم</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            با تیم‌های نوآوری که آینده را از فضای شتاب‌دهنده ما می‌سازند آشنا شوید. این استارتاپ‌ها دسترسی کامل به
            آزمایشگاه‌ها، منتورها و منابع ما دارند.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item glass-card p-6 text-center opacity-0">
              <div className="w-12 h-12 rounded-xl bg-indigo/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-indigo" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === industry
                  ? "bg-indigo text-white"
                  : "glass-button text-text-secondary hover:text-text-primary"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Teams Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTeams.map((team) => (
            <div
              key={team.name}
              className="team-card glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 opacity-0"
            >
              {/* Colored header */}
              <div className={`h-2 bg-gradient-to-r ${team.color}`} />

              <div className="p-6">
                {/* Team header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-1">{team.name}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-surface/5 text-indigo">
                      {team.industry}
                    </span>
                  </div>
                  <button className="p-2 glass-button opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-6 line-clamp-2">{team.description}</p>

                {/* Team details */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>{team.members} عضو</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>تأسیس {team.founded}</span>
                  </div>
                </div>

                {/* Stage badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo" />
                    <span className="text-sm font-medium text-text-primary">{team.stage}</span>
                  </div>
                  <button className="text-indigo text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    بیشتر بدانید
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="glass-card p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-4">
            آماده پیوستن به شتاب‌دهنده هستید؟
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            برای اقامت مستقر درخواست دهید و به فضای کاری اختصاصی، منتورشیپ، فرصت‌های سرمایه‌گذاری و شبکه جهانی ما دسترسی
            پیدا کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton className="primary-button px-8 py-4 text-white font-medium inline-flex items-center gap-2">
              درخواست اقامت
              <ArrowRight className="w-5 h-5 rotate-180" />
            </MagneticButton>
            <MagneticButton className="glass-button px-8 py-4 text-text-primary font-medium inline-flex items-center gap-2 hover:bg-surface/10 transition-colors">
              رزرو تور بازدید
              <ExternalLink className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div> */}
      </div>
    </section>
  );
}
