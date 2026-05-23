import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { ThemeKey } from '../types';
import { getTheme, type Theme } from '../themes';

export interface ThemeVars extends CSSProperties {
  '--theme-primary': string;
  '--theme-secondary': string;
  '--theme-on-primary': string;
  '--theme-surface': string;
  '--theme-border': string;
  '--theme-gradient': string;
}

export interface UseThemeResult {
  theme: Theme;
  /** Spread onto a container to expose theme CSS variables to descendants. */
  style: ThemeVars;
  /** Tailwind helper class for the theme's font hint. */
  fontHintClass: string;
}

const FONT_HINT_CLASS: Record<Theme['fontHint'], string> = {
  serif: 'font-hint-serif',
  display: 'font-hint-display',
  mono: 'font-hint-mono',
  sans: 'font-hint-sans',
};

export function useTheme(themeKey: ThemeKey): UseThemeResult {
  return useMemo(() => {
    const theme = getTheme(themeKey);
    const style: ThemeVars = {
      '--theme-primary': theme.primary,
      '--theme-secondary': theme.secondary,
      '--theme-on-primary': theme.textOnPrimary,
      '--theme-surface': theme.surface,
      '--theme-border': theme.border,
      '--theme-gradient': theme.gradient,
    };
    return { theme, style, fontHintClass: FONT_HINT_CLASS[theme.fontHint] };
  }, [themeKey]);
}
