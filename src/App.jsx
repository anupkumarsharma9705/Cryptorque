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
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./Layout";
import Home   from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}