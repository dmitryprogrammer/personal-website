import {useEffect} from "react";
import {COLORS, Theme} from "../../types/theme";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const MIN_WIDTH = 360;
const MAX_WIDTH = 1920;
const MIN_DOT_COUNT = 30;
const MAX_DOT_COUNT = 300;

const calculateDotCount = (width: number): number => {
  const boundedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width));

  return Math.round(
    MIN_DOT_COUNT +
      (boundedWidth - MIN_WIDTH) *
        ((MAX_DOT_COUNT - MIN_DOT_COUNT) / (MAX_WIDTH - MIN_WIDTH)),
  );
};

const ANIMATION_CONFIG = {
  dotMinRadius: 1,
  dotMaxRadius: 2,
  dotMaxSpeed: 0.5,
  connectionDistance: 150,
  lineWidth: 0.5,
};

const getDistance = (dot1: Dot, dot2: Dot): number => {
  const dx = dot1.x - dot2.x;
  const dy = dot1.y - dot2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const useBackgroundAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  theme: Theme,
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = {
      background: theme === "light" ? COLORS.lightBg : COLORS.darkBg,
      dots: theme === "light" ? COLORS.lightText : COLORS.darkText,
      lines: theme === "light" ? COLORS.lightSecondary : COLORS.darkSecondary,
    };

    const dots: Dot[] = [];

    const initDots = () => {
      dots.length = 0;

      const dotCount = calculateDotCount(canvas.width);

      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed,
          vy: (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed,
          radius:
            ANIMATION_CONFIG.dotMinRadius +
            Math.random() *
              (ANIMATION_CONFIG.dotMaxRadius - ANIMATION_CONFIG.dotMinRadius),
        });
      }
    };

    const updateDots = () => {
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx = -dot.vx;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy = -dot.vy;
      });
    };

    const draw = () => {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = colors.lines;
      ctx.lineWidth = ANIMATION_CONFIG.lineWidth;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const distance = getDistance(dots[i], dots[j]);
          if (distance < ANIMATION_CONFIG.connectionDistance) {
            const opacity = 1 - distance / ANIMATION_CONFIG.connectionDistance;
            ctx.strokeStyle = `${colors.lines}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      dots.forEach((dot) => {
        ctx.fillStyle = colors.dots;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    let animationId: number;
    const animate = () => {
      updateDots();
      draw();
      animationId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    resizeCanvas();
    initDots();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [canvasRef, theme]);
};
