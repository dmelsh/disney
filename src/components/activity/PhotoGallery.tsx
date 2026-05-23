import { useRef, useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import type { ActivityPhoto } from '../../types';
import type { UsePhotosResult } from '../../hooks/usePhotos';
import { Lightbox } from '../ui/Lightbox';
import { AddPhotoButton } from './AddPhotoButton';

export function PhotoGallery({
  photos,
  manager,
  bundledIds,
  themePrimary,
}: {
  photos: ActivityPhoto[];
  manager: UsePhotosResult;
  bundledIds: Set<string>;
  themePrimary: string;
}) {
  const { addPhotos, removePhoto, setHero, busy, error, overQuotaWarning } =
    manager;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null); // long-press menu (mobile)
  const pressTimer = useRef<number | null>(null);

  const startPress = (id: string) => {
    pressTimer.current = window.setTimeout(() => setMenuId(id), 550);
  };
  const cancelPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    pressTimer.current = null;
  };

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
        Photos
      </h2>

      {overQuotaWarning && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
          You’ve stored more than 4&nbsp;MB of photos in this browser. Add a few
          more carefully — local storage is limited.
        </p>
      )}
      {error && (
        <p className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800 ring-1 ring-rose-200">
          {error}
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo, i) => {
          const removable = !bundledIds.has(photo.id);
          const showMenu = menuId === photo.id;
          return (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-slate-200"
              onTouchStart={() => removable && startPress(photo.id)}
              onTouchEnd={cancelPress}
              onTouchMove={cancelPress}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="block h-full w-full"
                aria-label={`Open photo ${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption ?? `Photo ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>

              {photo.isHero && (
                <span
                  className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: themePrimary }}
                >
                  <Star className="h-3 w-3 fill-current" /> Hero
                </span>
              )}

              {removable && (
                <div
                  className={`absolute inset-x-1 bottom-1 flex justify-end gap-1 transition ${
                    showMenu
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'
                  } no-print`}
                >
                  {!photo.isHero && (
                    <button
                      type="button"
                      onClick={() => {
                        setHero(photo.id);
                        setMenuId(null);
                      }}
                      className="rounded-full bg-white/90 p-1.5 text-slate-700 shadow hover:bg-white"
                      aria-label="Set as hero photo"
                      title="Set as hero"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmId(photo.id);
                      setMenuId(null);
                    }}
                    className="rounded-full bg-white/90 p-1.5 text-rose-600 shadow hover:bg-white"
                    aria-label="Delete photo"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <AddPhotoButton onFiles={addPhotos} busy={busy} />
      </div>

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      {/* Delete confirmation */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-print"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete"
          onClick={() => setConfirmId(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900">Delete this photo?</h3>
            <p className="mt-1 text-sm text-slate-600">
              This removes it from this browser. It can’t be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removePhoto(confirmId);
                  setConfirmId(null);
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
