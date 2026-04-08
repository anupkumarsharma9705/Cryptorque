/**
 * assets.config.js
 * ─────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all background assets.
 *
 * HOW TO USE:
 *   1. YouTube Video IDs — paste ONLY the ID part of the URL.
 *      e.g. for https://www.youtube.com/watch?v=dM3SRAbFT-o
 *      use: "dM3SRAbFT-o"
 *
 *   2. Image paths — place images in /public/assets/backgrounds/
 *      then reference as "/assets/backgrounds/your-image.jpg"
 *      (no import needed — public/ folder is served as root)
 *
 *   3. Cubic-bezier — ONE place to change the wipe speed/feel.
 *      Current: [0.76, 0, 0.24, 1] — heavy, mechanical
 *      Faster:  [0.4, 0, 0.2, 1]
 *      Smoother:[0.22, 1, 0.36, 1]
 * ─────────────────────────────────────────────────────────────────
 */

/* ══════════════════════════════════════════════════════════════
   ① WIPE TRANSITION EASING
   Change ONCE here — applies to both nav wipe AND skill wipe.
══════════════════════════════════════════════════════════════ */
export const WIPE_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

/* Wipe duration in milliseconds */
export const WIPE_DURATION_MS = 520;

/* ══════════════════════════════════════════════════════════════
   ② HERO BACKGROUND VIDEOS
   Paste YouTube video IDs (NOT full URLs) below.
   The embed URL is built automatically — this fixes the
   "Video Unavailable" error from using watch links.
══════════════════════════════════════════════════════════════ */
export const HERO_VIDEO = {
  // ▼ Dark mode hero video ID
  dark:  "vbn9otnAjCg",   // e.g. "dM3SRAbFT-o"
  // ▼ Light mode hero video ID (can be the same or different)
  light: "",  // e.g. "JbsI0_9MxOM"
};

/* ══════════════════════════════════════════════════════════════
   ③ SECTION BACKGROUND IMAGES
   Place files in: /public/assets/backgrounds/
   Reference them as: "/assets/backgrounds/filename.jpg"

   Group 2 → About + Skills    (same image, seamless transition)
   Group 3 → Projects + Education
   Group 4 → Certs + Contact
══════════════════════════════════════════════════════════════ */
export const BG_IMAGES = {
   dark: {
     group2: "/backgrounds/About-Skills.jpg",
     group3: "/backgrounds/projects-Education.jpg",
     group4: "/backgrounds/Certification-contact.jpg",
   },
   light: {
     group2: "/backgrounds/whiteThemeCorvettezr1x.png",
     group3: "/backgrounds/whiteThemeKoenegsegg.png",
     group4: "/backgrounds/whitePagani.png",
   },
 };


/* ══════════════════════════════════════════════════════════════
   ④ SECTION → BACKGROUND GROUP MAP
   Keys must match your section `id` attributes exactly.
══════════════════════════════════════════════════════════════ */
export const SECTION_BG_GROUP = {
  home:      "hero",   // video
  about:     "group2",
  skills:    "group2", // same as about — no seam
  projects:  "group3",
  education: "group3", // same as projects
  certs:     "group4",
  contact:   "group4", // same as certs
};

/* ══════════════════════════════════════════════════════════════
   DERIVED HELPERS  (no editing needed below this line)
══════════════════════════════════════════════════════════════ */

/** Build a YouTube embed URL from a raw video ID */
export function buildYouTubeEmbed(videoId) {
  if (!videoId || videoId.includes("YOUR_")) return null;
  return (
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&controls=0&showinfo=0&rel=0&modestbranding=1` +
    `&playsinline=1&iv_load_policy=3&disablekb=1`
  );
}

/** Get the background value for a given section + theme */
export function getSectionBg(sectionId, isDark) {
  const theme = isDark ? "dark" : "light";
  const group = SECTION_BG_GROUP[sectionId];
  if (group === "hero") {
    return { type: "video", url: buildYouTubeEmbed(HERO_VIDEO[theme]) };
  }
  return { type: "image", url: BG_IMAGES[theme][group] || null };
}