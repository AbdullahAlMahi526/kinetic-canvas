import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setHover(!!target.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hover ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.4 }}
      >
        <div className="size-8 rounded-full border border-[var(--orange)] mix-blend-difference" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 900, damping: 40 }}
      >
        <div className="size-1.5 rounded-full bg-[var(--orange)]" />
      </motion.div>
    </>
  );
}
