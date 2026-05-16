import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useMotionValueEvent(scrollY, "change", (v) => setShrunk(v > 80));

  useEffect(() => {
    const onScroll = () => {
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2 w-[min(1100px,calc(100%-1.5rem))]"
      >
        <motion.nav
          animate={{ paddingTop: shrunk ? 8 : 14, paddingBottom: shrunk ? 8 : 14 }}
          className="glass rounded-2xl px-4 md:px-6 flex items-center justify-between shadow-soft"
        >
          <a href="#home" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-accent-gradient shadow-glow" />
            <span className="font-display font-bold tracking-tight">Aarav<span className="text-[var(--orange)]">.</span></span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="relative px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary/60 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="size-9 rounded-full glass flex items-center justify-center hover:shadow-glow transition-all"
            >
              <motion.div key={String(dark)} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </motion.div>
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden size-9 rounded-full glass flex items-center justify-center"
              aria-label="Menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.nav>

        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass mt-2 rounded-2xl p-3 flex flex-col gap-1"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  onClick={() => setOpen(false)}
                  href={`#${s.id}`}
                  className="block px-3 py-2 rounded-lg hover:bg-secondary/60 text-sm"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </motion.header>

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-gradient origin-left z-[60]"
        style={{ scaleX: scrollY ? undefined : 0 }}
      >
        <ScrollBar />
      </motion.div>
    </>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="h-full w-full bg-accent-gradient origin-left"
    />
  );
}
