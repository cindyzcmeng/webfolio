export default function BackgroundGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 60% 45% at 50% 32%, var(--color-glow) 0%, #ffffff 70%)",
      }}
    />
  );
}
