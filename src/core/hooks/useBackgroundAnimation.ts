import {useEffect, useRef} from "react";
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
const MIN_DOT_COUNT = 50;
const MAX_DOT_COUNT = 500;

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
  cursorAttachDistance: 50,
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
  // Mutable refs to avoid re‑renders on mouse move / attachment change
  const mousePos = useRef<{x: number; y: number} | null>(null);
  const attachedDotIndex = useRef<number | null>(null);

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
      attachedDotIndex.current = null; // reset attachment on resize
    };

    const updateDots = () => {
      dots.forEach((dot, i) => {
        if (i === attachedDotIndex.current) return;

        dot.positionX += dot.velocityX;
        dot.positionY += dot.velocityY;

        if (dot.positionX <= 0 || dot.positionX >= canvas.width)
          dot.velocityX = -dot.velocityX;
        if (dot.positionY <= 0 || dot.positionY >= canvas.height)
          dot.velocityY = -dot.velocityY;
      });

      if (attachedDotIndex.current !== null && mousePos.current) {
        const dot = dots[attachedDotIndex.current];
        dot.positionX = mousePos.current.x;
        dot.positionY = mousePos.current.y;
      }
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePos.current = {x, y};

      let closestDist = Infinity;
      let closestIdx = -1;
      for (let i = 0; i < dots.length; i++) {
        if (i === attachedDotIndex.current) continue;
        const dx = dots[i].positionX - x;
        const dy = dots[i].positionY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }

      const threshold = ANIMATION_CONFIG.cursorAttachDistance;

      if (closestIdx !== -1 && closestDist < threshold) {
        if (
          attachedDotIndex.current !== null &&
          attachedDotIndex.current !== closestIdx
        ) {
          dots[attachedDotIndex.current].velocityX =
            (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed;
          dots[attachedDotIndex.current].velocityY =
            (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed;
        }
        attachedDotIndex.current = closestIdx;
        dots[closestIdx].velocityX = 0;
        dots[closestIdx].velocityY = 0;
      }
    };

    const handleMouseLeave = () => {
      mousePos.current = null;
      if (attachedDotIndex.current !== null) {
        dots[attachedDotIndex.current].velocityX =
          (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed;
        dots[attachedDotIndex.current].velocityY =
          (Math.random() - 0.5) * ANIMATION_CONFIG.dotMaxSpeed;
        attachedDotIndex.current = null;
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    initDots();
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [canvasRef, theme]);
};
