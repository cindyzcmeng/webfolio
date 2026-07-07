export default function BackgroundGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 85% 65% at 50% 38%, var(--color-glow) 0%, rgba(225,250,211,0.55) 45%, #ffffff 78%)",
      }}
    />
  );
}
