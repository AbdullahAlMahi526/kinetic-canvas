import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Brain, Cpu, Code2, CircuitBoard, Wrench, FlaskConical,
  Download, ExternalLink, Github, Quote, MapPin, Send,
  Award, FileText, Trophy, GraduationCap, Briefcase, ArrowUp
} from "lucide-react";

/* ---------- Section wrapper ---------- */
function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[var(--orange)] mb-3">
            <span className="h-px w-10 bg-[var(--orange)]" />
            {eyebrow}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1400;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setVal(Math.round(start + (to - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function About() {
  return (
    <Section id="about" eyebrow="ABOUT / 01" title={<>An engineer who treats <span className="text-gradient">code, silicon and design</span> as one craft.</>}>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm <span className="text-foreground font-medium">Aarav Mehta</span>, an Electronics & AI Engineer
            building production systems where firmware meets machine learning. My work spans neural
            inference on edge MCUs, computer-vision pipelines, and PCB design for research-grade instruments.
          </p>
          <p>
            I've spent the last five years shipping products that need to feel both precise and human —
            from autonomous drones to medical wearables. I care deeply about latency, craftsmanship, and
            the moments where engineering becomes invisible.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium">
              <Download className="size-4" /> Download CV
            </a>
            <a href="#projects" className="magnetic-btn glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium">
              See Work
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            {[
              { n: 42, s: "+", l: "Shipped Projects" },
              { n: 6, s: "+", l: "Years Experience" },
              { n: 14, s: "", l: "Publications" },
            ].map((x) => (
              <div key={x.l} className="glass rounded-2xl p-5 shadow-soft">
                <div className="font-display text-4xl font-bold text-gradient"><Counter to={x.n} suffix={x.s} /></div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{x.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education timeline mini */}
        <div className="glass rounded-3xl p-8 shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-60 rounded-full bg-[var(--orange)] opacity-20 blur-3xl" />
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--orange)] mb-5">
            <GraduationCap className="size-4" /> EDUCATION
          </div>
          <ul className="space-y-6 relative">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {[
              { year: "2023 — 2025", title: "M.Sc. AI & Electronics", place: "ETH Zürich" },
              { year: "2019 — 2023", title: "B.Eng. Electronics Engineering", place: "IIT Bombay" },
              { year: "2024", title: "Visiting Researcher", place: "MIT Media Lab" },
            ].map((e) => (
              <li key={e.title} className="relative pl-7">
                <span className="absolute left-0 top-1.5 size-3.5 rounded-full bg-accent-gradient shadow-glow" />
                <div className="text-xs font-mono text-muted-foreground">{e.year}</div>
                <div className="font-medium">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.place}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
const skillGroups = [
  { Icon: Code2, name: "Programming", items: ["Python", "C/C++", "Rust", "TypeScript"], pct: 92 },
  { Icon: Brain, name: "AI / ML", items: ["PyTorch", "JAX", "ONNX", "TF-Lite"], pct: 88 },
  { Icon: CircuitBoard, name: "Embedded", items: ["STM32", "ESP32", "FreeRTOS", "Zephyr"], pct: 90 },
  { Icon: Cpu, name: "Hardware", items: ["KiCad", "Altium", "FPGA", "Verilog"], pct: 85 },
  { Icon: Wrench, name: "CAD & Sim", items: ["Fusion 360", "MATLAB", "Simulink"], pct: 80 },
  { Icon: FlaskConical, name: "Research", items: ["LaTeX", "Jupyter", "Weights & Biases"], pct: 87 },
];

const marquee = ["PyTorch", "STM32", "Rust", "ONNX", "KiCad", "FreeRTOS", "JAX", "Verilog", "ESP32", "Fusion360", "TensorRT", "Zephyr"];

export function Skills() {
  return (
    <Section id="skills" eyebrow="STACK / 02" title={<>A toolkit forged across <span className="text-gradient">silicon, code & systems</span>.</>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
            whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
            className="glass rounded-2xl p-6 shadow-soft relative overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="flex items-center justify-between mb-5">
              <div className="size-11 rounded-xl bg-secondary/60 flex items-center justify-center text-[var(--clay)]">
                <g.Icon className="size-5" />
              </div>
              <CircularPct value={g.pct} />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{g.name}</h3>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it} className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground/80">{it}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee */}
      <div className="mt-16 relative overflow-hidden glass rounded-2xl py-6">
        <div className="flex marquee-track gap-12 whitespace-nowrap w-max">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="font-display text-3xl md:text-4xl font-bold text-muted-foreground/70 hover:text-gradient transition-colors">
              {m} <span className="text-[var(--orange)]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CircularPct({ value }: { value: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-12">
      <svg viewBox="0 0 44 44" className="size-12 -rotate-90">
        <circle cx="22" cy="22" r={r} stroke="currentColor" className="text-muted/40" strokeWidth="3" fill="none" />
        <motion.circle
          cx="22" cy="22" r={r} stroke="url(#g)" strokeWidth="3" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#588b8b" />
            <stop offset="100%" stopColor="#f28f3b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold">{value}%</div>
    </div>
  );
}

/* ---------- Projects ---------- */
const projects = [
  { tag: "AI", title: "NeuroEdge", desc: "On-device transformer inference engine for ARM Cortex-M, hitting 30ms latency.", stack: ["C++", "PyTorch", "STM32"], color: "from-[var(--teal)] to-[var(--orange)]" },
  { tag: "Embedded", title: "AeroPCB", desc: "6-layer flight controller with sensor fusion firmware for autonomous quadcopters.", stack: ["KiCad", "Rust", "FreeRTOS"], color: "from-[var(--orange)] to-[var(--clay)]" },
  { tag: "Research", title: "BioPulse", desc: "Wearable ECG with on-device arrhythmia detection — published at IEEE EMBC.", stack: ["TF-Lite", "ESP32", "Python"], color: "from-[var(--clay)] to-[var(--teal)]" },
  { tag: "Web", title: "Lumen UI", desc: "An open-source design system for engineering dashboards. 4k+ stars.", stack: ["React", "TS", "Three.js"], color: "from-[var(--teal)] to-[var(--clay)]" },
];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "AI", "Embedded", "Research", "Web"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <Section id="projects" eyebrow="WORK / 03" title={<>Selected <span className="text-gradient">projects</span> that taught me something.</>}>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === t ? "bg-foreground text-background shadow-glow" : "glass hover:bg-secondary/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p, i) => (
          <motion.article
            key={p.title}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="group relative glass rounded-3xl overflow-hidden shadow-soft"
          >
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.color} overflow-hidden`}>
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 noise opacity-[0.1]" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-display text-6xl md:text-7xl font-bold text-white/95 drop-shadow-lg">{p.title}</span>
              </motion.div>
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-mono">{p.tag}</div>
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a href="#" className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 text-background"><Github className="size-4" /> Code</a>
                <a href="#" className="bg-accent-gradient rounded-full px-4 py-2 text-sm flex items-center gap-2 text-white"><ExternalLink className="size-4" /> Live</a>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full bg-secondary/60">{s}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Experience timeline ---------- */
const exp = [
  { date: "2024 — Now", role: "AI Systems Engineer", company: "Helix Robotics", desc: "Leading edge-ML inference on autonomous surgical instruments." },
  { date: "2022 — 2024", role: "Embedded Engineer", company: "Northwave Labs", desc: "Designed 12-layer PCBs and Rust firmware for industrial IoT." },
  { date: "2020 — 2022", role: "Research Assistant", company: "IIT Bombay — VLSI Lab", desc: "Built neuromorphic accelerator prototypes on FPGA." },
  { date: "2019", role: "Hardware Intern", company: "Bosch", desc: "Sensor fusion for ADAS prototype vehicles." },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="JOURNEY / 04" title={<>A timeline of <span className="text-gradient">teams, tools and turning points</span>.</>}>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-px bg-accent-gradient md:-translate-x-1/2 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
          style={{ bottom: 0 }}
        />
        <ul className="space-y-12">
          {exp.map((e, i) => (
            <motion.li
              key={e.role}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 pl-12 md:pl-0`}
            >
              <span className="absolute left-4 md:left-1/2 top-3 size-4 rounded-full bg-accent-gradient shadow-glow md:-translate-x-1/2 ring-4 ring-background" />
              <div className={i % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}>
                <div className="text-xs font-mono text-[var(--orange)] tracking-widest mb-1">{e.date}</div>
                <div className="glass rounded-2xl p-6 shadow-soft inline-block text-left">
                  <div className="flex items-center gap-2 mb-1"><Briefcase className="size-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">{e.company}</span></div>
                  <h3 className="font-display text-xl font-bold">{e.role}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{e.desc}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Research ---------- */
const research = [
  { Icon: FileText, title: "On-Device Transformers for Bioelectric Signals", venue: "IEEE EMBC 2024", type: "Paper" },
  { Icon: Trophy, title: "Winner — TinyML Hardware Challenge", venue: "Edge Impulse 2023", type: "Award" },
  { Icon: Award, title: "Best Demo — Neuromorphic FPGA Accelerator", venue: "DAC 2023", type: "Award" },
  { Icon: FileText, title: "Sparse Attention on Cortex-M55", venue: "tinyML Summit 2024", type: "Paper" },
];

export function Research() {
  return (
    <Section id="research" eyebrow="RESEARCH / 05" title={<>Papers, awards and <span className="text-gradient">curiosities</span> in print.</>}>
      <div className="grid md:grid-cols-2 gap-5">
        {research.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6 shadow-soft group relative overflow-hidden"
          >
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                 style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--orange) 25%, transparent), transparent 50%)" }} />
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-secondary/60 flex items-center justify-center text-[var(--clay)] shrink-0">
                <r.Icon className="size-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--orange)] mb-1">{r.type}</div>
                <h3 className="font-display text-lg font-bold leading-tight">{r.title}</h3>
                <div className="text-sm text-muted-foreground mt-1">{r.venue}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {[
          { n: 14, l: "Publications" },
          { n: 320, l: "Citations" },
          { n: 9, l: "Conferences" },
          { n: 5, l: "Awards" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-6 text-center shadow-soft">
            <div className="font-display text-4xl font-bold text-gradient"><Counter to={s.n} /></div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
const testis = [
  { name: "Dr. Lena Park", role: "Director, Helix Robotics", quote: "Aarav ships hardware and ML with rare taste — the kind of engineer who quietly raises the ceiling of a whole team." },
  { name: "Prof. R. Iyer", role: "IIT Bombay", quote: "His neuromorphic FPGA work was the most rigorous undergraduate project I've supervised in a decade." },
  { name: "Maya Chen", role: "Founder, Northwave Labs", quote: "He turned a sketch on a napkin into a certified industrial product in nine months. Wild." },
  { name: "Tom Becker", role: "Principal Eng., Bosch", quote: "Calm, exact, and obsessed with latency. Exactly who you want on a sensor stack." },
];

export function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="VOICES / 06" title={<>What collaborators <span className="text-gradient">say</span>.</>}>
      <div className="relative overflow-hidden">
        <div className="flex gap-6 marquee-track w-max">
          {[...testis, ...testis].map((t, i) => (
            <div key={i} className="glass rounded-3xl p-8 w-[360px] md:w-[420px] shrink-0 shadow-soft relative">
              <Quote className="absolute top-5 right-5 size-8 text-[var(--orange)]/30" />
              <p className="text-base leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  return (
    <Section id="contact" eyebrow="CONTACT / 07" title={<>Let's build something <span className="text-gradient">unforgettable</span>.</>}>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground max-w-md">
            I'm currently open to research collaborations, product builds, and the occasional
            late-night napkin sketch. Drop a note — I reply within 48 hours.
          </p>

          <div className="glass rounded-2xl p-6 flex items-center gap-4 shadow-soft">
            <MapPin className="size-5 text-[var(--orange)]" />
            <div>
              <div className="font-medium">Zürich · Mumbai · Remote</div>
              <div className="text-sm text-muted-foreground">CET / IST friendly</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 shadow-soft">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Direct</div>
            <a href="mailto:hello@aarav.dev" className="text-2xl font-display font-bold text-gradient hover:opacity-80 transition-opacity">
              hello@aarav.dev
            </a>
          </div>

          <div className="flex gap-2">
            {["GH", "IN", "X", "DR"].map((s) => (
              <a key={s} href="#" className="size-12 rounded-full glass flex items-center justify-center text-sm font-mono font-bold hover:shadow-glow hover:text-[var(--orange)] transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); }}
          className="glass rounded-3xl p-8 shadow-elegant space-y-5 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 size-60 rounded-full bg-[var(--orange)] opacity-20 blur-3xl pointer-events-none" />
          {[
            { label: "Your name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
          ].map((f) => (
            <FloatingInput key={f.name} {...f} />
          ))}
          <FloatingTextarea label="Tell me about your project" name="msg" />
          <button
            type="submit"
            className="magnetic-btn w-full rounded-full bg-accent-gradient text-white py-3.5 font-medium flex items-center justify-center gap-2 shadow-glow"
          >
            <Send className="size-4" />
            Send message
          </button>
        </form>
      </div>
    </Section>
  );
}

function FloatingInput({ label, type, name }: { label: string; type: string; name: string }) {
  const [val, setVal] = useState("");
  return (
    <div className="relative">
      <input
        type={type} name={name} value={val} onChange={(e) => setVal(e.target.value)}
        className="peer w-full bg-transparent border border-border rounded-xl px-4 pt-5 pb-2 text-sm outline-none focus:border-[var(--orange)] focus:shadow-glow transition-all"
      />
      <label className={`absolute left-4 transition-all pointer-events-none text-muted-foreground ${val ? "top-1 text-[10px] uppercase tracking-widest" : "top-3.5 text-sm"} peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[var(--orange)]`}>
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name }: { label: string; name: string }) {
  const [val, setVal] = useState("");
  return (
    <div className="relative">
      <textarea
        name={name} value={val} onChange={(e) => setVal(e.target.value)} rows={4}
        className="peer w-full bg-transparent border border-border rounded-xl px-4 pt-5 pb-2 text-sm outline-none focus:border-[var(--orange)] focus:shadow-glow transition-all resize-none"
      />
      <label className={`absolute left-4 transition-all pointer-events-none text-muted-foreground ${val ? "top-1 text-[10px] uppercase tracking-widest" : "top-3.5 text-sm"} peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[var(--orange)]`}>
        {label}
      </label>
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="relative mt-20 pt-20 pb-10 px-6 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          d="M0,40 C300,80 600,0 900,40 C1050,60 1150,30 1200,40"
          stroke="url(#wave)" strokeWidth="2" fill="none"
        />
        <defs>
          <linearGradient id="wave" x1="0" x2="1">
            <stop offset="0%" stopColor="#588b8b" />
            <stop offset="100%" stopColor="#f28f3b" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-6 items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-accent-gradient shadow-glow" />
          <div>
            <div className="font-display font-bold">Aarav Mehta</div>
            <div className="text-xs text-muted-foreground">Electronics & AI Engineer</div>
          </div>
        </div>

        <div className="font-display text-4xl md:text-6xl font-bold text-gradient italic">
          — built with intent.
        </div>

        <a
          href="#home"
          className="glass rounded-full size-14 flex items-center justify-center hover:shadow-glow magnetic-btn"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </a>
      </div>

      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Aarav Mehta. All rights reserved.</div>
        <div className="font-mono">v 1.0 · crafted with framer-motion + react</div>
      </div>
    </footer>
  );
}
