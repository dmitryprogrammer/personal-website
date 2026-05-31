import {useRef} from "react";
import {Theme} from "../../types/theme";
import {useBackgroundAnimation} from "../../core/hooks/useBackgroundAnimation";
import "./Background.scss";

interface BackgroundProps {
  theme: Theme;
}

export const Background: React.FC<BackgroundProps> = ({theme = "light"}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useBackgroundAnimation(canvasRef, theme);

  return <canvas ref={canvasRef} className="background" />;
};
