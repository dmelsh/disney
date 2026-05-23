import type { ReactElement } from 'react';
import type { ThemeKey } from '../../types';
import { getTheme } from '../../themes';

/**
 * Decorative, hand-drawn SVG scenes evocative of each land — desert mesas,
 * a castle, a ferris wheel, alien spires, fireworks, and so on. Used as the
 * fallback background imagery behind the themed gradients when no photo is set.
 */

const STAR = (x: number, y: number, r: number, c: string, i: number) => (
  <circle
    key={`s${x}-${y}`}
    cx={x}
    cy={y}
    r={r}
    fill={c}
    fillOpacity={0.7}
    className="twinkle"
    style={{ animationDelay: `${(i % 5) * 0.7}s` }}
  />
);

function stars(c: string): ReactElement {
  const pts: [number, number, number][] = [
    [40, 30, 1.6],
    [90, 60, 1.1],
    [150, 24, 1.8],
    [210, 50, 1.2],
    [280, 28, 1.5],
    [330, 64, 1.1],
    [370, 36, 1.7],
    [250, 80, 1],
    [120, 90, 1],
  ];
  return <g>{pts.map(([x, y, r], i) => STAR(x, y, r, c, i))}</g>;
}

function pine(x: number, y: number, s: number, sec: string, op: number) {
  return (
    <g key={`p${x}`}>
      <path
        d={`M${x} ${y - 46 * s} ${x - 12 * s} ${y - 18 * s} ${x + 12 * s} ${y - 18 * s}Z`}
        fill="#fff"
        fillOpacity={op}
      />
      <path
        d={`M${x} ${y - 30 * s} ${x - 15 * s} ${y} ${x + 15 * s} ${y}Z`}
        fill="#fff"
        fillOpacity={op}
      />
      <rect
        x={x - 3 * s}
        y={y}
        width={6 * s}
        height={12 * s}
        fill={sec}
        fillOpacity={0.5}
      />
    </g>
  );
}

function burst(cx: number, cy: number, c: string) {
  const arms = 8;
  const lines = [];
  for (let i = 0; i < arms; i += 1) {
    const a = (i / arms) * Math.PI * 2;
    lines.push(
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(a) * 22}
        y2={cy + Math.sin(a) * 22}
        stroke={c}
        strokeOpacity={0.7}
        strokeWidth={2.5}
        strokeLinecap="round"
      />,
    );
  }
  return (
    <g key={`b${cx}-${cy}`}>
      {lines}
      {arms > 0 &&
        Array.from({ length: arms }).map((_, i) => {
          const a = (i / arms) * Math.PI * 2;
          return (
            <circle
              key={`d${i}`}
              cx={cx + Math.cos(a) * 24}
              cy={cy + Math.sin(a) * 24}
              r={2}
              fill={c}
              fillOpacity={0.9}
            />
          );
        })}
    </g>
  );
}

