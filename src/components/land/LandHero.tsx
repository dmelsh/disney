import type { Land } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { ParkBadge } from '../ui/Badge';
import { ClampText } from '../ui/ClampText';
import { LandScene } from '../scenery/LandScene';

export function LandHero({ land }: { land: Land }) {
  const { theme, style, fontHintClass } = useTheme(land.theme);

  return (
    <header
      style={{ ...style, background: theme.gradient }}
      className="print-hero relative overflow-hidden px-5 pb-10 pt-10 text-[color:var(--theme-on-primary)] sm:pt-14"
    >
      {/* illustrated area background */}
      <LandScene
        themeKey={land.theme}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
      />

      <div className="relative mx-auto max-w-content">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            {theme.emoji}
          </span>
          <ParkBadge park={land.park} />
          <span className="text-sm font-medium text-[color:var(--theme-on-primary)]/85">
            First entered · {land.firstVisitTime}
          </span>
        </div>

        <h1
          className={`text-4xl uppercase leading-[1.05] tracking-wide drop-shadow sm:text-6xl ${fontHintClass}`}
        >
          {land.name}
        </h1>

        <div className="mt-4 max-w-2xl rounded-xl bg-black/20 p-4 backdrop-blur-sm">
          <ClampText
            text={land.blurb}
            lines={2}
            tone="light"
            className="font-hint-serif text-base italic leading-relaxed text-[color:var(--theme-on-primary)] sm:text-lg"
          />
        </div>
      </div>
    </header>
  );
}
