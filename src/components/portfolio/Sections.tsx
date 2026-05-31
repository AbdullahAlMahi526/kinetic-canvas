import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Brain, Cpu, Code2, CircuitBoard, Wrench, FlaskConical,
  Download, ExternalLink, Github, MapPin, Send,
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
    <Section id="about" eyebrow="ABOUT / 01" title={<>An engineer who treats <span className="text-gradient">circuits, code and creativity</span> as one craft.</>}>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm <span className="text-foreground font-medium">Abdullah Al Mahi</span>, an Electrical, Electronics and
            Communication Engineering undergraduate at{" "}
            <span className="text-foreground font-medium">Military Institute of Science and Technology (MIST)</span>,
            Dhaka. I'm deeply interested in Electronics, Machine Learning, and Embedded Systems.
          </p>
          <p>
            Currently serving as an <span className="text-foreground font-medium">Associate Director (Membership Driven Program)</span> at
            IEEE MIST Student Branch and as an <span className="text-foreground font-medium">Executive Member (Technical)</span> at MIST Robotics Club.
            I'm passionate about building real-world systems that sit at the intersection of hardware and intelligence.
          </p>
          <p>
            Alongside engineering, I'm experienced in graphic design using Adobe Illustrator and Photoshop —
            because great engineering deserves great presentation.
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
              { n: 3, s: "+", l: "Projects" },
              { n: 2, s: "+", l: "Leadership Roles" },
              { n: 3, s: ".92", l: "Current CGPA" },
            ].map((x) => (
              <div key={x.l} className="glass rounded-2xl p-5 shadow-soft">
                <div className="font-display text-4xl font-bold text-gradient"><Counter to={x.n} suffix={x.s} /></div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{x.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education timeline */}
        <div className="glass rounded-3xl p-8 shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-60 rounded-full bg-[var(--orange)] opacity-20 blur-3xl" />
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--orange)] mb-5">
            <GraduationCap className="size-4" /> EDUCATION
          </div>
          <ul className="space-y-6 relative">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {[
              { year: "2023 — 2027 (Expected)", title: "BSc in EECE", place: "MIST, Dhaka · CGPA 3.92 / 4.00" },
              { year: "2022", title: "Higher Secondary Certificate (HSC)", place: "BAF Shaheen College Kurmitola · GPA 5.00 / 5.00" },
              { year: "2020", title: "Secondary School Certificate (SSC)", place: "BAF Shaheen College Kurmitola · GPA 5.00 / 5.00" },
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
  { Icon: Code2, name: "Programming", items: ["C", "C++", "Python", "MATLAB"], pct: 85 },
  { Icon: Brain, name: "AI / ML", items: ["Machine Learning", "Python ML libs", "Data Analysis"], pct: 78 },
  { Icon: CircuitBoard, name: "EDA & Simulation", items: ["Cadence Virtuoso", "Proteus", "KiCAD", "Orcad", "PSPICE", "ETAP"], pct: 82 },
  { Icon: Cpu, name: "Microcontrollers", items: ["Arduino", "ESP32"], pct: 80 },
  { Icon: Wrench, name: "CAD & Design", items: ["AutoCAD Electrical", "Microwind", "Dsch2", "Capture CIS"], pct: 75 },
  { Icon: FlaskConical, name: "Creative Tools", items: ["Adobe Illustrator", "Adobe Photoshop", "MS Office Suite"], pct: 88 },
];

const marquee = ["Python", "C++", "MATLAB", "ESP32", "Arduino", "KiCAD", "Cadence", "Proteus", "PSPICE", "Illustrator", "Machine Learning", "ETAP"];

export function Skills() {
  return (
    <Section id="skills" eyebrow="STACK / 02" title={<>A toolkit spanning <span className="text-gradient">silicon, software & design</span>.</>}>
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
  {
    tag: "Hardware",
    title: "VTOL Aircraft",
    desc: "Part of a multidisciplinary team developing a functional VTOL prototype, contributing to control electronics and avionics system design.",
    stack: ["Electronics", "Control Systems", "ESP32"],
    color: "from-[var(--teal)] to-[var(--orange)]"
  },
  {
    tag: "Research",
    title: "SRAM Analysis",
    desc: "Comprehensive simulations using Cadence Virtuoso analyzing Static Noise Margin and power consumption across 6T, 8T, 10T, and 12T SRAM configurations comparing CNFET and CMOS technologies.",
    stack: ["Cadence Virtuoso", "CNFET", "CMOS"],
    color: "from-[var(--orange)] to-[var(--clay)]"
  },
  {
    tag: "Software",
    title: "FormSense",
    desc: "MATLAB-based biomechanical form assessment application analyzing 6-DoF wrist-IMU sensor data to provide phase-graded form assessment for resistance training.",
    stack: ["MATLAB", "IMU Sensors", "Biomechanics"],
    color: "from-[var(--clay)] to-[var(--teal)]"
  },
];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Hardware", "Research", "Software"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <Section id="projects" eyebrow="WORK / 03" title={<>Selected <span className="text-gradient">projects</span> that shaped my thinking.</>}>
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
                <span className="font-display text-4xl md:text-5xl font-bold text-white/95 drop-shadow-lg text-center px-4">{p.title}</span>
              </motion.div>
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-mono">{p.tag}</div>
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a href="#" className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 text-background"><Github className="size-4" /> Code</a>
                <a href="#" className="bg-accent-gradient rounded-full px-4 py-2 text-sm flex items-center gap-2 text-white"><ExternalLink className="size-4" /> Details</a>
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
  {
    date: "June 2025 — Present",
    role: "Associate Director (Membership Driven Program)",
    company: "IEEE MIST Student Branch",
    desc: "Orchestrated a 12-day 'SolidWorks for Engineers' online training workshop, managing promotional campaigns, registration logistics, and live session support. Co-organized the 2025 IEEE APS YP Ambassadors Talk on advanced mm-Wave wireless systems, coordinating an international technical seminar with multiple regional IEEE chapters."
  },
  {
    date: "June 2025 — Present",
    role: "Executive Member (Technical)",
    company: "MIST Robotics Club",
    desc: "Key organizer for 'ROBOLUTION 2025', a flagship national-level robotics festival hosting over 2,000 participants across 12 technical segments. Mentored junior volunteers and facilitated cross-team communication. Recognized by the Head of the EECE Department for exceptional dedication and problem-solving."
  },
  {
    date: "May 2023 — July 2025",
    role: "Academic Project Researcher",
    company: "Military Institute of Science and Technology",
    desc: "Worked on multiple research projects including VTOL Aircraft Development, SRAM stability analysis using Cadence Virtuoso, and the FormSense biomechanical assessment application."
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="JOURNEY / 04" title={<>A timeline of <span className="text-gradient">leadership, projects and turning points</span>.</>}>
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

/* ---------- Honors & Awards (replaces Research) ---------- */
const honors = [
  { Icon: Trophy, title: "MIST Dean's List 2024", venue: "Faculty of ECE — CGPA 3.88", type: "Award" },
  { Icon: Trophy, title: "MIST Dean's List 2023", venue: "Faculty of ECE — CGPA 3.91", type: "Award" },
  { Icon: Award, title: "ROBOLUTION 2025 Organizer", venue: "MIST Robotics Club — 2,000+ Participants", type: "Achievement" },
  { Icon: FileText, title: "IEEE APS YP Ambassadors Talk", venue: "2025 — mm-Wave Wireless Systems Seminar", type: "Event" },
];

export function Research() {
  return (
    <Section id="research" eyebrow="HONORS / 05" title={<>Awards, achievements and <span className="text-gradient">milestones</span>.</>}>
      <div className="grid md:grid-cols-2 gap-5">
        {honors.map((r, i) => (
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
          { n: 3, l: "Projects" },
          { n: 2, l: "Dean's Lists" },
          { n: 2, l: "Leadership Roles" },
          { n: 2000, l: "Event Participants" },
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

/* ---------- Testimonials — removed, kept as empty export for compatibility ---------- */
export function Testimonials() {
  return null;
}

/* ---------- Contact ---------- */
export function Contact() {
  return (
    <Section id="contact" eyebrow="CONTACT / 06" title={<>Let's build something <span className="text-gradient">meaningful together</span>.</>}>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground max-w-md">
            I'm currently open to internships, research collaborations, and exciting engineering projects.
            Feel free to reach out — I reply promptly!
          </p>

          <div className="glass rounded-2xl p-6 flex items-center gap-4 shadow-soft">
            <MapPin className="size-5 text-[var(--orange)]" />
            <div>
              <div className="font-medium">55/8-A, North Manikdi, Dhaka-1206</div>
              <div className="text-sm text-muted-foreground">Bangladesh (GMT+6)</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 shadow-soft">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Email</div>
            <a href="mailto:abdullahmahi526@gmail.com" className="text-xl font-display font-bold text-gradient hover:opacity-80 transition-opacity">
              abdullahmahi526@gmail.com
            </a>
          </div>

          <div className="glass rounded-2xl p-6 shadow-soft">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Phone</div>
            <a href="tel:01518659236" className="text-xl font-display font-bold hover:opacity-80 transition-opacity">
              01518659236
            </a>
          </div>

          <div className="flex gap-2">
            <a href="https://www.linkedin.com/in/aamahi" target="_blank" rel="noreferrer"
               className="px-4 h-12 rounded-full glass flex items-center justify-center text-sm font-mono font-bold hover:shadow-glow hover:text-[var(--orange)] transition-all">
              LinkedIn
            </a>
            <a href="#"
               className="px-4 h-12 rounded-full glass flex items-center justify-center text-sm font-mono font-bold hover:shadow-glow hover:text-[var(--orange)] transition-all">
              GitHub
            </a>
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
          <FloatingTextarea label="Tell me about your project or idea" name="msg" />
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
            <div className="font-display font-bold">Abdullah Al Mahi</div>
            <div className="text-xs text-muted-foreground">EECE Undergraduate · MIST</div>
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
        <div>© {new Date().getFullYear()} Abdullah Al Mahi. All rights reserved.</div>
        <div className="font-mono">v 1.0 · crafted with framer-motion + react</div>
      </div>
    </footer>
  );
}
