import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * A friendly, tappable expand/collapse. Big touch target, clear label, and a
 * rotating chevron — so a kid can tell it opens and an adult gets the depth.
 */
export function Disclosure({
  label,
  openLabel,
  icon,
  defaultOpen = false,
  accent,
  children,
}: {
  label: string;
  openLabel?: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  accent?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-left text-base font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
        style={accent ? { color: accent } : undefined}
      >
        {icon && <span className="text-xl">{icon}</span>}
        <span className="flex-1">{open && openLabel ? openLabel : label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-1 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
