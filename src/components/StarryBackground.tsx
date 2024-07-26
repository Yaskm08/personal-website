import { TargetAndTransition, motion, useAnimationFrame } from 'framer-motion';
import { useState } from 'react';

export const starRadiusRange = 6;
const animationDuration = 0.5; // seconds
const twinkleAnimation: TargetAndTransition = {
  opacity: [
    ...new Array(20).fill(0).map((_, i) => 1 - (i + 1) * 0.05),
    ...new Array(20).fill(0).map((_, i) => 1 - 19 * 0.05 + i * 0.05),
  ],
  transition: { duration: animationDuration },
};

export interface StarryBackgroundProps {
  stars: Star[];
}

export interface Star {
  x: string;
  y: string;
  r: string;
  opacity: number;
}

export default function StarryBackground({ stars }: StarryBackgroundProps) {
  let ticker = 0;
  const [starToAnimate, setStarToAnimate] = useState<number>(0);
  useAnimationFrame((time, delta) => {
    ticker += delta;
    if (ticker > animationDuration * 1000) {
      ticker = 0;
      if (Math.random() > 0.5) {
        setStarToAnimate(Math.floor(Math.random() * stars.length));
      }
    }
  });

  if (!stars) return null;

  return (
    <>
      {stars.map(({ x, y, r, opacity }, i) => (
        <motion.div
          key={i}
          initial={false}
          className="box"
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: r,
            height: r,
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          }}
          animate={starToAnimate === i ? twinkleAnimation : {}}
        />
      ))}
    </>
  );
}