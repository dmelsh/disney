import { useEffect } from 'react';
import { motion } from 'framer-motion';
import day from '../../data/day-may-22-2026';
import { NEUTRAL_GRADIENT } from '../../themes';
import { useAmbientSound } from '../../hooks/useAmbientSound';
import { LandCard } from './LandCard';
import { ShareButton } from '../ui/ShareButton';
import { ClampText } from '../ui/ClampText';
import { DayScene } from '../scenery/LandScene';

export function DayOverview() {
  useAmbientSound(null); // overview is intentionally un-themed / quiet
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article>
      {/* Hero — neutral, not themed to any single land */}
      <header
        className="print-hero relative overflow-hidden px-5 py-14 text-center text-white sm:py-20"
        style={{ background: NEUTRAL_GRADIENT }}
      >
        <DayScene className="scene-breath pointer-events-none absolute inset-0 h-full w-full opacity-90" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-content"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
            A keepsake
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-6xl">
            {day.title}
          </h1>
          <p className="mt-4 text-lg text-white/85 sm:text-xl">
            {day.date} · Dan, Andrea &amp; Grayson
          </p>
          <div className="mt-6 flex justify-center">
            <ShareButton title={day.title} text={day.date} onThemed />
          </div>
        </motion.div>
      </header>

      <div className="mx-auto max-w-content px-5 py-10">
        <ClampText
          text={day.intro}
          lines={3}
          className="text-lg leading-relaxed text-slate-700"
        />

        <h2 className="mb-1 mt-12 text-sm font-bold uppercase tracking-widest text-slate-400">
          The day, land by land
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Tap a place to jump into that part of the day. 👇
        </p>

        <div className="space-y-4">
          {day.lands.map((land, i) => (
            <motion.div
              key={land.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.2) }}
            >
              <LandCard land={land} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">
            How the day ended
          </h2>
          <ClampText
            text={day.closing}
            lines={3}
            className="leading-relaxed text-slate-700"
          />
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          {day.date} · Dan, Andrea &amp; Grayson
        </footer>
      </div>
    </article>
  );
}
