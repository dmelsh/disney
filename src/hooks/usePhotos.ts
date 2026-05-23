import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ActivityPhoto, Land } from '../types';

const KEY_PREFIX = 'photo:';
const MAX_LONG_SIDE = 1280;
const JPEG_QUALITY = 0.8;
const WARN_BYTES = 4 * 1024 * 1024; // 4 MB

function storageKey(activityId: string) {
  return `${KEY_PREFIX}${activityId}`;
}

function readStored(activityId: string): ActivityPhoto[] {
  try {
    const raw = localStorage.getItem(storageKey(activityId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ActivityPhoto[]) : [];
  } catch {
    return [];
  }
}

function writeStored(activityId: string, photos: ActivityPhoto[]) {
  localStorage.setItem(storageKey(activityId), JSON.stringify(photos));
}

/** Total bytes of all photo:* entries in localStorage. */
export function totalPhotoBytes(): number {
  let total = 0;
  for (let i = 0; i < localStorage.length; i += 1) {
    const k = localStorage.key(i);
    if (k && k.startsWith(KEY_PREFIX)) {
      total += (localStorage.getItem(k) ?? '').length * 2; // UTF-16 ~2 bytes/char
    }
  }
  return total;
}

/** Downscale + JPEG-compress a File to a base64 data URI. */
function fileToDownscaledDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      const longSide = Math.max(width, height);
      const scale = longSide > MAX_LONG_SIDE ? MAX_LONG_SIDE / longSide : 1;
      const w = Math.round(width * scale);
      const h = Math.round(height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    img.src = url;
  });
}

/** The hero (or first) photo for one activity, merging bundled + stored. */
export function activityHeroPhoto(
  activityId: string,
  bundled: ActivityPhoto[] = [],
): ActivityPhoto | null {
  const combined = [...bundled, ...readStored(activityId)];
  return combined.find((p) => p.isHero) ?? combined[0] ?? null;
}

/**
 * The first available family photo across a land's activities — used as the
 * "real view" area background. Read once per mount (re-reads when the land
 * changes, e.g. on navigation).
 */
export function useLandBackgroundPhoto(land: Land): ActivityPhoto | null {
  return useMemo(() => {
    for (const a of land.activities) {
      const hero = activityHeroPhoto(a.id, a.photos);
      if (hero) return hero;
    }
    return null;
  }, [land]);
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `p-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export interface UsePhotosResult {
  photos: ActivityPhoto[];
  hero: ActivityPhoto | null;
  addPhotos: (files: FileList | File[]) => Promise<void>;
  removePhoto: (id: string) => void;
  setHero: (id: string) => void;
  busy: boolean;
  error: string | null;
  overQuotaWarning: boolean;
}

/**
 * Merges bundled photos (from the data module) with user-added photos persisted
 * in localStorage under `photo:{activityId}`. Only user additions are written
 * back; bundled photos are read-only.
 */
export function usePhotos(
  activityId: string,
  bundled: ActivityPhoto[] = [],
): UsePhotosResult {
  const [stored, setStored] = useState<ActivityPhoto[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overQuotaWarning, setOverQuotaWarning] = useState(false);

  useEffect(() => {
    setStored(readStored(activityId));
  }, [activityId]);

  const persist = useCallback(
    (next: ActivityPhoto[]) => {
      try {
        writeStored(activityId, next);
        setStored(next);
        setOverQuotaWarning(totalPhotoBytes() > WARN_BYTES);
        setError(null);
      } catch {
        setError(
          'Out of local storage space. Try removing a photo before adding more.',
        );
      }
    },
    [activityId],
  );

  const photos = useMemo<ActivityPhoto[]>(() => {
    const combined = [...bundled, ...stored];
    // Ensure exactly one hero: prefer an explicit hero, else the first photo.
    const hasHero = combined.some((p) => p.isHero);
    if (!hasHero && combined.length > 0) {
      return combined.map((p, i) => (i === 0 ? { ...p, isHero: true } : p));
    }
    return combined;
  }, [bundled, stored]);

  const hero = useMemo(
    () => photos.find((p) => p.isHero) ?? photos[0] ?? null,
    [photos],
  );

  const addPhotos = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (list.length === 0) return;
      setBusy(true);
      setError(null);
      try {
        const made: ActivityPhoto[] = [];
        for (const file of list) {
          const src = await fileToDownscaledDataUri(file);
          made.push({ id: uuid(), src });
        }
        const existing = readStored(activityId);
        const noneHeroAnywhere =
          bundled.length === 0 &&
          existing.length === 0 &&
          !existing.some((p) => p.isHero);
        if (noneHeroAnywhere && made.length > 0) {
          made[0].isHero = true; // first photo added becomes hero by default
        }
        persist([...existing, ...made]);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not add photo.');
      } finally {
        setBusy(false);
      }
    },
    [activityId, bundled.length, persist],
  );

  const removePhoto = useCallback(
    (id: string) => {
      // Only user-added (stored) photos are removable.
      persist(readStored(activityId).filter((p) => p.id !== id));
    },
    [activityId, persist],
  );

  const setHero = useCallback(
    (id: string) => {
      // Hero flag can only live on a stored photo; mark it and clear others.
      const existing = readStored(activityId);
      if (!existing.some((p) => p.id === id)) return;
      persist(existing.map((p) => ({ ...p, isHero: p.id === id })));
    },
    [activityId, persist],
  );

  return {
    photos,
    hero,
    addPhotos,
    removePhoto,
    setHero,
    busy,
    error,
    overQuotaWarning,
  };
}
