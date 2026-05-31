export type Theme = 'light' | 'dark';

// Общие цвета, используемые в разных темах
export const COLORS = {
  // Основные цвета
  lightBg: '#e2e8f0',
  lightText: '#1a202c',
  lightSecondary: '#4a5568',
  darkBg: '#000000',
  darkText: '#e2e8f0',
  darkSecondary: '#a0aec0',
  
  // Дополнительные цвета для анимаций
  lightAccent: '#3182ce',
  darkAccent: '#63b3ed'
} as const;