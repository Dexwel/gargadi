export function HeroPhone() {
  return (
    <svg viewBox="0 0 280 360" className="mx-auto w-full max-w-[260px]" role="img" aria-label="A phone showing a Gargadi flood warning (simulated)">
      <rect x="10" y="4" width="260" height="352" rx="32" fill="#0B2A3A" />
      <rect x="24" y="24" width="232" height="312" rx="20" fill="#E6F2F7" />
      <rect x="40" y="50" width="200" height="34" rx="10" fill="#0E5E7E" />
      <text x="52" y="72" fill="#fff" fontSize="14" fontWeight="700" fontFamily="sans-serif">🌊 Gargadi · HIGH</text>
      <rect x="40" y="96" width="200" height="132" rx="12" fill="#fff" />
      {["Move to higher ground now.", "Take children and elders.", "Do not cross flooded roads."].map((l, i) => (
        <text key={l} x="52" y={124 + i * 28} fill="#0B2A3A" fontSize="13" fontFamily="sans-serif">{l}</text>
      ))}
      <rect x="40" y="244" width="200" height="40" rx="10" fill="#F2A93B" />
      <text x="140" y="269" textAnchor="middle" fill="#0B2A3A" fontSize="14" fontWeight="700" fontFamily="sans-serif">▶ Listen (audio)</text>
      <text x="140" y="312" textAnchor="middle" fill="#5B6F7B" fontSize="11" fontFamily="sans-serif">SIMULATED EXAMPLE</text>
    </svg>
  );
}