const SCENES: Record<ThemeKey, (sec: string) => ReactElement> = {
  cars: (sec) => (
    <g>
      <circle
        cx={322}
        cy={54}
        r={30}
        fill={sec}
        fillOpacity={0.55}
        className="float-slow"
      />
      <path d="M0 150 70 96 130 150Z" fill="#fff" fillOpacity={0.12} />
      <path d="M80 150 165 78 245 150Z" fill="#fff" fillOpacity={0.18} />
      <path d="M210 150 290 104 370 150Z" fill="#fff" fillOpacity={0.12} />
      <rect x={0} y={150} width={400} height={70} fill="#fff" fillOpacity={0.2} />
      <path d="M150 220 250 220 214 150 186 150Z" fill="#fff" fillOpacity={0.3} />
      <rect x={197} y={158} width={6} height={14} fill={sec} fillOpacity={0.85} />
      <rect x={196} y={180} width={8} height={16} fill={sec} fillOpacity={0.85} />
      <rect x={195} y={202} width={10} height={16} fill={sec} fillOpacity={0.85} />
    </g>
  ),
  hollywood: (sec) => (
    <g>
      <path
        d="M330 36 l5 14 15 1 -12 9 4 15 -12-8 -12 8 4-15 -12-9 15-1Z"
        fill={sec}
        fillOpacity={0.6}
      />
      <rect x={20} y={92} width={40} height={128} fill="#fff" fillOpacity={0.12} />
      <rect x={70} y={60} width={50} height={160} fill="#fff" fillOpacity={0.18} />
      <rect x={86} y={40} width={18} height={22} fill="#fff" fillOpacity={0.18} />
      <rect x={130} y={100} width={44} height={120} fill="#fff" fillOpacity={0.12} />
      <rect x={185} y={70} width={55} height={150} fill="#fff" fillOpacity={0.16} />
      <rect x={250} y={95} width={46} height={125} fill="#fff" fillOpacity={0.12} />
      <rect x={305} y={110} width={70} height={110} fill="#fff" fillOpacity={0.14} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={196 + i * 12} cy={86} r={2.6} fill={sec} fillOpacity={0.85} />
      ))}
    </g>
  ),
  avengers: (sec) => (
    <g>
      {[40, 90, 140, 190, 240, 290, 340].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={26}
          width={14}
          height={14}
          transform={`rotate(45 ${x + 7} 33)`}
          fill="#fff"
          fillOpacity={0.1}
        />
      ))}
      <rect x={0} y={150} width={400} height={70} fill="#fff" fillOpacity={0.16} />
      <rect x={40} y={108} width={30} height={42} fill="#fff" fillOpacity={0.14} />
      <rect x={300} y={98} width={34} height={52} fill="#fff" fillOpacity={0.14} />
      <path
        d="M200 68 l34 12 v26 c0 26 -18 40 -34 48 c-16 -8 -34 -22 -34 -48 v-26Z"
        fill={sec}
        fillOpacity={0.55}
      />
      <path
        d="M200 84 v60 M176 100 h48"
        stroke="#fff"
        strokeOpacity={0.7}
        strokeWidth={4}
      />
    </g>
  ),
  pixar: (sec) => {
    const cx = 118;
    const cy = 108;
    const r = 54;
    const gond = Array.from({ length: 8 }).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={cx + Math.cos(a) * r}
          cy={cy + Math.sin(a) * r}
          r={5}
          fill={sec}
          fillOpacity={0.8}
        />
      );
    });
    return (
      <g>
        <rect x={0} y={170} width={400} height={50} fill="#fff" fillOpacity={0.18} />
        <g stroke="#fff" strokeOpacity={0.5} strokeWidth={3} fill="none">
          <circle cx={cx} cy={cy} r={r} />
          <circle cx={cx} cy={cy} r={30} />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
          <line x1={cx - 38} y1={cy - 38} x2={cx + 38} y2={cy + 38} />
          <line x1={cx + 38} y1={cy - 38} x2={cx - 38} y2={cy + 38} />
        </g>
        {gond}
        <circle cx={cx} cy={cy} r={7} fill={sec} fillOpacity={0.9} />
        <line x1={cx} y1={cy} x2={cx} y2={170} stroke="#fff" strokeOpacity={0.4} strokeWidth={4} />
        {[250, 280, 310, 340].map((x) => (
          <rect key={x} x={x} y={150} width={7} height={30} fill="#fff" fillOpacity={0.16} />
        ))}
      </g>
    );
  },
  mainstreet: (sec) => (
    <g>
      {Array.from({ length: 11 }).map((_, i) => (
        <path
          key={i}
          d={`M${i * 40} 24 L${i * 40 + 20} 42 L${i * 40 + 40} 24Z`}
          fill={sec}
          fillOpacity={0.5}
        />
      ))}
      <rect x={20} y={112} width={60} height={58} fill="#fff" fillOpacity={0.14} />
      <path d="M20 112 50 88 80 112Z" fill="#fff" fillOpacity={0.18} />
      <rect x={300} y={112} width={70} height={58} fill="#fff" fillOpacity={0.14} />
      <path d="M300 112 335 88 370 112Z" fill="#fff" fillOpacity={0.18} />
      <rect x={185} y={70} width={40} height={100} fill="#fff" fillOpacity={0.18} />
      <path d="M185 70 205 48 225 70Z" fill="#fff" fillOpacity={0.22} />
      <circle cx={205} cy={95} r={10} fill={sec} fillOpacity={0.7} />
      <rect x={0} y={170} width={400} height={50} fill="#fff" fillOpacity={0.18} />
      <rect x={120} y={150} width={70} height={22} rx={4} fill="#fff" fillOpacity={0.22} />
      <rect x={190} y={140} width={26} height={32} rx={3} fill="#fff" fillOpacity={0.22} />
      <circle cx={135} cy={174} r={6} fill={sec} fillOpacity={0.7} />
      <circle cx={175} cy={174} r={6} fill={sec} fillOpacity={0.7} />
    </g>
  ),
  toontown: (sec) => (
    <g>
      <circle
        cx={58}
        cy={54}
        r={26}
        fill={sec}
        fillOpacity={0.55}
        className="float-slow"
      />
      <path d="M0 170 Q100 132 200 170 T400 170 V220 H0Z" fill="#fff" fillOpacity={0.18} />
      <rect x={120} y={110} width={50} height={64} rx={14} fill="#fff" fillOpacity={0.2} />
      <rect x={190} y={96} width={46} height={78} rx={16} fill="#fff" fillOpacity={0.16} />
      <rect x={256} y={118} width={44} height={56} rx={14} fill="#fff" fillOpacity={0.2} />
      <rect x={138} y={146} width={16} height={28} rx={8} fill={sec} fillOpacity={0.6} />
      <rect x={206} y={138} width={14} height={36} rx={7} fill={sec} fillOpacity={0.5} />
    </g>
  ),
  fantasyland: (sec) => (
    <g>
      {stars('#fff')}
      <rect x={150} y={110} width={100} height={80} fill="#fff" fillOpacity={0.18} />
      <rect x={120} y={130} width={30} height={60} fill="#fff" fillOpacity={0.14} />
      <rect x={250} y={130} width={30} height={60} fill="#fff" fillOpacity={0.14} />
      <path d="M120 130 135 96 150 130Z" fill={sec} fillOpacity={0.6} />
      <path d="M150 110 200 60 250 110Z" fill="#fff" fillOpacity={0.22} />
      <path d="M250 130 265 96 280 130Z" fill={sec} fillOpacity={0.6} />
      <rect x={190} y={80} width={20} height={40} fill="#fff" fillOpacity={0.2} />
      <path d="M190 80 200 50 210 80Z" fill={sec} fillOpacity={0.75} />
      <path d="M200 50 200 40 214 45 200 50Z" fill={sec} fillOpacity={0.9} />
      <rect x={0} y={190} width={400} height={30} fill="#fff" fillOpacity={0.16} />
    </g>
  ),
  tomorrowland: (sec) => (
    <g>
      {stars('#fff')}
      <ellipse
        cx={200}
        cy={124}
        rx={130}
        ry={42}
        stroke={sec}
        strokeOpacity={0.5}
        strokeWidth={3}
        fill="none"
      />
      <circle cx={322} cy={68} r={24} fill="#fff" fillOpacity={0.2} />
      <ellipse
        cx={322}
        cy={68}
        rx={40}
        ry={12}
        stroke={sec}
        strokeOpacity={0.7}
        strokeWidth={4}
        fill="none"
      />
      <g className="float-slow">
        <g transform="rotate(18 112 120)">
          <path
            d="M112 78 c14 0 22 18 22 40 c0 16 -8 30 -22 38 c-14 -8 -22 -22 -22 -38 c0 -22 8 -40 22 -40Z"
            fill="#fff"
            fillOpacity={0.22}
          />
          <circle cx={112} cy={116} r={8} fill={sec} fillOpacity={0.8} />
          <path d="M90 150 80 168 102 156Z" fill={sec} fillOpacity={0.6} />
          <path d="M134 150 144 168 122 156Z" fill={sec} fillOpacity={0.6} />
        </g>
      </g>
    </g>
  ),
  galaxysedge: (sec) => (
    <g>
      {stars('#fff')}
      <circle cx={58} cy={48} r={18} fill={sec} fillOpacity={0.5} />
      <circle cx={90} cy={64} r={9} fill="#fff" fillOpacity={0.3} />
      <path d="M0 150 30 90 60 150Z" fill="#fff" fillOpacity={0.16} />
      <rect x={70} y={100} width={40} height={50} fill="#fff" fillOpacity={0.18} />
      <rect x={120} y={120} width={26} height={30} fill="#fff" fillOpacity={0.14} />
      <rect x={300} y={96} width={46} height={54} fill="#fff" fillOpacity={0.16} />
      <rect x={0} y={150} width={400} height={70} fill="#fff" fillOpacity={0.2} />
      <g className="float-slow">
        <g transform="translate(232 92)">
          <ellipse cx={0} cy={0} rx={56} ry={16} fill="#fff" fillOpacity={0.24} />
          <ellipse cx={0} cy={-6} rx={30} ry={12} fill="#fff" fillOpacity={0.2} />
          <rect x={40} y={-4} width={26} height={6} rx={3} fill="#fff" fillOpacity={0.2} />
          <circle cx={-10} cy={-8} r={4} fill={sec} fillOpacity={0.85} />
        </g>
      </g>
    </g>
  ),
  critter: (sec) => (
    <g>
      <path d="M0 160 Q120 122 240 160 T400 150 V220 H0Z" fill="#fff" fillOpacity={0.16} />
      <path
        d="M150 220 Q190 172 175 150 Q160 130 210 112"
        stroke="#fff"
        strokeOpacity={0.28}
        strokeWidth={16}
        fill="none"
        strokeLinecap="round"
      />
      {pine(60, 150, 1.1, sec, 0.2)}
      {pine(100, 158, 0.8, sec, 0.16)}
      {pine(300, 150, 1.2, sec, 0.2)}
      {pine(346, 158, 0.9, sec, 0.16)}
    </g>
  ),
  neworleans: (sec) => (
    <g>
      <rect x={60} y={70} width={280} height={120} fill="#fff" fillOpacity={0.14} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={90 + i * 64} y={100} width={34} height={50} fill="#fff" fillOpacity={0.18} />
          <circle cx={107 + i * 64} cy={100} r={17} fill="#fff" fillOpacity={0.18} />
        </g>
      ))}
      <rect x={60} y={150} width={280} height={6} fill={sec} fillOpacity={0.6} />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={64 + i * 14} y={150} width={2} height={20} fill={sec} fillOpacity={0.5} />
      ))}
      <rect x={36} y={120} width={5} height={70} fill="#fff" fillOpacity={0.22} />
      <circle cx={38} cy={116} r={8} fill={sec} fillOpacity={0.8} />
      <g fill={sec} fillOpacity={0.7}>
        <circle cx={300} cy={58} r={5} />
        <rect x={304} y={40} width={3} height={20} />
        <circle cx={320} cy={66} r={4} />
        <rect x={323} y={50} width={2.5} height={18} />
      </g>
    </g>
  ),
  parade: (sec) => (
    <g>
      {stars('#fff')}
      {burst(80, 60, sec)}
      {burst(200, 44, '#fff')}
      {burst(320, 64, sec)}
      <rect x={120} y={150} width={160} height={40} rx={10} fill="#fff" fillOpacity={0.2} />
      <circle cx={150} cy={190} r={10} fill={sec} fillOpacity={0.7} />
      <circle cx={250} cy={190} r={10} fill={sec} fillOpacity={0.7} />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={i} cx={132 + i * 20} cy={160} r={3} fill={sec} fillOpacity={0.85} />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={`b${i}`} cx={132 + i * 20} cy={176} r={3} fill="#fff" fillOpacity={0.7} />
      ))}
    </g>
  ),
};

