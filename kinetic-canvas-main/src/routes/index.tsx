import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/portfolio/Preloader";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import {
  About, Skills, Projects, Experience, Research, Testimonials, Contact, Footer,
} from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav Mehta — Electronics & AI Engineer" },
      { name: "description", content: "Portfolio of Aarav Mehta — building intelligent systems at the intersection of silicon, embedded firmware, and machine learning." },
      { property: "og:title", content: "Aarav Mehta — Electronics & AI Engineer" },
      { property: "og:description", content: "Cinematic portfolio showcasing AI, embedded systems, and creative engineering work." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Research />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
