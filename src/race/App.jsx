import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  ARTIFACTS,
  NAV,
  PROFILE,
  SHORTCUTS,
} from './data';
import { Icons } from './icons';
import {
  Kbd,
  StatusDot,
  copyText,
  isMac,
  isTypingTarget,
  modKey,
  scrollToId,
  useClock,
  useEscape,
  useFocusTrap,
  useLockBodyScroll,
} from './ui';
import { ThemeToggle, useTheme } from './ThemeProvider';
import CommandPalette from './CommandPalette';
import Hero from './Hero';
import About from './About';
import Stack from './Stack';
import Projects from './Projects';
import Artifacts from './Artifacts';
import Education from './Education';
import Certifications from './Certifications';
import Contact from './Contact';

const GOTO = {
  s: 'sys',
  p: 'profile',
  t: 'stack',
  g: 'gateways',
  a: 'artifacts',
  l: 'log',
  c: 'certs',
  u: 'uplink',
};

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR — owns scroll progress so the page does not re-render
   ═══════════════════════════════════════════════════════════════════ */

function NavBar({ active, onNavigate, onOpenPalette, onOpenMenu }) {
  const [progress, setProgress] = useState(0);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      setProgress(next);
      setCondensed(window.scrollY > 24);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={`nav${condensed ? ' is-condensed' : ''}`}>
      <div className="wrap nav__inner">
        <a
          className="nav__brand"
          href="#sys"
          onClick={(event) => {
            event.preventDefault();
            onNavigate('sys');
          }}
          aria-label={`${PROFILE.name} — back to top`}
        >
          <span className="nav__mark" aria-hidden="true">
            <img src="/race/wolf-128.webp" alt="" width="26" height="26" />
          </span>
          <span className="nav__wordmark">
            <strong>{PROFILE.name}</strong>
            <small>{PROFILE.role}</small>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary navigation">
          {NAV.map((item) => {
            const current = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav__link${current ? ' is-active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={current ? 'location' : undefined}
              >
                <span className="nav__link-index">{item.index}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__search"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Icons.Search size={14} />
            <span className="nav__search-label">SEARCH</span>
            <Kbd>{modKey} K</Kbd>
          </button>

          <ThemeToggle compact />

          <button
            type="button"
            className="nav__menu"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-controls="mobile-nav"
          >
            <Icons.Menu size={18} />
          </button>
        </div>
      </div>

      <div className="nav__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STATUS BAR
   ═══════════════════════════════════════════════════════════════════ */

function StatusBar({ active, gPending, onOpenShortcuts, onTop }) {
  const clock = useClock();
  const { theme } = useTheme();
  const current = NAV.find((item) => item.id === active) || NAV[0];

  return (
    <div className="statusbar">
      <div className="statusbar__group">
        <StatusDot color="green" pulse label="ONLINE" />
        <span className="statusbar__sep" aria-hidden="true">/</span>
        <span className="statusbar__item">
          MODULE <b>{current.title}</b>
        </span>
      </div>

      <div className="statusbar__group statusbar__group--mid">
        <span className="statusbar__item">
          THEME <b>{theme.toUpperCase()}</b>
        </span>
        <span className="statusbar__sep" aria-hidden="true">/</span>
        <span className="statusbar__item">
          HYD <b>{clock}</b>
        </span>
        <span className="statusbar__sep" aria-hidden="true">/</span>
        <span className="statusbar__item">
          BUILD <b className="statusbar__ok">PASS</b>
        </span>
        <span className="statusbar__sep" aria-hidden="true">/</span>
        <span className="statusbar__item">v{PROFILE.version}</span>
      </div>

      <div className="statusbar__group statusbar__group--end">
        {gPending && (
          <span className="statusbar__pending mono">
            G<span className="statusbar__blink">_</span>
          </span>
        )}
        <button
          type="button"
          className="statusbar__btn"
          onClick={onOpenShortcuts}
          aria-label="Show keyboard shortcuts"
        >
          <Kbd>?</Kbd>
          <span>SHORTCUTS</span>
        </button>
        <button
          type="button"
          className="statusbar__btn statusbar__btn--icon"
          onClick={onTop}
          aria-label="Back to top"
        >
          <Icons.ArrowDown size={12} style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE DRAWER
   ═══════════════════════════════════════════════════════════════════ */

function Drawer({ open, active, onClose, onNavigate }) {
  const panelRef = useRef(null);

  useLockBodyScroll(open);
  useEscape(open, onClose);
  useFocusTrap(open, panelRef);

  if (!open) return null;

  return createPortal(
    <div
      className="drawer-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="drawer"
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="drawer__head">
          <span className="drawer__mark" aria-hidden="true">
            <img src="/race/wolf-128.webp" alt="" width="24" height="24" />
          </span>
          <span className="drawer__title mono">NAV_MODULES</span>
          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <Icons.Close size={17} />
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Portfolio sections">
          {NAV.map((item) => {
            const current = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`drawer__link${current ? ' is-active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={current ? 'location' : undefined}
              >
                <span className="drawer__index mono">{item.index}</span>
                <span className="drawer__link-main">
                  <span className="drawer__link-label">{item.label}</span>
                  <span className="drawer__link-title mono">{item.title}</span>
                </span>
                <Icons.ArrowRight size={14} />
              </button>
            );
          })}
        </nav>

        <div className="drawer__foot">
          <ThemeToggle />
          <a className="drawer__mail" href={`mailto:${PROFILE.email}`}>
            <Icons.Mail size={14} />
            <span>{PROFILE.email}</span>
          </a>
          <div className="drawer__social">
            <a href={PROFILE.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
              <Icons.GitHub size={17} />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
              <Icons.LinkedIn size={17} />
            </a>
            <a href={PROFILE.x} target="_blank" rel="noreferrer noopener" aria-label="X">
              <Icons.XLogo size={16} />
            </a>
          </div>
          <p className="drawer__note mono">ESC TO CLOSE · v{PROFILE.version}</p>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

/* ═══════════════════════════════════════════════════════════════════
   KEYBOARD MAP
   ═══════════════════════════════════════════════════════════════════ */

function ShortcutSheet({ open, onClose }) {
  const panelRef = useRef(null);

  useLockBodyScroll(open);
  useEscape(open, onClose);
  useFocusTrap(open, panelRef);

  if (!open) return null;

  return createPortal(
    <div
      className="palette palette--sheet"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="sheet"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <div className="sheet__head">
          <span className="palette__mark" aria-hidden="true">?</span>
          <span className="sheet__title mono" id="shortcuts-title">KEYBOARD_MAP</span>
          <span className="sheet__status mono">LOCAL</span>
          <button
            type="button"
            className="sheet__close"
            onClick={onClose}
            aria-label="Close keyboard shortcuts"
          >
            <Icons.Close size={16} />
          </button>
        </div>

        <div className="sheet__grid">
          {SHORTCUTS.map((shortcut) => {
            const keys = !isMac && shortcut.alt ? shortcut.alt : shortcut.keys;
            return (
              <div className="sheet__row" key={shortcut.label}>
                <span className="sheet__label">{shortcut.label}</span>
                <span className="sheet__keys">
                  {keys.map((key, index) => (
                    <Kbd key={`${shortcut.label}-${key}-${index}`}>{key}</Kbd>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        <p className="sheet__foot mono">
          Shortcuts pause while typing in a field. Tab moves focus. Escape closes any
          overlay.
        </p>
      </div>
    </div>,
    document.body,
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════ */

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const [activeSection, setActiveSection] = useState('sys');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [artifactTab, setArtifactTab] = useState(ARTIFACTS[0].id);
  const [gPending, setGPending] = useState(false);
  const [toast, setToast] = useState('');

  const toastTimer = useRef(0);
  const gotoRef = useRef({ active: false, timer: 0 });

  const notify = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 3000);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(toastTimer.current);
    window.clearTimeout(gotoRef.current.timer);
  }, []);

  const navigate = useCallback((id) => {
    setMobileOpen(false);
    setActiveSection(id);
    scrollToId(id);
  }, []);

  const openArtifact = useCallback((id) => {
    setArtifactTab(id);
    setActiveSection('artifacts');
    scrollToId('artifacts');
  }, []);

  const openPalette = useCallback(() => {
    setShortcutsOpen(false);
    setMobileOpen(false);
    setPaletteOpen(true);
  }, []);

  const clearGoto = useCallback(() => {
    gotoRef.current.active = false;
    window.clearTimeout(gotoRef.current.timer);
    setGPending(false);
  }, []);

  /* ── Fragment landing ──────────────────────────────────────────── */
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (!id || !NAV.some((item) => item.id === id)) return;
      const el = document.getElementById(id);
      if (!el) return;
      setActiveSection(id);
      /* The browser may try to land on the fragment before React has
         mounted the section, so re-apply it once layout exists. */
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  /* ── Active section tracking ───────────────────────────────────── */
  useEffect(() => {
    const nodes = NAV
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!nodes.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-32% 0px -52% 0px', threshold: [0, 0.05, 0.2] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  /* ── Global keyboard layer ─────────────────────────────────────── */
  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault();
        if (event.repeat) return;
        if (paletteOpen) {
          setPaletteOpen(false);
        } else {
          openPalette();
        }
        return;
      }

      if (isTypingTarget(event.target)) return;
      if (paletteOpen || shortcutsOpen || mobileOpen) return;
      if (event.repeat) return;

      if (event.key === 'Escape') {
        clearGoto();
        return;
      }

      if (gotoRef.current.active) {
        event.preventDefault();
        const target = GOTO[key];
        if (target) navigate(target);
        clearGoto();
        return;
      }

      if (key === 'g') {
        event.preventDefault();
        gotoRef.current.active = true;
        setGPending(true);
        window.clearTimeout(gotoRef.current.timer);
        gotoRef.current.timer = window.setTimeout(clearGoto, 1700);
        return;
      }

      if (key === 't') {
        event.preventDefault();
        toggleTheme();
        return;
      }

      if (event.key === '?') {
        event.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      if (event.key === '/') {
        event.preventDefault();
        openPalette();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    paletteOpen,
    shortcutsOpen,
    mobileOpen,
    toggleTheme,
    navigate,
    openPalette,
    clearGoto,
  ]);

  /* ── Command palette registry ──────────────────────────────────── */
  const commands = useMemo(() => {
    const navigation = NAV.map((item) => ({
      id: `nav-${item.id}`,
      group: 'navigate',
      label: item.title,
      meta: `${item.index} · ${item.label}`,
      keywords: `${item.label} ${item.title} ${item.id}`,
      icon: <Icons.ArrowRight size={15} />,
      run: () => navigate(item.id),
    }));

    const actions = [
      {
        id: 'toggle-theme',
        group: 'action',
        label: 'Toggle theme',
        meta: theme === 'dark' ? 'DARK → LIGHT' : 'LIGHT → DARK',
        keywords: 'theme dark light appearance colour',
        icon: theme === 'dark' ? <Icons.Sun size={15} /> : <Icons.Moon size={15} />,
        run: toggleTheme,
      },
      {
        id: 'open-shortcuts',
        group: 'action',
        label: 'Show keyboard shortcuts',
        meta: '?',
        keywords: 'keyboard keys help map',
        icon: <Icons.Keyboard size={15} />,
        run: () => setShortcutsOpen(true),
      },
      {
        id: 'copy-email',
        group: 'action',
        label: 'Copy email address',
        meta: PROFILE.email,
        keywords: 'mail contact copy clipboard',
        icon: <Icons.Copy size={15} />,
        run: async () => {
          const ok = await copyText(PROFILE.email);
          notify(ok ? 'Email copied to clipboard.' : 'Copy blocked — the address is in Uplink.');
        },
      },
      {
        id: 'request-resume',
        group: 'action',
        label: 'Request résumé',
        meta: 'MAILTO',
        keywords: 'cv resume pdf request',
        icon: <Icons.FileText size={15} />,
        run: () => {
          window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
            '[Portfolio] Résumé request',
          )}`;
        },
      },
      {
        id: 'artifact-k6',
        group: 'action',
        label: 'Open k6 load-test evidence',
        meta: 'ARTIFACT 03',
        keywords: 'performance latency load test telemetry',
        icon: <Icons.Pulse size={15} />,
        run: () => openArtifact('load-test'),
      },
      {
        id: 'artifact-threat',
        group: 'action',
        label: 'Open STRIDE threat model',
        meta: 'ARTIFACT 02',
        keywords: 'security stride threats attack surface',
        icon: <Icons.Shield size={15} />,
        run: () => openArtifact('threat-model'),
      },
      {
        id: 'artifact-adr',
        group: 'action',
        label: 'Open architecture decisions',
        meta: 'ARTIFACT 04',
        keywords: 'adr records tradeoffs redis idempotency',
        icon: <Icons.FileText size={15} />,
        run: () => openArtifact('adr-log'),
      },
    ];

    const external = [
      {
        id: 'external-github',
        group: 'external',
        label: 'GitHub',
        meta: PROFILE.githubLabel,
        keywords: 'source code repositories',
        icon: <Icons.GitHub size={15} />,
        run: () => window.open(PROFILE.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'external-linkedin',
        group: 'external',
        label: 'LinkedIn',
        meta: PROFILE.linkedinLabel,
        keywords: 'linkedin professional',
        icon: <Icons.LinkedIn size={15} />,
        run: () => window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'external-x',
        group: 'external',
        label: 'X / Twitter',
        meta: PROFILE.xLabel,
        keywords: 'twitter social',
        icon: <Icons.XLogo size={15} />,
        run: () => window.open(PROFILE.x, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'external-email',
        group: 'external',
        label: 'Email Anup',
        meta: PROFILE.email,
        keywords: 'mail contact',
        icon: <Icons.Mail size={15} />,
        run: () => { window.location.href = `mailto:${PROFILE.email}`; },
      },
    ];

    return [...navigation, ...actions, ...external];
  }, [theme, toggleTheme, navigate, openArtifact, notify]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>

      <NavBar
        active={activeSection}
        onNavigate={navigate}
        onOpenPalette={openPalette}
        onOpenMenu={() => setMobileOpen(true)}
      />

      <main id="main">
        <Hero onOpenPalette={openPalette} />
        <About />
        <Stack />
        <Projects onOpenArtifact={openArtifact} />
        <Artifacts activeTab={artifactTab} setActiveTab={setArtifactTab} />
        <Education />
        <Certifications />
        <Contact notify={notify} />
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <div className="footer__brand">
            <span className="footer__mark" aria-hidden="true">
              <img src="/race/wolf-128.webp" alt="" width="34" height="34" />
            </span>
            <div>
              <strong>{PROFILE.name}</strong>
              <span className="mono">{PROFILE.role} · {PROFILE.focus}</span>
            </div>
          </div>

          <nav className="footer__links" aria-label="Footer">
            <button type="button" onClick={() => navigate('sys')}>
              TOP <Icons.ArrowDown size={12} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <a href={PROFILE.github} target="_blank" rel="noreferrer noopener">GITHUB</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener">LINKEDIN</a>
            <a href={`mailto:${PROFILE.email}`}>EMAIL</a>
          </nav>
        </div>

        <div className="wrap footer__base mono">
          <span>BUILD {PROFILE.version} · REACT + VITE · NO ANALYTICS</span>
          <span>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()} · HYDERABAD, IN</span>
        </div>
      </footer>

      <StatusBar
        active={activeSection}
        gPending={gPending}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        onTop={() => navigate('sys')}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />

      <ShortcutSheet open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      <Drawer
        open={mobileOpen}
        active={activeSection}
        onClose={() => setMobileOpen(false)}
        onNavigate={navigate}
      />

      {toast && (
        <div className="toast" role="status">
          <Icons.CheckCircle size={15} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