export function LandScene({
  themeKey,
  className,
}: {
  themeKey: ThemeKey;
  className?: string;
}) {
  const theme = getTheme(themeKey);
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={className}
    >
      {SCENES[themeKey](theme.secondary)}
    </svg>
  );
}

/** Friendly composite scene for the un-themed Day overview hero. */
export function DayScene({ className }: { className?: string }) {
  const sec = '#E94560';
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={className}
    >
      {stars('#fff')}
      {burst(60, 50, sec)}
      {burst(340, 54, '#fff')}
      {/* castle */}
      <rect x={170} y={120} width={60} height={70} fill="#fff" fillOpacity={0.18} />
      <rect x={150} y={140} width={20} height={50} fill="#fff" fillOpacity={0.14} />
      <rect x={230} y={140} width={20} height={50} fill="#fff" fillOpacity={0.14} />
      <path d="M150 140 160 116 170 140Z" fill={sec} fillOpacity={0.7} />
      <path d="M230 140 240 116 250 140Z" fill={sec} fillOpacity={0.7} />
      <rect x={192} y={92} width={16} height={30} fill="#fff" fillOpacity={0.2} />
      <path d="M192 92 200 66 208 92Z" fill={sec} fillOpacity={0.8} />
      <path d="M200 66 200 56 213 61 200 66Z" fill={sec} fillOpacity={0.9} />
      {/* ferris wheel */}
      <g stroke="#fff" strokeOpacity={0.45} strokeWidth={2.5} fill="none">
        <circle cx={320} cy={150} r={30} />
        <line x1={320} y1={120} x2={320} y2={180} />
        <line x1={290} y1={150} x2={350} y2={150} />
      </g>
      <circle cx={320} cy={150} r={4} fill={sec} fillOpacity={0.85} />
      <rect x={0} y={190} width={400} height={30} fill="#fff" fillOpacity={0.16} />
    </svg>
  );
}

/** A small themed thumbnail (gradient + scene + emoji) used on land cards. */
export function SceneThumb({
  themeKey,
  className = '',
}: {
  themeKey: ThemeKey;
  className?: string;
}) {
  const theme = getTheme(themeKey);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: theme.gradient }}
      aria-hidden
    >
      <LandScene themeKey={themeKey} className="absolute inset-0 h-full w-full" />
      <span className="absolute inset-0 flex items-center justify-center text-2xl drop-shadow">
        {theme.emoji}
      </span>
    </div>
  );
}
