"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { Autoplay, EffectCards, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowUpRight,
  Bean,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  Coffee,
  Globe,
  MapPinned,
  Menu,
  MoonStar,
  Phone,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
  SunMedium,
  MessageCircle,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";

type MenuCategory = {
  key: string;
  label: string;
  items: Array<{
    name: string;
    description: string;
    price: string;
    tone: string;
  }>;
};

const menuCategories: MenuCategory[] = [
  {
    key: "coffee",
    label: "Coffee",
    items: [
      { name: "Velvet Latte", description: "Silky espresso, oat milk, warm vanilla.", price: "$7", tone: "from-amber-300 via-amber-500 to-rose-300" },
      { name: "House Pour Over", description: "Seasonal single origin with citrus clarity.", price: "$6", tone: "from-stone-200 via-amber-200 to-amber-400" },
      { name: "Café Crème", description: "Creamy pour with caramel notes and a soft finish.", price: "$8", tone: "from-orange-200 via-amber-300 to-yellow-200" },
    ],
  },
  {
    key: "espresso",
    label: "Espresso",
    items: [
      { name: "Espresso Tonic", description: "Bright, sparkling, and refreshingly crisp.", price: "$8", tone: "from-sky-200 via-cyan-300 to-emerald-200" },
      { name: "Double Shot", description: "Bold crema with deep cocoa sweetness.", price: "$5", tone: "from-stone-300 via-orange-300 to-amber-500" },
      { name: "Cortado", description: "Balanced, warm, and effortlessly refined.", price: "$6", tone: "from-orange-200 via-amber-200 to-stone-300" },
    ],
  },
  {
    key: "tea",
    label: "Tea",
    items: [
      { name: "Jasmine Bloom", description: "Fragrant floral tea with a luminous finish.", price: "$6", tone: "from-lime-100 via-emerald-200 to-teal-200" },
      { name: "Chai Cloud", description: "Spiced tea with oat foam and honey aroma.", price: "$7", tone: "from-amber-200 via-rose-200 to-orange-300" },
      { name: "Earl Grey Cream", description: "Bergamot, cream, and honeyed calm.", price: "$6", tone: "from-slate-200 via-stone-300 to-amber-200" },
    ],
  },
  {
    key: "desserts",
    label: "Desserts",
    items: [
      { name: "Basque Cheesecake", description: "Burnished top, airy center, berries on the side.", price: "$9", tone: "from-rose-200 via-amber-200 to-stone-200" },
      { name: "Chocolate Torte", description: "Dark, rich, and finished with sea salt.", price: "$10", tone: "from-stone-300 via-zinc-400 to-amber-300" },
      { name: "Honey Madeleines", description: "Warm mini cakes with citrus glaze.", price: "$8", tone: "from-yellow-100 via-amber-200 to-orange-200" },
    ],
  },
  {
    key: "snacks",
    label: "Snacks",
    items: [
      { name: "Truffle Toast", description: "Sourdough, herbs, and soft whipped cheese.", price: "$11", tone: "from-amber-100 via-stone-200 to-emerald-200" },
      { name: "Crispy Brioche", description: "Golden bite with herb butter and tomato jam.", price: "$9", tone: "from-amber-200 via-orange-200 to-rose-200" },
      { name: "Seasonal Board", description: "Artisan cheese, fruit, and roasted nuts.", price: "$13", tone: "from-stone-200 via-amber-200 to-yellow-200" },
    ],
  },
];

const drinks = [
  {
    name: "Midnight Mocha",
    note: "Cacao depth, velvety foam, caramel drizzle.",
    accent: "from-stone-900 via-amber-950 to-rose-950",
  },
  {
    name: "Golden Flat White",
    note: "Silken milk texture with a warm toasted finish.",
    accent: "from-amber-200 via-orange-300 to-stone-400",
  },
  {
    name: "Sparkling Espresso",
    note: "Lifted citrus bubbles with a glossy crema crown.",
    accent: "from-sky-200 via-cyan-300 to-emerald-200",
  },
  {
    name: "Rose Cardamom Latte",
    note: "Floral spice, cream, and an elegant slow sip.",
    accent: "from-rose-200 via-amber-200 to-orange-300",
  },
];

