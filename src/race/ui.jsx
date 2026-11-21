import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Icons } from './icons';

/* ═══════════════════════════════════════════════════════════════════
   MOTION HELPERS
   ═══════════════════════════════════════════════════════════════════ */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal({ threshold = 0, once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          /* Anything that has already crossed the viewport (for example after
             a G-jump or an anchor landing) should never stay invisible. */
          const passed = entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || passed) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      /* The oversized top margin counts content already above the viewport
         as seen, so a G-jump or anchor landing never leaves skipped modules
         transparent. The bottom margin delays reveals until just inside. */
      { threshold, rootMargin: '100000px 0px -6% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, visible };
}

export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...props
}) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      data-reveal
      className={`${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OVERLAY HELPERS
   ═══════════════════════════════════════════════════════════════════ */

export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

export function useFocusTrap(active, ref) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const node = ref.current;
    const previous = document.activeElement;

    const getFocusable = () =>
      Array.from(
        node.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const raf = requestAnimationFrame(() => {
      const items = getFocusable();
      (items[0] || node).focus?.();
    });

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, [active, ref]);
}

export function useEscape(active, handler) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') handler();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, handler]);
}

export const isTypingTarget = (target) => {
  if (!target) return false;
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
};

export const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/i.test(
    (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      navigator.userAgent,
  );

export const modKey = isMac ? '⌘' : 'Ctrl';

/* ═══════════════════════════════════════════════════════════════════
   NAVIGATION + TIME
   ═══════════════════════════════════════════════════════════════════ */

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}

export function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return `${formatter.format(now)} IST`;
  }, [now]);
}

/* ═══════════════════════════════════════════════════════════════════
   CLIPBOARD
   ═══════════════════════════════════════════════════════════════════ */

export async function copyText(value) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }

  try {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════ */

export function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  children,
  ...props
}) {
  const Tag = as || (href ? 'a' : 'button');
  const external = Boolean(href && /^https?:/i.test(href));
  const isButton = Tag === 'button';

  return (
    <Tag
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...(isButton && !props.type ? { type: 'button' } : {})}
      {...props}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__label">{children}</span>
      {iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
    </Tag>
  );
}

export function Tag({ color = 'muted', dot = false, children, className = '' }) {
  return (
    <span className={`tag tag--${color} ${className}`.trim()}>
      {dot && <span className="tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

export function Kbd({ children, className = '' }) {
  return <kbd className={`kbd ${className}`.trim()}>{children}</kbd>;
}

export function StatusDot({ color = 'green', pulse = false, label }) {
  return (
    <span className={`status-dot status-dot--${color}${pulse ? ' is-pulsing' : ''}`}>
      <span className="status-dot__dot" aria-hidden="true" />
      {label && <span className="status-dot__label">{label}</span>}
    </span>
  );
}

export function SectionHeader({ index, label, title, description, aside }) {
  return (
    <div className="section-head">
      <div className="section-head__main">
        <div className="eyebrow section-head__eyebrow">
          <span className="section-head__index">{index}</span>
          <span className="section-head__slash">/</span>
          <span>{label}</span>
        </div>
        <h2 className="section-head__title">{title}</h2>
        {description && <p className="section-head__desc">{description}</p>}
      </div>
      {aside && <div className="section-head__aside">{aside}</div>}
    </div>
  );
}

export function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied', className = '' }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      className={`copy-btn ${className}`.trim()}
      onClick={handleCopy}
      aria-live="polite"
    >
      {copied ? <Icons.Check size={14} /> : <Icons.Copy size={14} />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DATA VISUALS
   ═══════════════════════════════════════════════════════════════════ */

export function Sparkline({
  data = [34, 38, 31, 42, 36, 45, 40, 44, 39, 47, 43, 47.6],
  width = 240,
  height = 64,
  color = 'var(--cyan)',
  className = '',
}) {
  const rawId = useId();
  const gradientId = `spark-${rawId.replace(/[:]/g, '')}`;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padX = 4;
  const padY = 6;
  const points = data.map((value, index) => {
    const x = padX + (index / (data.length - 1)) * (width - padX * 2);
    const y = height - padY - ((value - min) / range) * (height - padY * 2);
    return [x, y];
  });
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${width - padX} ${height} L${padX} ${height} Z`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      className={`sparkline ${className}`.trim()}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        className="sparkline__line"
        d={line}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r="2.4" fill={color} />
    </svg>
  );
}

export function Gauge({ value = 100, label = 'DETECTION', size = 108, color = 'var(--cyan)' }) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);

  return (
    <div
      className="gauge"
      style={{ width: size, height: size, '--gauge-color': color }}
      role="img"
      aria-label={`${label}: ${value}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line-2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="gauge__ring"
        />
      </svg>
      <span className="gauge__value">{value}%</span>
      <span className="gauge__label">{label}</span>
    </div>
  );
}

export function Metric({ value, unit, label, color = 'default' }) {
  return (
    <div className={`metric metric--${color}`}>
      <div className="metric__value">
        {value}
        {unit && <span className="metric__unit">{unit}</span>}
      </div>
      <div className="metric__label">{label}</div>
    </div>
  );
}

export function StatusLine({ children, color = 'green' }) {
  return (
    <span className={`status-line status-line--${color}`}>
      <span className="status-line__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
