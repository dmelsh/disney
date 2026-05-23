import type { Land } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { ParkBadge } from '../ui/Badge';

export function LandHero({ land }: { land: Land }) {
  const { theme, style, fontHintClass } = useTheme(land.theme);

  return (
    <header
      style={{ ...style, background: theme.gradient }}
      className="print-hero relative overflow-hidden px-5 pb-10 pt-10 text-[color:var(--theme-on-primary)] sm:pt-14"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            {theme.emoji}
          </span>
          <ParkBadge park={land.park} />
          <span className="text-sm font-medium text-[color:var(--theme-on-primary)]/80">
            First entered · {land.firstVisitTime}
          </span>
        </div>

        <h1
          className={`text-4xl uppercase leading-[1.05] tracking-wide sm:text-6xl ${fontHintClass}`}
        >
          {land.name}
        </h1>

        <p className="mt-4 max-w-2xl rounded-xl bg-white/10 p-4 font-hint-serif text-base italic leading-relaxed text-[color:var(--theme-on-primary)]/95 backdrop-blur-sm sm:text-lg">
          {land.blurb}
        </p>
      </div>
    </header>
  );
}
