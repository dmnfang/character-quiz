// Simple inline SVG arrow — avoids missing-glyph rendering issues with display fonts
export default function Arrow({ direction = 'right', size = 20 }) {
  const rotate = direction === 'left' ? 180 : 0;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)`, flexShrink: 0 }}
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}