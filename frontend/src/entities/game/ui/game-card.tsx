import { useCallback, useRef, useState, type MouseEvent } from "react";
import type { Game } from "../model";
import styles from "./game-card.module.css";
import { WindowsIcon } from "@shared/ui";

interface GameCardProps {
  data: Game;
}

export const GameCard = ({ data }: GameCardProps) => {
  const { image } = data;
  const imageUrl = "http://localhost:9000/default" + image;
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseOver = useCallback(() => setIsHover(true), []);

  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const maxRotate = 5;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotate({
      y: ((x - rect.width / 2) / (rect.width / 2)) * maxRotate,
      x: -((y - rect.height / 2) / (rect.height / 2)) * maxRotate,
    });
  };

  return (
    <div
      style={{
        perspective: "500px",
        transformStyle: "preserve-3d",
        isolation: "isolate",
      }}
    >
      <div
        ref={ref}
        className={styles.gameCard}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          transform: isHover
            ? `scale(1.05) translateZ(0) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
            : "translateZ(0)",
          transition: isHover ? "none" : "transform 0.4s ease",
        }}
      >
        <div className={styles.gameCard__body}>
          <div className="flex p-2">
            <WindowsIcon height="24px" width="24px" />
          </div>
          <img
            src={imageUrl}
            alt=""
            draggable={false}
            className="w-full select-none"
          />
        </div>
      </div>
    </div>
  );
};
