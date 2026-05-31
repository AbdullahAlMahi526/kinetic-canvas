import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 420);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 140);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="absolute inset-0 bg-hero opacity-60" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative size-28"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-accent-gradient shadow-glow"
                animate={{ rotate: 360, borderRadius: ["28%", "50%", "28%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-2 rounded-xl glass flex items-center justify-center">
                <span className="font-display text-3xl font-bold text-gradient">A</span>
              </div>
            </motion.div>
            <div className="flex flex-col items-center gap-3 w-64">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full bg-accent-gradient"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="flex w-full justify-between text-xs font-mono tracking-widest text-muted-foreground">
                <span>LOADING SYSTEMS</span>
                <span className="text-foreground">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
