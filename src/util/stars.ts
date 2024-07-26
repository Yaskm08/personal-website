import { Star, starRadiusRange } from '@/src/components/StarryBackground';

export function getStarField(size: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < size; i++) {
    const r = Math.floor(Math.random() * starRadiusRange + 2);
    const star: Star = {
      x: `calc(${Math.random() * 100}% - ${starRadiusRange + 2}px)`,
      y: `calc(${Math.random() * 100}% - ${starRadiusRange + 2}px)`,
      r: `${r}px`,
      opacity: r / starRadiusRange,
    };
    stars.push(star);
  }
  return stars;
}