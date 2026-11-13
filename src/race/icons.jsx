/* ═══════════════════════════════════════════════════════════════════
   ICONS — one family, one stroke. Inline SVG, no icon dependency.
   ═══════════════════════════════════════════════════════════════════ */

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

const Svg = ({ size = 18, children, ...props }) => (
  <svg {...base} width={size} height={size} {...props}>
    {children}
  </svg>
);

export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);

export const ArrowDown = (p) => (
  <Svg {...p}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </Svg>
);

export const Search = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

export const Sun = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const Moon = (p) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
);

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M3 6h18M3 12h18M3 18h12" />
  </Svg>
);

export const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const Copy = (p) => (
  <Svg {...p}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M15 9V5.5A1.5 1.5 0 0 0 13.5 4h-9A1.5 1.5 0 0 0 3 5.5v9A1.5 1.5 0 0 0 4.5 16H9" />
  </Svg>
);

export const Check = (p) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
);

export const GitHub = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.3 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.4 18.3 4.7 18.3 4.7c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.3 11.3 0 0 0 12 .7Z" />
  </svg>
);

export const LinkedIn = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.25h4V21H3V9.25Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9.25Z" />
  </svg>
);

export const XLogo = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.8L17.7 3Zm-1.1 16.1h1.7L7.4 4.8H5.6l11 14.3Z" />
  </svg>
);

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Svg>
);

export const Terminal = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="m7 9 3 3-3 3M13 15h4" />
  </Svg>
);

export const Shield = (p) => (
  <Svg {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const Pulse = (p) => (
  <Svg {...p}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </Svg>
);

export const FileText = (p) => (
  <Svg {...p}>
    <path d="M6 2.5h8l4 4V21H6V2.5Z" />
    <path d="M14 2.5v4h4M9 12h6M9 16h6" />
  </Svg>
);

export const Database = (p) => (
  <Svg {...p}>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </Svg>
);

export const Layers = (p) => (
  <Svg {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" />
  </Svg>
);

export const Lock = (p) => (
  <Svg {...p}>
    <rect x="4.5" y="10" width="15" height="10" rx="1.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
  </Svg>
);

export const Globe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
  </Svg>
);

export const ExternalLink = (p) => (
  <Svg {...p}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M19 14v5.5A1.5 1.5 0 0 1 17.5 21h-13A1.5 1.5 0 0 1 3 19.5v-13A1.5 1.5 0 0 1 4.5 5H10" />
  </Svg>
);

export const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const Keyboard = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M7 14h10" />
  </Svg>
);

export const Gauge = (p) => (
  <Svg {...p}>
    <path d="M4 18a9 9 0 1 1 16 0" />
    <path d="m12 13 4-3" />
    <circle cx="12" cy="13" r="1.5" />
  </Svg>
);

export const Code = (p) => (
  <Svg {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
  </Svg>
);

export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const CornerDownLeft = (p) => (
  <Svg {...p}>
    <path d="M20 5v7a3 3 0 0 1-3 3H5M9 11l-4 4 4 4" />
  </Svg>
);

export const AlertTriangle = (p) => (
  <Svg {...p}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 9v5M12 17.5h.01" />
  </Svg>
);

export const CheckCircle = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </Svg>
);

export const Cpu = (p) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="1.5" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" />
  </Svg>
);

export const Zap = (p) => (
  <Svg {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </Svg>
);

export const Icons = {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Search,
  Sun,
  Moon,
  Menu,
  Close,
  Copy,
  Check,
  GitHub,
  LinkedIn,
  XLogo,
  Mail,
  Terminal,
  Shield,
  Pulse,
  FileText,
  Database,
  Layers,
  Lock,
  Globe,
  ExternalLink,
  ChevronDown,
  Keyboard,
  Gauge,
  Code,
  MapPin,
  Clock,
  CornerDownLeft,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Zap,
};

export default Icons;
