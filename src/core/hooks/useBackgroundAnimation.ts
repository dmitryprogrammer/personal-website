import {useEffect} from "react";
import {COLORS, Theme} from "../../types/theme";

interface Dot {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
  radius: number;
}

const MIN_WIDTH = 360;
const MAX_WIDTH = 1920;
const MIN_DOT_COUNT = 100;
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
  const dotX = dot1.positionX - dot2.positionX;
  const dotY = dot1.positionY - dot2.positionY;
  return Math.sqrt(dotX * dotX + dotY * dotY);
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
    let animationId: number;

    const initDots = () => {
      dots.length = 0;

      const dotCount = calculateDotCount(canvas.width);

      for (let i = 0; i < dotCount; i++) {
        dots.push({
          positionX: Math.random() * canvas.width,
          positionY: Math.random() * canvas.height,
          velocityX: (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed,
          velocityY: (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed,
          radius:
            ANIMATION_CONFIG.dotMinRadius +
            Math.random() *
              (ANIMATION_CONFIG.dotMaxRadius - ANIMATION_CONFIG.dotMinRadius),
        });
      }
    };

    const updateDots = () => {
      dots.forEach((dot) => {
        dot.positionX += dot.velocityX;
        dot.positionY += dot.velocityY;

        if (dot.positionX <= 0 || dot.positionX >= canvas.width)
          dot.velocityX = -dot.velocityX;
        if (dot.positionY <= 0 || dot.positionY >= canvas.height)
          dot.velocityY = -dot.velocityY;
      });
    };

    const draw = () => {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = colors.lines;
      ctx.lineWidth = ANIMATION_CONFIG.lineWidth;

      for (let dot1 = 0; dot1 < dots.length; dot1++) {
        for (let dot2 = dot1 + 1; dot2 < dots.length; dot2++) {
          const distance = getDistance(dots[dot1], dots[dot2]);
          if (distance < ANIMATION_CONFIG.connectionDistance) {
            const opacity = 1 - distance / ANIMATION_CONFIG.connectionDistance;
            ctx.strokeStyle = `${colors.lines}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(dots[dot1].positionX, dots[dot1].positionY);
            ctx.lineTo(dots[dot2].positionX, dots[dot2].positionY);
            ctx.stroke();
          }
        }
      }

      dots.forEach((dot) => {
        ctx.fillStyle = colors.dots;
        ctx.beginPath();
        ctx.arc(dot.positionX, dot.positionY, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

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
