import {useRef} from "react";
import {useBackgroundAnimation} from "../../core/hooks/useBackgroundAnimation";
import "./Background.scss";
import {THEMES} from "../../config/themes";

interface BackgroundProps {
  theme: THEMES;
}

export const Background: React.FC<BackgroundProps> = ({
  theme = THEMES.LIGHT,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundAnimation(canvasRef, theme);

  return <canvas ref={canvasRef} className="background" />;
};
