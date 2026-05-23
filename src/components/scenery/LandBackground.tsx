import { useState } from 'react';
import type { ImageCredit, Land } from '../../types';
import { useLandBackgroundPhoto } from '../../hooks/usePhotos';
import { LandScene } from './LandScene';

/**
 * Area background, in order of preference:
 *   1. a family photo uploaded to this land (the truest "real view")
 *   2. a licensed reference image (land.heroImage) with attribution
 *   3. the illustrated scene (always works, offline-safe)
 * If a referenced image fails to load, it falls back to the scene.
 */
export function LandBackground({
  land,
  className = '',
}: {
  land: Land;
  className?: string;
}) {
  const familyPhoto = useLandBackgroundPhoto(land);
  const [imgFailed, setImgFailed] = useState(false);

  const photoSrc = familyPhoto?.src;
  const webSrc = land.heroImage;
  const src = photoSrc ?? (imgFailed ? undefined : webSrc);
  const credit: ImageCredit | undefined =
    !photoSrc && webSrc && !imgFailed ? land.heroImageCredit : undefined;

  if (src) {
    return (
      <>
        <img
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          onError={() => setImgFailed(true)}
          className={`${className} object-cover`}
        />
        {credit && (
          <span className="absolute bottom-1 right-2 z-10 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/85 no-print">
            {credit.href ? (
              <a href={credit.href} target="_blank" rel="noreferrer noopener">
                {credit.text}
              </a>
            ) : (
              credit.text
            )}
          </span>
        )}
      </>
    );
  }

  return <LandScene themeKey={land.theme} className={`${className} scene-breath`} />;
}
