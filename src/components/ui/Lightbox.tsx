import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ActivityPhoto } from '../../types';

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: ActivityPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = (index + delta + photos.length) % photos.length;
      onIndexChange(next);
    },
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onClose]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 no-print"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            onClick={onClose}
            aria-label="Close photo viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {photos.length > 1 && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          <motion.figure
            key={photo.id}
            className="m-0 max-h-full max-w-full"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={photo.caption ?? 'Trip photo'}
              className="mx-auto max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            {photo.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {photo.caption}
              </figcaption>
            )}
          </motion.figure>

          {photos.length > 1 && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
