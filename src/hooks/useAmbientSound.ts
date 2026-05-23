import { useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import type { ThemeKey } from '../types';

/**
 * Ambient sound, opt-in and muted by default.
 *
 * We synthesize a soft tonal pad with the Web Audio API (no audio files to ship
 * or load). Each land gets a gentle chord that evokes its mood. The whole
 * system stays silent until the user toggles it on.
 */

const STORAGE_KEY = 'ambient-enabled';

// ---- tiny external store for the on/off toggle (no state library) ----
const listeners = new Set<() => void>();
let enabled = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
})();

function emit() {
  listeners.forEach((l) => l());
}

export function setAmbientEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
  } catch {
    /* ignore */
  }
  engine.setEnabled(value);
  emit();
}

export function useAmbientEnabled(): [boolean, (v: boolean) => void] {
  const value = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => enabled,
    () => false,
  );
  return [value, setAmbientEnabled];
}

// ---- chord (in Hz) per land — soft, mostly low/mid, evocative not literal ----
const CHORDS: Record<ThemeKey, number[]> = {
  cars: [110, 165, 220], // warm A power-ish
  hollywood: [98, 147, 196], // moody G
  avengers: [73.4, 110, 146.8], // low D, industrial
  pixar: [130.8, 196, 261.6], // bright C major-ish
  mainstreet: [123.5, 185, 246.9], // warm B
  toontown: [146.8, 220, 293.7], // playful D
  fantasyland: [138.6, 207.7, 277.2], // airy C#
  tomorrowland: [116.5, 174.6, 233.1], // cool A#
  galaxysedge: [82.4, 110, 164.8], // sparse, alien E
  critter: [98, 130.8, 196], // earthy G/C
  neworleans: [103.8, 155.6, 207.7], // jazzy G#
  parade: [87.3, 130.8, 174.6], // night-sky F
};

class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: { osc: OscillatorNode; gain: GainNode }[] = [];
  private current: ThemeKey | null = null;
  private on = false;

  private ensureCtx() {
    if (this.ctx) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
  }

  setEnabled(value: boolean) {
    this.on = value;
    if (value) {
      this.ensureCtx();
      // Browsers require a resume after a user gesture; the toggle is one.
      void this.ctx?.resume();
      if (this.current) this.play(this.current);
      this.ramp(this.master, 0.06, 0.8);
    } else {
      this.ramp(this.master, 0, 0.5);
    }
  }

  setTheme(theme: ThemeKey | null) {
    this.current = theme;
    if (!this.on || !theme) return;
    this.play(theme);
  }

  private ramp(node: GainNode | null, to: number, seconds: number) {
    if (!node || !this.ctx) return;
    const now = this.ctx.currentTime;
    node.gain.cancelScheduledValues(now);
    node.gain.setValueAtTime(node.gain.value, now);
    node.gain.linearRampToValueAtTime(to, now + seconds);
  }

  private play(theme: ThemeKey) {
    this.ensureCtx();
    if (!this.ctx || !this.master) return;
    // fade out + stop old voices
    const old = this.voices;
    old.forEach((v) => {
      this.ramp(v.gain, 0, 0.4);
      window.setTimeout(() => {
        try {
          v.osc.stop();
        } catch {
          /* already stopped */
        }
      }, 500);
    });
    this.voices = [];

    const freqs = CHORDS[theme];
    freqs.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      // gentle detune for warmth
      osc.detune.value = (i - 1) * 4;
      const gain = this.ctx!.createGain();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(this.master!);
      osc.start();
      this.ramp(gain, 0.5 / freqs.length, 1.2);
      this.voices.push({ osc, gain });
    });
  }
}

const engine = new AmbientEngine();

/** Drive the ambient engine for the current land's theme. */
export function useAmbientSound(themeKey: ThemeKey | null) {
  useEffect(() => {
    engine.setTheme(themeKey);
  }, [themeKey]);
}
