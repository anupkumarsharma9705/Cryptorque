import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [onLink,  setOnLink]  = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);

    const onOver = (e) => {
      const el = e.target.closest("a, button, [data-cursor='pointer']");
      setOnLink(!!el);
    };

    const loop = () => {
      if (dotRef.current && ringRef.current) {
        /* dot — instant */
        dotRef.current.style.transform =
          `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;

        /* ring — lerp for lag */
        ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  /* Hide on touch devices */
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width:  clicked ? "6px" : "8px",
        height: clicked ? "6px" : "8px",
        borderRadius: "50%",
        background: "var(--accent-red)",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "width .1s, height .1s, opacity .3s",
        willChange: "transform",
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9998,
        width:  onLink ? "48px" : "40px",
        height: onLink ? "48px" : "40px",
        borderRadius: "50%",
        border: `1px solid ${onLink ? "var(--accent-red)" : "rgba(224,36,68,0.4)"}`,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: onLink ? "scale(1.2)" : "scale(1)",
        transition: "width .25s, height .25s, border-color .25s, opacity .3s",
        willChange: "transform",
      }} />
    </>
  );
}