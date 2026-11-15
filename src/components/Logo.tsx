export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 5C32 5 12 26 12 40a20 20 0 0 0 40 0C52 26 32 5 32 5Z" fill="#0E5E7E" />
      <path d="M21 42a11 11 0 0 1 22 0" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M26 42a6 6 0 0 1 12 0" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="32" cy="45" r="3.6" fill="#F2A93B" />
    </svg>
  );
}
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoIcon />
      <span className="font-display text-2xl font-bold text-ink">Gargadi</span>
    </span>
  );
}
