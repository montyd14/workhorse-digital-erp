"use client";

import { useEffect, useRef, useState } from "react";

export type Step = { title: string; time?: string; body: string };

/**
 * "1 2 3 4" progress bar that fills as the reader scrolls through the steps.
 * The bar is sticky under the header. Each step reports when it crosses the
 * middle of the viewport; the bar fills up to that step and un-fills on the way back up.
 */
export function StepsScroller({ steps }: { steps: Step[] }) {
  const container = useRef<HTMLDivElement | null>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const [progress, setProgress] = useState(0); // 0..1 along the line
  const [reached, setReached] = useState<boolean[]>(() => steps.map(() => false));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = container.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // The "read line" sits 60% down the viewport; progress is where it crosses the timeline.
      const readLine = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (readLine - rect.top) / rect.height));
      setProgress(p);
      const lineY = rect.top + p * rect.height;
      setReached(
        nodes.current.map((n) => {
          if (!n) return false;
          const r = n.getBoundingClientRect();
          return r.top + r.height / 2 <= lineY + 1;
        }),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  return (
    <div ref={container} className="relative mx-auto mt-4 max-w-5xl py-4">
      {/* Track: left on mobile, centered on desktop */}
      <div className="absolute bottom-0 left-5 top-0 w-1 -translate-x-1/2 rounded-full bg-ink/10 md:left-1/2" aria-hidden="true" />
      <div
        className="absolute left-5 top-0 w-1 -translate-x-1/2 rounded-full bg-brand md:left-1/2"
        style={{ height: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <ol className="space-y-10 md:space-y-14">
        {steps.map((s, i) => {
          const on = reached[i];
          const left = i % 2 === 0; // content side on desktop
          return (
            <li key={s.title} className="relative grid gap-4 pl-14 md:grid-cols-[1fr_5rem_1fr] md:gap-0 md:pl-0">
              {/* Number on the line */}
              <span
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                className={`absolute left-5 top-0 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-4 font-heading text-lg font-extrabold transition-all duration-300 md:static md:col-start-2 md:row-start-1 md:mx-auto md:translate-x-0 md:self-start ${
                  on ? "scale-110 border-brand bg-brand text-white shadow-lg shadow-brand/30" : "border-ink/15 bg-paper text-ink-muted"
                }`}
                aria-hidden="true"
              >
                {i + 1}
              </span>

              {/* Content */}
              <div
                className={`rounded-lg border bg-paper p-6 transition-all duration-500 md:row-start-1 ${
                  left ? "md:col-start-1 md:mr-2" : "md:col-start-3 md:ml-2"
                } ${on ? "border-brand/50 shadow-md shadow-brand/10" : "border-line"}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`font-heading text-3xl font-extrabold transition-colors duration-300 ${on ? "text-brand" : "text-ink-muted"}`}>
                    Step {i + 1}
                  </span>
                  {s.time && <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{s.time}</span>}
                </div>
                <h3 className="mt-1 text-2xl">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </div>

              {/* Illustration on the opposite side (desktop only) */}
              <div className={`hidden items-center md:row-start-1 md:flex ${left ? "md:col-start-3 md:justify-start md:pl-6" : "md:col-start-1 md:justify-end md:pr-6"}`}>
                <StepArt index={i} active={on} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Small on-brand illustration per step. Inline SVG so it ships with the HTML. */
function StepArt({ index, active }: { index: number; active: boolean }) {
  const ink = "#1e2328";
  const orange = active ? "#e2582c" : "#c9c2b4";
  const gold = active ? "#d9a441" : "#d9d2c4";
  const common = { width: 150, height: 110, viewBox: "0 0 150 110", "aria-hidden": true as const, className: "mx-auto sm:mx-0" };
  switch (index) {
    case 0: // discovery call: phone + calendar
      return (
        <svg {...common}>
          <rect x="18" y="14" width="56" height="86" rx="10" fill={ink} />
          <rect x="24" y="22" width="44" height="64" rx="4" fill="#f5efe4" />
          <circle cx="46" cy="93" r="3" fill="#f5efe4" />
          <rect x="30" y="30" width="32" height="6" rx="3" fill={orange} />
          <rect x="30" y="42" width="24" height="5" rx="2.5" fill="#c9c2b4" />
          <rect x="30" y="52" width="28" height="5" rx="2.5" fill="#c9c2b4" />
          <rect x="84" y="28" width="52" height="56" rx="6" fill="#ffffff" stroke={ink} strokeWidth="3" />
          <rect x="84" y="28" width="52" height="14" rx="6" fill={ink} />
          <rect x="92" y="50" width="10" height="8" rx="2" fill="#e9e1d2" />
          <rect x="106" y="50" width="10" height="8" rx="2" fill="#e9e1d2" />
          <rect x="120" y="50" width="10" height="8" rx="2" fill={orange} />
          <rect x="92" y="64" width="10" height="8" rx="2" fill="#e9e1d2" />
          <rect x="106" y="64" width="10" height="8" rx="2" fill="#e9e1d2" />
          <text x="125" y="71" fontSize="8" fontWeight="800" fill={ink} textAnchor="middle">15m</text>
        </svg>
      );
    case 1: // we build: browser window with blocks + wrench
      return (
        <svg {...common}>
          <rect x="12" y="14" width="126" height="84" rx="8" fill="#ffffff" stroke={ink} strokeWidth="3" />
          <rect x="12" y="14" width="126" height="16" rx="8" fill={ink} />
          <circle cx="24" cy="22" r="3" fill={orange} />
          <circle cx="34" cy="22" r="3" fill={gold} />
          <rect x="22" y="40" width="50" height="10" rx="3" fill={orange} />
          <rect x="22" y="56" width="70" height="6" rx="3" fill="#c9c2b4" />
          <rect x="22" y="66" width="56" height="6" rx="3" fill="#c9c2b4" />
          <rect x="22" y="80" width="30" height="10" rx="3" fill={ink} />
          <rect x="100" y="40" width="28" height="48" rx="4" fill="#e9e1d2" />
          <rect x="106" y="48" width="16" height="4" rx="2" fill={orange} />
          <rect x="106" y="56" width="16" height="4" rx="2" fill="#c9c2b4" />
          <rect x="106" y="64" width="16" height="4" rx="2" fill="#c9c2b4" />
          <rect x="106" y="72" width="16" height="4" rx="2" fill="#c9c2b4" />
        </svg>
      );
    case 2: // you try it: checklist on clipboard
      return (
        <svg {...common}>
          <rect x="38" y="12" width="74" height="90" rx="8" fill={ink} />
          <rect x="45" y="22" width="60" height="74" rx="4" fill="#f5efe4" />
          <rect x="60" y="8" width="30" height="12" rx="4" fill={orange} />
          {[34, 50, 66, 82].map((y, i) => (
            <g key={y}>
              <rect x="52" y={y - 6} width="12" height="12" rx="3" fill={i < 3 ? orange : "#ffffff"} stroke={i < 3 ? orange : "#c9c2b4"} strokeWidth="2" />
              {i < 3 && <path d={`M55 ${y} l3 3 l5 -6`} stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x="70" y={y - 3} width={i === 1 ? 20 : 28} height="6" rx="3" fill={i < 3 ? ink : "#c9c2b4"} />
            </g>
          ))}
        </svg>
      );
    default: // you pay only if you keep it: receipt + horseshoe check
      return (
        <svg {...common}>
          <path d="M40 12h70v86l-8-6-8 6-8-6-8 6-8-6-8 6-8-6-8 6-6-6z" fill="#ffffff" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          <rect x="52" y="26" width="46" height="6" rx="3" fill={ink} />
          <rect x="52" y="40" width="30" height="5" rx="2.5" fill="#c9c2b4" />
          <rect x="86" y="40" width="12" height="5" rx="2.5" fill="#c9c2b4" />
          <rect x="52" y="52" width="26" height="5" rx="2.5" fill="#c9c2b4" />
          <rect x="86" y="52" width="12" height="5" rx="2.5" fill="#c9c2b4" />
          <rect x="52" y="66" width="46" height="2" fill="#c9c2b4" />
          <text x="52" y="82" fontSize="9" fontWeight="800" fill={ink}>FLAT FEE</text>
          <circle cx="112" cy="84" r="16" fill={orange} />
          <path d="M104 84 l6 6 l11 -12" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
