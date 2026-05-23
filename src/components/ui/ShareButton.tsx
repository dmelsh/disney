import { useState } from 'react';
import { Check, Printer, Share2 } from 'lucide-react';

export function ShareButton({
  title,
  text,
  onThemed = false,
}: {
  title: string;
  text?: string;
  onThemed?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const base = onThemed
    ? 'bg-white/15 text-[color:var(--theme-on-primary)] ring-1 ring-white/30 hover:bg-white/25'
    : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200';

  async function share() {
    const url = window.location.href;
    const nav = navigator as Navigator & {
      share?: (data: ShareData) => Promise<void>;
    };
    if (nav.share) {
      try {
        await nav.share({ title, text, url });
        return;
      } catch {
        // user cancelled or unsupported — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — nothing more we can do silently */
    }
  }

  return (
    <div className="no-print inline-flex items-center gap-2">
      <button
        onClick={share}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${base}`}
        aria-label="Share a link to this page"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" /> Link copied
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" /> Share
          </>
        )}
      </button>
      <button
        onClick={() => window.print()}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${base}`}
        aria-label="Print this page"
      >
        <Printer className="h-4 w-4" /> Print
      </button>
    </div>
  );
}
