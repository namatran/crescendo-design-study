import { useId, useMemo } from "react";
import { coverArtSpec } from "@/lib/coverArt";

const fill = (stop: string) => `var(--theme-${stop})`;

export function CoverArt({ seed, label }: { seed: string; label: string }) {
  const spec = useMemo(() => coverArtSpec(seed), [seed]);
  const id = useId();
  const [focus] = spec.orbs;

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={label} className="h-full w-full rounded-xl shadow-md">
      <defs>
        <linearGradient id={`${id}-bg`} gradientTransform={`rotate(${spec.angle} .5 .5)`}>
          <stop offset="0" stopColor={fill("primary")} />
          <stop offset=".5" stopColor={fill("accent")} />
          <stop offset="1" stopColor={fill("secondary")} />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <rect width="100" height="100" rx="8" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="100" height="100" fill={`url(#${id}-bg)`} />
        <g filter={`url(#${id}-blur)`}>
          {spec.orbs.map((orb, i) => (
            <circle key={i} cx={orb.cx} cy={orb.cy} r={orb.r} fill={fill(orb.stop)} opacity={orb.opacity} />
          ))}
        </g>
        <g fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth=".6">
          {spec.rings.map((r) => (
            <circle key={r} cx={focus.cx} cy={focus.cy} r={r} />
          ))}
        </g>
      </g>
    </svg>
  );
}
