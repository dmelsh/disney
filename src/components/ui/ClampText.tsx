import { useState, type CSSProperties } from 'react';

/**
 * Shows a few lines of text with a "Read more" toggle. Keeps long paragraphs
 * (the day intro, a land blurb) from becoming a wall of text.
 */
export function ClampText({
  text,
  lines = 3,
  className = '',
  tone = 'dark',
}: {
  text: string;
  lines?: number;
  className?: string;
  tone?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);

  const clampStyle: CSSProperties = open
    ? {}
    : {
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      };

  const btn =
    tone === 'light'
      ? 'text-[color:var(--theme-on-primary)] underline decoration-white/50 underline-offset-2'
      : 'text-slate-900 underline decoration-slate-300 underline-offset-2';

  return (
    <div>
      <p className={className} style={clampStyle}>
        {text}
      </p>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`mt-1 text-sm font-semibold ${btn}`}
        aria-expanded={open}
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
}
