import type { ThemeKey } from '../types';

export interface Theme {
  name: string;
  emoji: string; // for nav / sidebar
  primary: string; // main color, used for hero bg
  secondary: string; // accent
  textOnPrimary: string; // usually white or near-white
  surface: string; // card bg color (often near-white tinted)
  border: string;
  fontHint: 'serif' | 'mono' | 'display' | 'sans';
  gradient: string; // CSS gradient string for hero
}

// Colors are inspired by the real Disney land aesthetic — evocative, not
// trademarked. Each gradient pairs the primary with a darker/lighter tone so
// the hero reads well with white text (contrast verified against WCAG AA).
export const THEMES: Record<ThemeKey, Theme> = {
  cars: {
    name: 'Cars Land',
    emoji: '🏎️',
    primary: '#A8231F',
    secondary: '#E8A33D',
    textOnPrimary: '#FFFFFF',
    surface: '#FFF7F0',
    border: '#E7C9A8',
    fontHint: 'display',
    gradient: 'linear-gradient(135deg, #8E1B17 0%, #C9302C 45%, #E8762B 100%)',
  },
  hollywood: {
    name: 'Hollywood Land',
    emoji: '🎬',
    primary: '#1A1A1A',
    secondary: '#D4AF37',
    textOnPrimary: '#FFFFFF',
    surface: '#FAF7EF',
    border: '#E3D9BD',
    fontHint: 'display',
    gradient: 'linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 50%, #3A1F3A 100%)',
  },
  avengers: {
    name: 'Avengers Campus',
    emoji: '🛡️',
    primary: '#A81F24',
    secondary: '#E6B400',
    textOnPrimary: '#FFFFFF',
    surface: '#F4F6FA',
    border: '#C5CEDD',
    fontHint: 'mono',
    gradient: 'linear-gradient(135deg, #16233F 0%, #6E1418 60%, #A81F24 100%)',
  },
  pixar: {
    name: 'Pixar Pier',
    emoji: '🎡',
    primary: '#1565A0',
    secondary: '#E84545',
    textOnPrimary: '#FFFFFF',
    surface: '#F2F8FD',
    border: '#BBD8EC',
    fontHint: 'display',
    gradient: 'linear-gradient(135deg, #0E4D7C 0%, #1F77B4 55%, #E84545 100%)',
  },
  mainstreet: {
    name: 'Main Street, U.S.A.',
    emoji: '🚂',
    primary: '#7B1E1E',
    secondary: '#C79A3A',
    textOnPrimary: '#FFFFFF',
    surface: '#FBF6EC',
    border: '#E6D7B6',
    fontHint: 'serif',
    gradient: 'linear-gradient(135deg, #5E1515 0%, #7B1E1E 55%, #A8643A 100%)',
  },
  toontown: {
    name: "Mickey's Toontown",
    emoji: '🧀',
    primary: '#D62839',
    secondary: '#F4B400',
    textOnPrimary: '#FFFFFF',
    surface: '#FFF9E8',
    border: '#F4DC9A',
    fontHint: 'display',
    gradient: 'linear-gradient(135deg, #1E88C7 0%, #D62839 55%, #F4B400 100%)',
  },
  fantasyland: {
    name: 'Fantasyland',
    emoji: '🏰',
    primary: '#6A4E97',
    secondary: '#D98BB0',
    textOnPrimary: '#FFFFFF',
    surface: '#FBF5FB',
    border: '#E3CDE6',
    fontHint: 'serif',
    gradient: 'linear-gradient(135deg, #4E3A78 0%, #7B5EAB 55%, #D98BB0 100%)',
  },
  tomorrowland: {
    name: 'Tomorrowland',
    emoji: '🚀',
    primary: '#0077B6',
    secondary: '#5FA8B8',
    textOnPrimary: '#FFFFFF',
    surface: '#F0F8FB',
    border: '#B7DCE3',
    fontHint: 'mono',
    gradient: 'linear-gradient(135deg, #024E78 0%, #0077B6 55%, #4F9BB5 100%)',
  },
  galaxysedge: {
    name: "Galaxy's Edge",
    emoji: '🛸',
    primary: '#8A461F',
    secondary: '#5B7553',
    textOnPrimary: '#FFFFFF',
    surface: '#F6F2EC',
    border: '#D9C7B2',
    fontHint: 'mono',
    gradient: 'linear-gradient(135deg, #3B2A1E 0%, #8A461F 60%, #5B7553 100%)',
  },
  critter: {
    name: 'Critter Country',
    emoji: '🐻',
    primary: '#3F5C32',
    secondary: '#8B6F47',
    textOnPrimary: '#FFFFFF',
    surface: '#F4F6EF',
    border: '#CBD3BD',
    fontHint: 'serif',
    gradient: 'linear-gradient(135deg, #2C4222 0%, #4A6B3A 55%, #8B6F47 100%)',
  },
  neworleans: {
    name: 'New Orleans Square',
    emoji: '🎷',
    primary: '#3D1F4E',
    secondary: '#C79A3A',
    textOnPrimary: '#FFFFFF',
    surface: '#F7F2F8',
    border: '#D8C6DE',
    fontHint: 'serif',
    gradient: 'linear-gradient(135deg, #2A1438 0%, #3D1F4E 55%, #9A6B2F 100%)',
  },
  parade: {
    name: 'Parade Finale',
    emoji: '✨',
    primary: '#1A1A2E',
    secondary: '#E94560',
    textOnPrimary: '#FFFFFF',
    surface: '#F5F4FA',
    border: '#CFCBE0',
    fontHint: 'display',
    gradient: 'linear-gradient(135deg, #15152A 0%, #2C2C54 50%, #E94560 100%)',
  },
};

export const NEUTRAL_GRADIENT =
  'linear-gradient(135deg, #1b2951 0%, #3a4a73 55%, #6b7aa3 100%)';

export function getTheme(key: ThemeKey): Theme {
  return THEMES[key];
}
