import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, Cpu, Sparkles } from "lucide-react";

const roles = ["Electronics Engineer", "AI Researcher", "Embedded Systems", "Creative Developer"];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const target = roles[roleIdx];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => setRoleIdx((r) => (r + 1) % roles.length), 1800);
      }
    }, 60);
    return () => clearInterval(id);
  }, [roleIdx]);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 noise opacity-[0.08] pointer-events-none" />

      {/* Floating blobs */}
      <motion.div
        className="absolute -top-32 -left-32 size-[420px] rounded-full bg-[var(--teal)] opacity-30 blur-3xl"
        animate={{ x: mouse.x * 60, y: mouse.y * 60 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />
      <motion.div
        className="absolute -bottom-40 -right-20 size-[480px] rounded-full bg-[var(--orange)] opacity-30 blur-3xl"
        animate={{ x: -mouse.x * 60, y: -mouse.y * 60 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-6"
          >
            <span className="size-1.5 rounded-full bg-[var(--orange)] animate-pulse" />
            AVAILABLE FOR COLLABORATIONS
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
            {"Building Intelligent".split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-block mr-3"
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="inline-block text-gradient"
            >
              Systems & Experiences
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 flex items-center gap-3 text-lg md:text-xl text-muted-foreground"
          >
            <Cpu className="size-5 text-[var(--orange)]" />
            <span className="font-mono">
              {typed}
              <span className="inline-block w-[2px] h-5 bg-[var(--orange)] animate-pulse ml-1 align-middle" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground/90"
          >
            I design and engineer the intersection of silicon and intelligence — from
            embedded firmware and PCB design to deep-learning models that ship to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="magnetic-btn group relative inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-medium text-white shadow-glow">
              <Sparkles className="size-4" />
              Explore Work
            </a>
            <a href="#contact" className="magnetic-btn glass rounded-full px-6 py-3 text-sm font-medium">
              Let's Talk →
            </a>

            <div className="flex items-center gap-2 ml-2">
              {[
                { Icon: Github, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Mail, href: "#contact" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="size-10 rounded-full glass flex items-center justify-center hover:shadow-glow hover:text-[var(--orange)] transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile / orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto size-[320px] md:size-[420px]"
        >
          <div className="absolute inset-0 rounded-full bg-accent-gradient blur-3xl opacity-40" />
          <div className="absolute inset-6 rounded-full glass glow-ring overflow-hidden">
            <div className="absolute inset-0 bg-cool-gradient opacity-70" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[8rem] font-bold text-white/90 drop-shadow-lg">A</span>
            </div>
          </div>

          {/* Orbit ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[var(--teal)]/40 animate-spin-slow" />
          <div className="absolute inset-[-30px] rounded-full border border-[var(--orange)]/20" />

          {/* Floating tech chips */}
          {[
            { label: "AI", top: "-2%", left: "45%", delay: 0 },
            { label: "PCB", top: "40%", left: "-8%", delay: 0.4 },
            { label: "FPGA", top: "40%", left: "98%", delay: 0.8 },
            { label: "ML", top: "95%", left: "45%", delay: 1.2 },
          ].map((c) => (
            <motion.div
              key={c.label}
              className="absolute glass rounded-full px-3 py-1.5 text-xs font-mono shadow-soft"
              style={{ top: c.top, left: c.left, transform: "translate(-50%,-50%)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2.6, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground"
      >
        SCROLL
        <ArrowDown className="size-4" />
      </motion.a>
    </section>
  );
}