const testimonials = [
  {
    name: "Amara Chen",
    role: "Weekend regular",
    text: "Every detail feels thoughtful — from the first sip to the final sparkle of the room.",
    rating: 5,
  },
  {
    name: "Ethan Brooks",
    role: "Design director",
    text: "A luxurious café experience with a calm, premium rhythm that still feels welcoming.",
    rating: 5,
  },
  {
    name: "Noor Patel",
    role: "Frequent guest",
    text: "The drinks are beautiful, the atmosphere is soft, and the service feels personal.",
    rating: 5,
  },
];

const galleryItems = [
  { title: "Barista Ritual", tall: "h-56", tone: "from-amber-300 via-stone-200 to-rose-200" },
  { title: "Sunlit Corner", tall: "h-72", tone: "from-stone-200 via-amber-100 to-amber-300" },
  { title: "Espresso Pour", tall: "h-64", tone: "from-rose-200 via-amber-200 to-orange-300" },
  { title: "Cozy Tables", tall: "h-52", tone: "from-orange-200 via-yellow-100 to-stone-200" },
  { title: "Steam Detail", tall: "h-80", tone: "from-slate-200 via-stone-200 to-amber-200" },
  { title: "Dessert Glow", tall: "h-60", tone: "from-amber-200 via-rose-100 to-stone-200" },
];

const stats = [
  { label: "Cups Served", value: 120000, suffix: "+", icon: Coffee },
  { label: "Happy Customers", value: 42000, suffix: "+", icon: Users },
  { label: "Years of Service", value: 12, suffix: "+", icon: Sparkles },
  { label: "Menu Items", value: 48, suffix: "+", icon: UtensilsCrossed },
];

const socials = [
  { label: "Website", icon: Globe },
  { label: "Chat", icon: MessageCircle },
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-amber-100/80 backdrop-blur">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl md:text-5xl dark:text-stone-50">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-700 sm:text-base dark:text-stone-300">
        {description}
      </p>
    </div>
  );
}

