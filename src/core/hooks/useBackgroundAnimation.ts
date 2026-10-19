import {useEffect, useRef} from "react";
import {COLORS, Theme} from "../../types/theme";
import {THEMES} from "../../config/themes";
import {createParticleBackground} from "../backgroundAnimation";
import type {
  ParticleBackgroundColors,
  ParticleBackgroundEngine,
} from "../interfaces";

const getColors = (theme: Theme): ParticleBackgroundColors => ({
  background: theme === THEMES.LIGHT ? COLORS.lightBg : COLORS.darkBg,
  dots: theme === THEMES.LIGHT ? COLORS.lightText : COLORS.darkText,
  lines: theme === THEMES.LIGHT ? COLORS.lightSecondary : COLORS.darkSecondary,
});

export const useBackgroundAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  theme: Theme,
): void => {
  const engineRef = useRef<ParticleBackgroundEngine | null>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    engineRef.current = createParticleBackground(
      canvas,
      getColors(themeRef.current),
    );

    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, [canvasRef]);

  useEffect(() => {
    engineRef.current?.setColors(getColors(theme));
  }, [theme]);
};
