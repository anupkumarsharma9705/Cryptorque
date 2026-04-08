/**
 * Home.jsx — Fix 2: PairedStack for shared backgrounds
 *
 * Stack structure:
 *   z=1   Hero        (standalone, video bg)
 *   z=2   PairedStack [About z=0, Skills z=1]  — one bg image (group2)
 *   z=4   PairedStack [Projects z=0, Education z=1] — one bg (group3)
 *   z=6   PairedStack [Certs z=0, Contact z=1]  — one bg (group4)
 *
 * Each PairedStack has ONE sticky background that persists across
 * BOTH of its child sections — no seam, no image reset.
 */
import React from "react";
import { StackSection }           from "../components/ui/StackLayout";
import { PairedStack, PairedSection } from "../components/ui/PairedStack";
import ScrollReveal               from "../components/ui/ScrollReveal";

import Hero          from "../components/hero/Hero";
import About         from "../components/about/About";
import Skills        from "../components/skills/Skills";
import Projects      from "../components/projects/Projects";
import Education     from "../components/education/Education";
import Certifications from "../components/gallery/Certifications";
import Contact       from "../components/contact/Contact";

const Divider = () => (
  <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 }}>
    <div style={{
      height:"1px",
      background:"linear-gradient(90deg,transparent,var(--border-accent) 30%,var(--border-accent) 70%,transparent)",
      opacity:.5,
    }} />
  </div>
);

export default function Home() {
  return (
    <>
      {/* ─── z=1 · HERO — standalone video background ─── */}
      <StackSection id="home" zIndex={1}>
        <Hero />
      </StackSection>

      {/* ─── z=2 · ABOUT + SKILLS — ONE shared background ─── */}
      <PairedStack zIndex={2} bgGroup="group2">
        {/*
          PairedSection z-indexes are LOCAL to the pair.
          Skills (z=1) slides over About (z=0) within the shared bg.
        */}
        <PairedSection id="about" zIndex={0}>
          <ScrollReveal variant="fadeUp">
            <About />
          </ScrollReveal>
        </PairedSection>

        <PairedSection id="skills" zIndex={1}>
          <ScrollReveal variant="fadeUp" delay={50}>
            <Skills />
          </ScrollReveal>
        </PairedSection>
      </PairedStack>

      {/* ─── z=4 · PROJECTS + EDUCATION — ONE shared background ─── */}
      <PairedStack zIndex={4} bgGroup="group3">
        <PairedSection id="projects" zIndex={0}>
          <ScrollReveal variant="scaleUp">
            <Projects />
          </ScrollReveal>
        </PairedSection>

        <PairedSection id="education" zIndex={1}>
          <ScrollReveal variant="slideRight" delay={40}>
            <Education />
          </ScrollReveal>
        </PairedSection>
      </PairedStack>

      {/* ─── z=6 · CERTS + CONTACT — ONE shared background ─── */}
      <PairedStack zIndex={6} bgGroup="group4">
        <PairedSection id="certs" zIndex={0}>
          <ScrollReveal variant="fadeIn">
            <Certifications />
          </ScrollReveal>
        </PairedSection>

        <PairedSection id="contact" zIndex={1}>
          <ScrollReveal variant="fadeUp" delay={60}>
            <Contact />
          </ScrollReveal>
        </PairedSection>
      </PairedStack>
    </>
  );
}