"use client";

import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  ChevronRight,
  Clock,
  CreditCard,
  MessageSquareText,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import landingHero from "@/assets/landing-hero.png";
import { applyLightTheme } from "@/lib/theme";

const PRODUCT_NAME = "DayFlow";

type Feature = {
  icon: typeof Users;
  title: string;
  description: string;
  color: string;
  bgColor: string;
};

const features: Feature[] = [
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Complete employee lifecycle — profiles, departments, designations, documents, and reporting hierarchy.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    description:
      "Clock in/out with work modes, shift configurations, late/half-day thresholds, and holiday calendars.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: CalendarCheck,
    title: "Leave Management",
    description:
      "Leave applications, multi-level approvals, automatic balance tracking, and configurable leave types.",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    icon: CreditCard,
    title: "Payroll Processing",
    description:
      "Salary setup, monthly payroll generation, payslip records, and detailed compensation reports.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: BriefcaseBusiness,
    title: "Recruitment Pipeline",
    description:
      "Job postings, candidate tracking, application stages, interview scheduling, and offer management.",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: BarChart3,
    title: "Performance Reviews",
    description:
      "Goal setting, review cycles, peer and manager feedback, and appraisal history tracking.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
];

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "12+", label: "HR Modules" },
  { value: "4", label: "Access Roles" },
  { value: "Real-time", label: "Notifications" },
  { value: "AI", label: "HR Assistant" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page text-heading">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <AISection />
      <CTASection />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/80 border-b border-border/60 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-heading text-page">
            <BriefcaseBusiness size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            {PRODUCT_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          <a href="#features" className="transition hover:text-heading">
            Features
          </a>
          <a href="#ai-assistant" className="transition hover:text-heading">
            AI Assistant
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-text-secondary transition hover:bg-active sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-lg bg-heading px-4 py-2 text-sm font-semibold text-page shadow-lg shadow-black/10 transition hover:bg-heading/90"
          >
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pt-36 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.08),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700">
          <Sparkles size={13} />
          AI-Powered HR Management Platform
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your People, Simplified.
          <span className="mt-1 block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            All in One Place.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
          DayFlow brings attendance, leave, payroll, recruitment, performance,
          and AI-powered insights into a single role-based platform — so your HR
          team can focus on people, not paperwork.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-heading px-7 text-sm font-semibold text-page shadow-xl shadow-black/10 transition hover:bg-heading/90"
          >
            Start Free
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-semibold text-text-secondary shadow-sm transition hover:border-border-strong hover:bg-hover"
          >
            Sign In
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-emerald-100/40 via-transparent to-transparent blur-xl" />
          <div className="relative overflow-hidden rounded-xl border border-border/70 shadow-2xl shadow-slate-200/50">
            <Image
              src={landingHero}
              alt="DayFlow HR Dashboard"
              priority
              className="w-full"
              sizes="(max-width: 1280px) 100vw, 1100px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-border-light bg-hover/50 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 sm:grid-cols-4 sm:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Everything You Need
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Complete HR Toolkit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            From onboarding to offboarding — every HR workflow in one secure,
            role-based application.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div className="group rounded-2xl border border-border-light bg-card p-7 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-border-light/50 hover:-translate-y-0.5">
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.bgColor} ${feature.color}`}
      >
        <Icon size={20} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-heading">
        {feature.title}
      </h3>
      <p className="mt-2.5 text-sm leading-6 text-text-muted">
        {feature.description}
      </p>
    </div>
  );
}

function AISection() {
  return (
    <section
      id="ai-assistant"
      className="bg-gradient-to-b from-slate-50 to-white px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white sm:p-14 lg:p-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-400">
                <Sparkles size={12} />
                Powered by Gemini AI
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Your AI HR Assistant
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-white/60">
                Ask about your leave balance, payroll status, or reporting
                manager — and get instant, data-backed answers from your real HR
                records.
              </p>

              <div className="mt-8 space-y-4">
                <AIFeatureRow
                  icon={MessageSquareText}
                  text={'"What\'s my leave balance?"'}
                />
                <AIFeatureRow
                  icon={CreditCard}
                  text={'"Has my payroll been generated?"'}
                />
                <AIFeatureRow
                  icon={Users}
                  text={'"Who is my reporting manager?"'}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Zap size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">HR Assistant</p>
                    <p className="text-xs text-white/40">
                      Scoped to your account
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex justify-end">
                    <div className="rounded-xl rounded-br-sm bg-emerald-600 px-4 py-2.5 text-sm">
                      What is my leave balance?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80">
                      You have <b className="text-white">28 days</b> of leave
                      available — 18 Annual, 10 Sick, 0 Unpaid.
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <span className="flex-1 text-sm text-white/30">
                    Ask a question...
                  </span>
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500 text-white">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIFeatureRow({
  icon: Icon,
  text,
}: {
  icon: typeof Users;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/70">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5">
        <Icon size={15} className="text-emerald-400" />
      </div>
      {text}
    </div>
  );
}

function CTASection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <Shield size={13} />
          Secure & Role-Based
        </div>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to streamline your HR?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-text-secondary">
          Get started in minutes. Four access tiers — Super Admin, HR Admin,
          Manager, and Employee — each with tailored dashboards and permissions.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-heading px-7 text-sm font-semibold text-page shadow-xl shadow-black/10 transition hover:bg-heading/90"
          >
            Create Free Account
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-semibold text-text-secondary transition hover:bg-hover"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-light bg-hover/50 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-heading text-page">
            <BriefcaseBusiness size={14} />
          </div>
          <span className="text-sm font-semibold">{PRODUCT_NAME}</span>
        </div>
        <p className="text-xs text-text-faint">
          &copy; {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