function StatCard({ label, value, suffix, icon: Icon }: (typeof stats)[number]) {
  const count = useCountUp(value, true);

  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-amber-500" />
        <div className="h-1.5 w-24 rounded-full bg-black/5 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-amber-300 to-orange-500"
            initial={{ width: "20%" }}
            whileInView={{ width: label === "Cups Served" ? "92%" : label === "Happy Customers" ? "86%" : label === "Years of Service" ? "78%" : "82%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
      <p className="mt-5 text-4xl font-semibold text-stone-950 dark:text-stone-50">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">{label}</p>
    </CardShell>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/70 p-5 shadow-[0_20px_80px_rgba(122,74,28,0.12)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:bg-[#1d1410]/70">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-amber-200/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].key);
  const [showTop, setShowTop] = useState(false);
  const [formState, setFormState] = useState({ name: "", phone: "", guests: "2", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const prefersReducedMotion = useReducedMotion();
  const steamRefs = useRef<HTMLSpanElement[]>([]);
  const particleRefs = useRef<HTMLSpanElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("panda-cafe-theme") as "light" | "dark" | null;
    const preferred = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.dataset.theme = preferred;
    setReady(true);

    if (prefersReducedMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.08 });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!ready || prefersReducedMotion) return;

    gsap.fromTo(
      steamRefs.current,
      { y: 20, opacity: 0.15, scaleY: 0.85 },
      { y: -18, opacity: 0.55, scaleY: 1.05, duration: 2.6, repeat: -1, yoyo: true, stagger: 0.25, ease: "sine.inOut" }
    );

    gsap.fromTo(
      particleRefs.current,
      { y: 0, opacity: 0.1 },
      { y: -28, opacity: 0.7, duration: 4, repeat: -1, yoyo: true, stagger: 0.15, ease: "sine.inOut" }
    );
  }, [prefersReducedMotion, ready]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  const activeMenu = useMemo(
    () => menuCategories.find((entry) => entry.key === activeCategory) ?? menuCategories[0],
    [activeCategory]
  );

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("panda-cafe-theme", nextTheme);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
    setFormState({ name: "", phone: "", guests: "2", date: "", time: "" });
    window.setTimeout(() => setSubmitted(false), 2800);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,237,213,0.96),rgba(251,247,241,1)_30%,rgba(244,235,226,1)_70%,rgba(33,20,11,1)_140%)] text-stone-900 dark:bg-[radial-gradient(circle_at_top,rgba(78,47,29,0.9),rgba(23,14,10,1)_45%,rgba(8,7,6,1)_100%)] dark:text-stone-50">
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-amber-300 via-orange-400 to-rose-400" style={{ scaleX: heroProgress }} />

      <AnimatePresence>
        {!ready && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-[#140d09]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-amber-200/20 bg-white/5 shadow-[0_0_80px_rgba(217,119,6,0.25)]">
              <motion.div
                className="absolute h-20 w-20 rounded-full border border-amber-200/30"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Coffee className="h-8 w-8 text-amber-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!prefersReducedMotion && (
        <div className="pointer-events-none fixed left-0 top-0 z-40 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/40 bg-amber-200/10 backdrop-blur md:block" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)` }} />
      )}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-white/50 backdrop-blur-xl dark:bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 via-orange-400 to-stone-700 text-lg font-bold text-white shadow-lg shadow-amber-900/20">
              PC
              <span className="absolute inset-0 rounded-2xl border border-white/30" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Panda Cafe</span>
              <span className="block text-sm font-medium text-stone-900 dark:text-stone-50">Brewing calm luxury</span>
            </span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {[
              ["About", "#about"],
              ["Menu", "#menu"],
              ["Gallery", "#gallery"],
              ["Reserve", "#reserve"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-black/5 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/70 text-stone-800 shadow-sm transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-stone-50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-stone-950 px-4 text-sm font-medium text-white shadow-lg shadow-stone-950/20 transition hover:-translate-y-0.5 dark:bg-amber-200 dark:text-stone-950 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <a
              href="#reserve"
              className="hidden rounded-full bg-linear-to-r from-amber-300 via-orange-400 to-amber-500 px-5 py-3 text-sm font-medium text-stone-950 shadow-lg shadow-amber-800/20 transition hover:-translate-y-0.5 md:inline-flex"
            >
              Reserve Table
            </a>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="border-t border-white/10 bg-white/90 px-4 py-4 backdrop-blur-xl dark:bg-[#120d0a]/95 md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="grid gap-2">
                {[
                  ["About", "#about"],
                  ["Menu", "#menu"],
                  ["Gallery", "#gallery"],
                  ["Reviews", "#reviews"],
                  ["Reserve", "#reserve"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-stone-950/5 px-4 py-3 text-sm font-medium text-stone-900 dark:bg-white/5 dark:text-stone-50"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="hero" className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-stone-600 shadow-sm backdrop-blur dark:bg-white/10 dark:text-stone-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Luxury café experience
          </div>

          <div className="relative mb-6 h-12 overflow-hidden">
            <div className="absolute left-0 top-1/2 h-px w-28 bg-linear-to-r from-amber-200 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative text-sm font-medium uppercase tracking-[0.5em] text-stone-700 dark:text-stone-300"
            >
              Panda Cafe
              <span className="absolute -top-7 left-28 flex items-end gap-1 text-amber-300">
                <span ref={(el) => { if (el) steamRefs.current[0] = el; }} className="h-8 w-1 rounded-full bg-current blur-[1px]" />
                <span ref={(el) => { if (el) steamRefs.current[1] = el; }} className="h-10 w-1 rounded-full bg-current blur-[1px]" />
                <span ref={(el) => { if (el) steamRefs.current[2] = el; }} className="h-7 w-1 rounded-full bg-current blur-[1px]" />
              </span>
            </motion.div>
          </div>

          <motion.h1
            className="max-w-xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl md:text-7xl dark:text-stone-50"
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {"Brewing Moments, One Cup at a Time".split(" ").map((word) => (
              <motion.span
                key={word}
                className="mr-3 inline-block"
                variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-8 text-stone-700 sm:text-lg dark:text-stone-300"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            A warm, cinematic café destination crafted for slow mornings, polished evenings, and every beautiful pause between.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <a href="#menu" className="group inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-stone-950/20 transition hover:-translate-y-1 dark:bg-amber-200 dark:text-stone-950">
              View Menu <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="#reserve" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/70 px-6 py-4 text-sm font-medium text-stone-900 shadow-md backdrop-blur transition hover:-translate-y-1 dark:bg-white/10 dark:text-stone-50">
              Reserve Table <CalendarDays className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              "Single-origin beans",
              "Seasonal pastry pairings",
              "Cozy luxury interiors",
            ].map((text, index) => (
              <motion.div
                key={text}
                className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm text-stone-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-stone-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
                transition={{ delay: 0.7 + index * 0.08, duration: 0.55 }}
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.92, y: ready ? 0 : 32 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="absolute -right-4 bottom-12 h-28 w-28 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/20 bg-stone-950 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%)]" />
            <div className="relative grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-3xl bg-linear-to-br from-amber-100 via-orange-200 to-stone-300 p-4">
                <motion.div
                  className="relative aspect-4/5 overflow-hidden rounded-[1.3rem] bg-[linear-gradient(180deg,rgba(94,53,36,0.2),rgba(35,20,12,0.72)),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_25%),linear-gradient(135deg,#f4e2cb,#b16f3c_45%,#2b1710)]"
                  initial={{ scale: 1.16, x: -12 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.18)_34%,transparent_50%)] opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/20 p-4 text-white backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Signature ambience</p>
                    <p className="mt-1 text-lg font-semibold">Soft light, artisan brewing, slow luxury</p>
                  </div>
                  <motion.span
                    className="absolute left-8 top-10 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs text-white backdrop-blur"
                    animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity }}
                  >
                    Freshly poured
                  </motion.span>
                </motion.div>
              </div>

              <div className="grid gap-4">
                <CardShell>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Today's blend</span>
                    <Bean className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-stone-950 dark:text-stone-50">Smoked Hazelnut Latte</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">Rich espresso, nutty sweetness, and a warm velvet finish.</p>
                  <div className="mt-5 flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Top rated</span>
                  </div>
                </CardShell>

                <CardShell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-orange-500 text-stone-950 shadow-lg shadow-amber-800/20">
                      <Play className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-950 dark:text-stone-50">Cinematic roasting ritual</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">Hover, tap, and scroll for subtle motion.</p>
                    </div>
                  </div>
                </CardShell>
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.span
                  key={index}
                  ref={(el: HTMLSpanElement | null) => {
                    if (el) particleRefs.current[index] = el;
                  }}
                  className={`h-2 rounded-full ${index % 3 === 0 ? "bg-amber-300/70" : index % 3 === 1 ? "bg-orange-300/70" : "bg-white/40"}`}
                  style={{ width: `${14 + index * 5}px` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About the café"
            title="A thoughtfully designed space for exceptional coffee moments."
            description="Panda Cafe blends artisanal brewing, warm hospitality, and an elevated visual identity into a calm, premium destination built for modern routines."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.div
              className="overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-amber-200 via-orange-200 to-stone-400 p-6 shadow-[0_24px_80px_rgba(122,74,28,0.15)]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-4/3 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_30%),linear-gradient(135deg,#f7e1c6,#c98650_42%,#4e2d1d)] shadow-inner" />
            </motion.div>

            <div className="grid gap-5">
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Our story</p>
                <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-stone-300">Born from a love of slow mornings and beautifully crafted cups, the café was imagined as a place where textures, aromas, and soft light do as much storytelling as the menu itself.</p>
              </CardShell>
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Founder’s message</p>
                <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-stone-300">We wanted every visit to feel intimate, polished, and effortless — like stepping into a scene that already understands your favorite drink.</p>
              </CardShell>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured menu"
            title="A curated selection of signature drinks and seasonal bites."
            description="Switch between café categories with smooth transitions and refined card motion that feels natural on touch devices."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {menuCategories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={`rounded-full px-4 py-3 text-sm font-medium transition ${activeCategory === category.key ? "bg-stone-950 text-white dark:bg-amber-200 dark:text-stone-950" : "bg-white/70 text-stone-700 dark:bg-white/10 dark:text-stone-300"}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {activeMenu.items.map((item, index) => (
                <motion.article
                  key={item.name}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/70 p-4 shadow-[0_16px_60px_rgba(122,74,28,0.12)] backdrop-blur-xl dark:bg-white/10"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={prefersReducedMotion ? {} : { y: -8, rotate: -0.2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`h-36 rounded-[1.4rem] bg-linear-to-br ${item.tone} p-px`}>
                    <div className="flex h-full items-end rounded-[1.35rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.35),rgba(0,0,0,0.08))] p-4">
                      <div className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-sm">{activeMenu.label}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-950 dark:text-stone-50">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">{item.description}</p>
                    </div>
                    <div className="rounded-full bg-stone-950 px-3 py-2 text-sm font-medium text-white dark:bg-amber-200 dark:text-stone-950">{item.price}</div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Signature showcase"
            title="A horizontal carousel designed for swipe-first discovery."
            description="Large cards, 3D depth, and momentum scrolling create a tactile premium browsing experience."
          />

          <div className="mt-10">
            <Swiper
              modules={[EffectCards, Autoplay, FreeMode]}
              effect="cards"
              grabCursor
              loop
              autoplay={prefersReducedMotion ? false : { delay: 2800, disableOnInteraction: false }}
              cardsEffect={{ perSlideOffset: 10, perSlideRotate: 4, slideShadows: true }}
              className="overflow-visible! px-2 pb-8"
            >
              {drinks.map((drink) => (
                <SwiperSlide key={drink.name} className="h-auto!">
                  <div className={`relative overflow-hidden rounded-[2.2rem] bg-linear-to-br ${drink.accent} p-5 shadow-[0_25px_100px_rgba(0,0,0,0.14)]`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                      <div className="flex flex-col justify-end rounded-[1.7rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.15),rgba(0,0,0,0.15))] p-6 text-stone-950">
                        <p className="text-xs uppercase tracking-[0.35em] text-stone-800/70">Signature drink</p>
                        <h3 className="mt-4 text-3xl font-semibold">{drink.name}</h3>
                        <p className="mt-3 max-w-sm text-sm leading-7 text-stone-800/90">{drink.note}</p>
                        <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium">
                          Swipe to explore <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className={`relative rounded-3xl bg-white/15 p-4 backdrop-blur ${index % 2 ? "translate-y-4" : ""}`}>
                            <div className="aspect-square rounded-[1.2rem] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.2),rgba(0,0,0,0.15))]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="A Pinterest-style mosaic with slow reveal motion."
            description="This layout uses layered cards and lazy-style reveal patterns to keep the browsing experience airy and elegant on mobile."
          />

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.title}
                className={`mb-4 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br ${item.tone} p-4 shadow-[0_16px_60px_rgba(122,74,28,0.12)] ${item.tall}`}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.4rem] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(0,0,0,0.08))] p-4 text-white backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.25em]">#{index + 1}</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{item.title}</p>
                    <p className="mt-2 max-w-xs text-sm leading-7 text-white/85">Premium moments captured with warm light and tactile detail.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customer reviews"
            title="Smooth testimonials that feel alive without being distracting."
            description="A soft auto-sliding carousel with touch support and floating card depth."
          />

          <div className="mt-10 rounded-4xl border border-white/10 bg-white/55 p-4 shadow-[0_16px_60px_rgba(122,74,28,0.12)] backdrop-blur-xl dark:bg-white/10">
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={16}
              slidesPerView={1.05}
              freeMode={{ enabled: true, sticky: true }}
              autoplay={prefersReducedMotion ? false : { delay: 3200, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2.1 },
                1200: { slidesPerView: 3 },
              }}
              className="overflow-visible!"
            >
              {testimonials.map((review) => (
                <SwiperSlide key={review.name}>
                  <CardShell>
                    <Quote className="h-6 w-6 text-amber-500" />
                    <p className="mt-4 text-base leading-8 text-stone-700 dark:text-stone-300">{review.text}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-stone-950 dark:text-stone-50">{review.name}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">{review.role}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardShell>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section id="stats" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Statistics"
            title="Animated numbers that confirm the café’s momentum."
            description="Counters activate on scroll and resolve smoothly to keep the motion elegant and responsive."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section id="reserve" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Reservation"
            title="Book a table with a polished floating-label form."
            description="Clear validation, touch-friendly inputs, and a celebratory success state make booking feel smooth and premium."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <form onSubmit={handleSubmit} className="grid gap-4 rounded-4xl border border-white/10 bg-white/70 p-5 shadow-[0_16px_60px_rgba(122,74,28,0.12)] backdrop-blur-xl dark:bg-white/10">
              {[
                ["name", "Name", "text", "Your full name"],
                ["phone", "Phone", "tel", "+1 555 123 4567"],
              ].map(([field, label, type, placeholder]) => (
                <label key={field} className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">{label}</span>
                  <input
                    type={type}
                    placeholder={placeholder}
                    required
                    onChange={(event) => setFormState((current) => ({ ...current, [field]: event.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/80 px-4 py-4 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-300 dark:bg-black/20 dark:text-white"
                  />
                </label>
              ))}

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Guests</span>
                  <select
                    value={formState.guests}
                    onChange={(event) => setFormState((current) => ({ ...current, guests: event.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/80 px-4 py-4 text-stone-900 outline-none dark:bg-black/20 dark:text-white"
                  >
                    {[2, 3, 4, 5, 6, 7, 8].map((guest) => (
                      <option key={guest} value={guest}>
                        {guest}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Date</span>
                  <input
                    type="date"
                    required
                    onChange={(event) => setFormState((current) => ({ ...current, date: event.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/80 px-4 py-4 text-stone-900 outline-none dark:bg-black/20 dark:text-white"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Time</span>
                <input
                  type="time"
                  required
                  onChange={(event) => setFormState((current) => ({ ...current, time: event.target.value }))}
                  className="rounded-2xl border border-white/10 bg-white/80 px-4 py-4 text-stone-900 outline-none dark:bg-black/20 dark:text-white"
                />
              </label>

              <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-4 text-sm font-medium text-white shadow-xl transition hover:-translate-y-0.5 dark:bg-amber-200 dark:text-stone-950">
                Reserve now <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
                  >
                    Reservation request sent. We’ll confirm shortly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="grid gap-4">
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Reserve details</p>
                <div className="mt-5 grid gap-3 text-sm text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-amber-500" /> Daily, 7:00 AM - 10:00 PM</div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-amber-500" /> +1 (555) 024-8600</div>
                  <div className="flex items-center gap-3"><MapPinned className="h-4 w-4 text-amber-500" /> 18 Honey Lane, Downtown District</div>
                </div>
              </CardShell>
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Sticky mobile action</p>
                <p className="mt-4 text-base leading-7 text-stone-700 dark:text-stone-300">A bottom CTA remains handy for thumb-friendly booking on smaller screens, while the desktop version keeps the layout airy and refined.</p>
                <a href="#reserve" className="mt-5 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-300 via-orange-400 to-amber-500 px-5 py-3 text-sm font-medium text-stone-950">
                  Book from mobile <ArrowUpRight className="h-4 w-4" />
                </a>
              </CardShell>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Location"
            title="Find us, plan your visit, and see our hours at a glance."
            description="Interactive cards and a map-style panel make the location section easy to scan on mobile."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              className="overflow-hidden rounded-4xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.65),transparent_20%),linear-gradient(135deg,#c08a5b,#5c3928_55%,#21120c)] p-5 text-white shadow-[0_16px_60px_rgba(122,74,28,0.16)]"
              whileInView={{ scale: [0.98, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex h-80 items-end rounded-3xl border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(0,0,0,0.2))] p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">Map preview</p>
                  <h3 className="mt-2 text-2xl font-semibold">18 Honey Lane, Downtown District</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/85">Bright corner seating, evening ambient glow, and easy access from the main avenue.</p>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4">
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Opening hours</p>
                <div className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  <p>Mon - Fri: 7:00 AM - 9:00 PM</p>
                  <p>Sat: 8:00 AM - 10:00 PM</p>
                  <p>Sun: 8:00 AM - 8:00 PM</p>
                </div>
              </CardShell>
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Contact</p>
                <div className="mt-4 space-y-3 text-sm text-stone-700 dark:text-stone-300">
                  <p>reservations@pandacafe.studio</p>
                  <p>+1 (555) 024-8600</p>
                  <p>Private events available on request</p>
                </div>
              </CardShell>
            </div>
          </div>
        </div>
      </section>

      <footer ref={footerRef} className="border-t border-white/10 px-4 pb-28 pt-16 sm:px-6 lg:px-8 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 via-orange-400 to-stone-700 text-lg font-bold text-white">PC</span>
              <div>
                <p className="text-lg font-semibold text-stone-950 dark:text-stone-50">Panda Cafe</p>
                <p className="text-sm text-stone-600 dark:text-stone-400">Premium warmth, crafted for modern rituals.</p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-700 dark:text-stone-300">A calm, luxurious café brand experience tuned for mobile-first storytelling, performance, and meaningful motion.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a key={label} href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/70 text-stone-800 transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-stone-50" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <CardShell>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Navigation</p>
              <div className="mt-4 grid gap-2 text-sm text-stone-700 dark:text-stone-300">
                {[
                  ["Hero", "#hero"],
                  ["About", "#about"],
                  ["Menu", "#menu"],
                  ["Gallery", "#gallery"],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="hover:text-stone-950 dark:hover:text-white">{label}</a>
                ))}
              </div>
            </CardShell>
            <CardShell>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Newsletter</p>
              <p className="mt-4 text-sm leading-7 text-stone-700 dark:text-stone-300">Receive seasonal menu highlights and reservation updates.</p>
              <div className="mt-4 flex gap-2">
                <input type="email" placeholder="Email address" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:bg-black/20 dark:text-white" />
                <button type="button" className="inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-3 text-sm font-medium text-white dark:bg-amber-200 dark:text-stone-950">
                  Join
                </button>
              </div>
            </CardShell>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 z-30 w-[min(92vw,32rem)] -translate-x-1/2 md:hidden">
        <div className="grid grid-cols-2 gap-3 rounded-full border border-white/10 bg-white/80 p-2 shadow-2xl backdrop-blur-xl dark:bg-[#140d09]/90">
          <a href="#menu" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-4 py-3 text-sm font-medium text-white dark:bg-amber-200 dark:text-stone-950">
            Menu
          </a>
          <a href="#reserve" className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-amber-300 via-orange-400 to-amber-500 px-4 py-3 text-sm font-medium text-stone-950">
            Reserve
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#hero"
            className="fixed bottom-24 right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-stone-950 text-white shadow-xl shadow-stone-950/20 dark:bg-amber-200 dark:text-stone-950 md:bottom-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            aria-label="Back to top"
          >
            <ChevronDown className="h-4 w-4 rotate-180" />
          </motion.a>
        )}
      </AnimatePresence>
    </main>
  );
}
