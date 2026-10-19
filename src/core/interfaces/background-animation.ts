export interface ParticleBackgroundColors {
  background: string;
  dots: string;
  lines: string;
}

export interface ParticleBackgroundConfig {
  minWidth: number;
  maxWidth: number;
  minDotCount: number;
  maxDotCount: number;
  dotMinRadius: number;
  dotMaxRadius: number;
  dotMaxSpeed: number;
  connectionDistance: number;
  lineWidth: number;
  cursorAttachDistance: number;
}

export interface ParticleBackgroundEngine {
  destroy: () => void;
  setColors: (colors: ParticleBackgroundColors) => void;
}
