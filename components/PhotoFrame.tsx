/**
 * A quiet stand-in for a photograph. The real photos arrive with the Sanity migration (milestone 2).
 * Sand fill, hairline-free, square, with the standard [BRACKETED] note.
 */
export function PhotoFrame({
  description,
  text,
  className = "",
}: {
  description: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={description}
      className={`t-caption flex w-full items-center justify-center bg-sand text-center text-ink-soft ${className}`}
    >
      {text}
    </div>
  );
}
