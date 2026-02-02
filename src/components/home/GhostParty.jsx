import { useEffect, useMemo, useRef, useState } from "react";

const GHOST_POOL = [
  { id: "ghost1", tooltip: "LinkedIn →" },
  { id: "ghost2", tooltip: "GitHub →" },
  { id: "ghost3", tooltip: "Instagram →" },
  { id: "ghost4", tooltip: "YouTube →" },
  { id: "ghost5", tooltip: "Portfolio →" },
];

const DEFAULT_LINKS = {
  ghost1: "https://www.linkedin.com/",
  ghost2: "https://github.com/",
  ghost3: "https://www.instagram.com/",
  ghost4: "https://www.youtube.com/",
  ghost5: "https://www.google.com/",
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickUnique(arr, count) {
  return shuffle(arr).slice(0, Math.min(count, arr.length));
}

function randomPointInRadius(radius) {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * radius;
  return { dx: Math.cos(angle) * r, dy: Math.sin(angle) * r };
}

/** 10 clearly different HAPPY faces */
function GhostFace({ v }) {
  // All HAPPY faces (very visible differences)
  switch (v) {
    // 1) Classic smile
    case 1:
      return (
        <>
          <ellipse cx="48" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <ellipse cx="72" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <path
            d="M50 78 Q60 92 70 78"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 2) Wink + smile
    case 2:
      return (
        <>
          <path
            d="M42 58 Q48 54 54 58"
            stroke="rgba(0,0,0,0.80)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="72" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <path
            d="M50 79 Q60 90 70 79"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 3) Big open happy mouth
    case 3:
      return (
        <>
          <circle cx="48" cy="58" r="7" fill="rgba(0,0,0,0.80)" />
          <circle cx="72" cy="58" r="7" fill="rgba(0,0,0,0.80)" />
          <ellipse cx="60" cy="82" rx="10" ry="8" fill="rgba(0,0,0,0.65)" />
          <ellipse cx="60" cy="85" rx="6" ry="4" fill="rgba(255,255,255,0.28)" />
        </>
      );

    // 4) “^ ^” happy eyes
    case 4:
      return (
        <>
          <path
            d="M42 60 Q48 52 54 60"
            stroke="rgba(0,0,0,0.80)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M66 60 Q72 52 78 60"
            stroke="rgba(0,0,0,0.80)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M52 80 Q60 88 68 80"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 5) Blush cheeks + smile
    case 5:
      return (
        <>
          <ellipse cx="48" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <ellipse cx="72" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <circle cx="38" cy="73" r="5" fill="rgba(255,120,160,0.35)" />
          <circle cx="82" cy="73" r="5" fill="rgba(255,120,160,0.35)" />
          <path
            d="M50 79 Q60 92 70 79"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 6) Tiny “o” mouth (cute surprise happy)
    case 6:
      return (
        <>
          <ellipse cx="48" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <ellipse cx="72" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <circle cx="60" cy="82" r="6" fill="rgba(0,0,0,0.60)" />
        </>
      );

    // 7) Big grin + white highlight
    case 7:
      return (
        <>
          <circle cx="48" cy="58" r="7" fill="rgba(0,0,0,0.80)" />
          <circle cx="72" cy="58" r="7" fill="rgba(0,0,0,0.80)" />
          <path
            d="M48 80 Q60 98 72 80"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M52 84 Q60 92 68 84"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 8) Double wink + smile
    case 8:
      return (
        <>
          <path
            d="M42 58 Q48 54 54 58"
            stroke="rgba(0,0,0,0.80)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M66 58 Q72 54 78 58"
            stroke="rgba(0,0,0,0.80)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M52 80 Q60 90 68 80"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 9) Tongue out (playful)
    case 9:
      return (
        <>
          <ellipse cx="48" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <ellipse cx="72" cy="58" rx="6" ry="9" fill="rgba(0,0,0,0.80)" />
          <path
            d="M50 78 Q60 92 70 78"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M58 86 Q60 90 62 86"
            stroke="rgba(255,120,160,0.60)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    // 10) Sparkly eyes
    default:
      return (
        <>
          <circle cx="48" cy="58" r="7" fill="rgba(0,0,0,0.80)" />
          <circle cx="72" cy="58" r="7" fill="rgba(0,0,0,0.80)" />
          <circle cx="46" cy="55" r="2" fill="rgba(255,255,255,0.55)" />
          <circle cx="70" cy="55" r="2" fill="rgba(255,255,255,0.55)" />
          <path
            d="M50 79 Q60 90 70 79"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
  }
}

function GhostSVG({ faceVariant = 1 }) {
  return (
    <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M60 8
           C35 8 18 26 18 48
           V116
           C18 126 26 132 34 127
           C40 124 44 124 50 128
           C56 132 60 132 66 128
           C72 124 76 124 82 127
           C92 131 102 124 102 114
           V48
           C102 26 85 8 60 8Z"
        fill="rgba(255,255,255,0.95)"
      />
      <path
        d="M60 14
           C40 14 26 28 26 46
           V108
           C30 106 35 106 41 110
           C49 115 56 115 64 110
           C71 106 76 106 82 110
           C88 113 94 111 96 106
           V46
           C96 28 80 14 60 14Z"
        fill="rgba(255,255,255,0.22)"
      />
      <GhostFace v={faceVariant} />
    </svg>
  );
}

export default function GhostParty({
  areaSelector = "#home",
  links = DEFAULT_LINKS,
  refreshEveryMs = 60000, // 1 minute
  minVisibleSec = 20,
  maxVisibleSec = 30,
  minGhosts = 2,
  maxGhosts = 3,
}) {
  const [active, setActive] = useState([]);

  const pool = useMemo(() => GHOST_POOL, []);
  const linksRef = useRef(links);
  useEffect(() => {
    linksRef.current = links;
  }, [links]);

  const timersRef = useRef([]);
  const intervalRef = useRef(null);
  const moverRef = useRef(null);

  useEffect(() => {
    const area = document.querySelector(areaSelector);
    if (!area) return;

    const clearAll = () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      if (moverRef.current) {
        clearTimeout(moverRef.current);
        moverRef.current = null;
      }
    };

    const scheduleDrift = () => {
      const delay = randInt(1800, 3200);
      moverRef.current = setTimeout(() => {
        setActive((prev) => {
          if (!prev.length) return prev;

          const moverIndex = randInt(0, prev.length - 1);
          const moverId = prev[moverIndex].id;

          return prev.map((p) => {
            if (p.id !== moverId) {
              // still wiggle but don't drift
              return { ...p, drifting: false, mx: 0, my: 0 };
            }
            const { dx, dy } = randomPointInRadius(p.radius);
            return {
              ...p,
              drifting: true,
              mx: dx,
              my: dy,
              moveDur: randInt(9000, 16000),
            };
          });
        });

        scheduleDrift();
      }, delay);

      timersRef.current.push(moverRef.current);
    };

    const spawnEvent = () => {
      setActive([]);
      clearAll();

      const rect = area.getBoundingClientRect();
      const offsetX = rect.left;
      const offsetY = rect.top;

      const eventDurationMs = randInt(minVisibleSec, maxVisibleSec) * 1000;
      const count = randInt(minGhosts, maxGhosts);

      const chosen = pickUnique(pool, count);

      // make faces unique within this event
      const faceVariants = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      const spawned = chosen.map((g, idx) => {
        const size = randInt(40, 70); // ✅ random size so they don't look identical

        const maxX = Math.max(0, Math.floor(rect.width - size));
        const maxY = Math.max(0, Math.floor(rect.height - size));

        return {
          id: g.id,
          href: (linksRef.current && linksRef.current[g.id]) || "#",
          tooltip: g.tooltip,

          size,
          originX: offsetX + randInt(0, maxX),
          originY: offsetY + randInt(0, maxY),
          radius: randInt(80, 160),

          faceVariant: faceVariants[idx % faceVariants.length],

          drifting: false,
          mx: 0,
          my: 0,
          moveDur: randInt(9000, 16000),

          isLeaving: false,
          fadeMs: randInt(900, 1800),
        };
      });

      setActive(spawned);
      scheduleDrift();

      const fadeStart = Math.max(0, eventDurationMs - randInt(1400, 2400));
      const fadeTimer = setTimeout(() => {
        setActive((prev) => prev.map((p) => ({ ...p, isLeaving: true })));
      }, fadeStart);

      const endTimer = setTimeout(() => {
        setActive([]);
        clearAll();
      }, eventDurationMs);

      timersRef.current.push(fadeTimer, endTimer);
    };

    // first run
    spawnEvent();

    // repeat every minute
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(spawnEvent, refreshEveryMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearAll();
    };
  }, [
    areaSelector,
    pool,
    refreshEveryMs,
    minVisibleSec,
    maxVisibleSec,
    minGhosts,
    maxGhosts,
  ]);

  return (
    <div className="spooky-ghost-layer" aria-hidden="false">
      {active.map((g) => (
        <a
          key={g.id}
          data-face={g.faceVariant}
          className={`spooky-ghost ${g.drifting ? "drifting" : ""} ${
            g.isLeaving ? "leaving" : ""
          }`}
          href={g.href}
          target="_blank"
          rel="noreferrer"
          data-tooltip={g.tooltip}
          title={`${g.tooltip} Click me 👻`}

          onClick={() => {
            window.dispatchEvent(new CustomEvent("ghostClicked"));
          }}

          style={{
            left: `${g.originX}px`,
            top: `${g.originY}px`,
            width: `${g.size}px`,
            height: `${Math.round(g.size * 1.2)}px`,
            ["--mx"]: `${g.mx}px`,
            ["--my"]: `${g.my}px`,
            ["--moveDur"]: `${g.moveDur}ms`,
            ["--fadeDur"]: `${g.fadeMs}ms`,
          }}
        >
          <div className="ghost-inner">
            <GhostSVG faceVariant={g.faceVariant} />
          </div>
        </a>
      ))}
    </div>
  );
}
