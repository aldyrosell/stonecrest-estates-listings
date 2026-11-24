import { brandColor } from "./projectConfig";

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden>
      <text x="16" y="25" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fill={brandColor}>
        V
      </text>
    </svg>
  );
}
