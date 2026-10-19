import type {
  ParticleBackgroundColors,
  ParticleBackgroundConfig,
  ParticleBackgroundEngine,
} from "./interfaces";

interface Dot {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
  radius: number;
}

const DEFAULT_PARTICLE_CONFIG: ParticleBackgroundConfig = {
  minWidth: 360,
  maxWidth: 1920,
  minDotCount: 50,
  maxDotCount: 500,
  dotMinRadius: 1,
  dotMaxRadius: 2,
  dotMaxSpeed: 0.5,
  connectionDistance: 150,
  lineWidth: 0.5,
  cursorAttachDistance: 50,
};

const EDGE_OPACITY_BUCKETS = 4;
const TWO_PI = Math.PI * 2;

const calculateDotCount = (
  width: number,
  config: Partial<ParticleBackgroundConfig> = {},
): number => {
  const {minWidth, maxWidth, minDotCount, maxDotCount} = {
    ...DEFAULT_PARTICLE_CONFIG,
    ...config,
  };
  const boundedWidth = Math.max(minWidth, Math.min(maxWidth, width));
  return Math.round(
    minDotCount +
      (boundedWidth - minWidth) *
        ((maxDotCount - minDotCount) / (maxWidth - minWidth)),
  );
};

export const createParticleBackground = (
  canvas: HTMLCanvasElement,
  initialColors: ParticleBackgroundColors,
  config: Partial<ParticleBackgroundConfig> = {},
): ParticleBackgroundEngine => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return {destroy: () => undefined, setColors: () => undefined};
  }

  const cfg = {...DEFAULT_PARTICLE_CONFIG, ...config};
  const connectionDistanceSquared =
    cfg.connectionDistance * cfg.connectionDistance;
  const cursorAttachDistanceSquared =
    cfg.cursorAttachDistance * cfg.cursorAttachDistance;

  let colors = initialColors;
  let dots: Dot[] = [];
  let mousePos: {x: number; y: number} | null = null;
  let attachedDotIndex: number | null = null;
  let canvasRect = {left: 0, top: 0};
  let viewportWidth = 0;
  let viewportHeight = 0;
  let previousWidth = 0;
  let previousHeight = 0;

  let animationId: number | undefined;
  let resizeRafId: number | undefined;
  let isAnimating = false;

  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  const getRandomVelocity = () => (Math.random() - 0.5) * cfg.dotMaxSpeed;

  const randomizeVelocity = (dot: Dot) => {
    dot.velocityX = getRandomVelocity();
    dot.velocityY = getRandomVelocity();
  };

  const initDots = () => {
    const dotCount = calculateDotCount(viewportWidth, cfg);
    dots = Array.from({length: dotCount}, () => ({
      positionX: Math.random() * viewportWidth,
      positionY: Math.random() * viewportHeight,
      velocityX: getRandomVelocity(),
      velocityY: getRandomVelocity(),
      radius:
        cfg.dotMinRadius +
        Math.random() * (cfg.dotMaxRadius - cfg.dotMinRadius),
    }));
    attachedDotIndex = null;
    mousePos = null;
  };

  const updateDots = () => {
    for (let i = 0; i < dots.length; i++) {
      if (i === attachedDotIndex) continue;

      const dot = dots[i];
      dot.positionX += dot.velocityX;
      dot.positionY += dot.velocityY;

      if (
        dot.positionX < dot.radius ||
        dot.positionX > viewportWidth - dot.radius
      ) {
        dot.velocityX = -dot.velocityX;
        dot.positionX = Math.min(
          Math.max(dot.positionX, dot.radius),
          viewportWidth - dot.radius,
        );
      }
      if (
        dot.positionY < dot.radius ||
        dot.positionY > viewportHeight - dot.radius
      ) {
        dot.velocityY = -dot.velocityY;
        dot.positionY = Math.min(
          Math.max(dot.positionY, dot.radius),
          viewportHeight - dot.radius,
        );
      }
    }

    if (attachedDotIndex !== null && mousePos) {
      const dot = dots[attachedDotIndex];
      if (dot) {
        dot.positionX = mousePos.x;
        dot.positionY = mousePos.y;
      }
    }
  };

  const draw = () => {
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);

    const edgeBuckets: {path: Path2D; count: number}[] = Array.from(
      {length: EDGE_OPACITY_BUCKETS},
      () => ({path: new Path2D(), count: 0}),
    );

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].positionX - dots[j].positionX;
        const dy = dots[i].positionY - dots[j].positionY;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared >= connectionDistanceSquared) continue;

        const opacity = 1 - distanceSquared / connectionDistanceSquared;
        const bucketIndex = Math.min(
          EDGE_OPACITY_BUCKETS - 1,
          Math.floor(opacity * EDGE_OPACITY_BUCKETS),
        );

        edgeBuckets[bucketIndex].path.moveTo(
          dots[i].positionX,
          dots[i].positionY,
        );
        edgeBuckets[bucketIndex].path.lineTo(
          dots[j].positionX,
          dots[j].positionY,
        );
        edgeBuckets[bucketIndex].count++;
      }
    }

    ctx.strokeStyle = colors.lines;
    ctx.lineWidth = cfg.lineWidth;
    for (
      let bucketIndex = 0;
      bucketIndex < EDGE_OPACITY_BUCKETS;
      bucketIndex++
    ) {
      const bucket = edgeBuckets[bucketIndex];
      if (bucket.count === 0) continue;
      ctx.globalAlpha = (bucketIndex + 0.5) / EDGE_OPACITY_BUCKETS;
      ctx.stroke(bucket.path);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = colors.dots;
    ctx.beginPath();
    for (const dot of dots) {
      ctx.moveTo(dot.positionX + dot.radius, dot.positionY);
      ctx.arc(dot.positionX, dot.positionY, dot.radius, 0, TWO_PI);
    }
    ctx.fill();
  };

  const animate = () => {
    updateDots();
    draw();
    animationId = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (isAnimating) return;
    isAnimating = true;
    animationId = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    isAnimating = false;
    if (animationId !== undefined) {
      cancelAnimationFrame(animationId);
      animationId = undefined;
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;
    mousePos = {x, y};

    let closestDistanceSquared = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < dots.length; i++) {
      if (i === attachedDotIndex) continue;
      const dx = dots[i].positionX - x;
      const dy = dots[i].positionY - y;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < closestDistanceSquared) {
        closestDistanceSquared = distanceSquared;
        closestIndex = i;
      }
    }

    if (
      closestIndex !== -1 &&
      closestDistanceSquared < cursorAttachDistanceSquared
    ) {
      if (attachedDotIndex !== null && attachedDotIndex !== closestIndex) {
        randomizeVelocity(dots[attachedDotIndex]);
      }
      attachedDotIndex = closestIndex;
      dots[closestIndex].velocityX = 0;
      dots[closestIndex].velocityY = 0;
    }
  };

  const handlePointerLeave = () => {
    mousePos = null;
    if (attachedDotIndex !== null) {
      const dot = dots[attachedDotIndex];
      if (dot) randomizeVelocity(dot);
      attachedDotIndex = null;
    }
  };

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;

    if (dots.length > 0 && previousWidth > 0 && previousHeight > 0) {
      const scaleX = nextWidth / previousWidth;
      const scaleY = nextHeight / previousHeight;
      for (const dot of dots) {
        dot.positionX *= scaleX;
        dot.positionY *= scaleY;
      }
    }

    previousWidth = nextWidth;
    previousHeight = nextHeight;
    viewportWidth = nextWidth;
    viewportHeight = nextHeight;

    canvas.width = Math.max(1, Math.floor(nextWidth * dpr));
    canvas.height = Math.max(1, Math.floor(nextHeight * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvasRect = canvas.getBoundingClientRect();

    if (dots.length === 0) initDots();
  };

  const scheduleResize = () => {
    if (resizeRafId !== undefined) return;
    resizeRafId = requestAnimationFrame(() => {
      resizeRafId = undefined;
      resizeCanvas();
      if (!isAnimating) draw();
    });
  };

  const handleReducedMotionChange = () => {
    const prefersReducedMotion = Boolean(mediaQuery?.matches);
    if (prefersReducedMotion) {
      stopAnimation();
      draw();
    } else {
      startAnimation();
    }
  };

  const destroy = () => {
    stopAnimation();
    if (resizeRafId !== undefined) {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = undefined;
    }
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerleave", handlePointerLeave);
    window.removeEventListener("resize", scheduleResize);
    mediaQuery?.removeEventListener("change", handleReducedMotionChange);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const setColors = (nextColors: ParticleBackgroundColors) => {
    colors = nextColors;
    if (!isAnimating) draw();
  };

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("resize", scheduleResize);
  mediaQuery?.addEventListener("change", handleReducedMotionChange);

  resizeCanvas();
  handleReducedMotionChange();

  return {destroy, setColors};
};
