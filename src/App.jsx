/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────
 * ThemeProvider wraps EVERYTHING — Layout, Navbar, and all pages
 * all read from the same context. This is what eliminates theme lag.
 *
 * Tree structure:
 *   <ThemeProvider>          ← theme state lives here
 *     <Layout>               ← navbar reads useTheme() directly
 *       <Home>               ← sections read useTheme() directly
 *         <StackSection>
 *           <Hero />
 *           ...
 * ─────────────────────────────────────────────────────────────────
 */
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from 'react';
import Layout from "./Layout";
import Home   from "./pages/Home";

export default function App() {
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.sr-hidden-fadeUp')
    .forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, []);

  return (
    <ThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}