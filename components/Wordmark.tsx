/** "FORM | ibiza": Didot, letter-spaced, with a hairline divider. */
export function Wordmark({ bold = false, className = "" }: { bold?: boolean; className?: string }) {
  return (
    <span className={`t-wordmark inline-flex items-center whitespace-nowrap ${className}`} style={{ gap: "0.5em" }}>
      <span style={bold ? { fontWeight: 700 } : undefined}>FORM</span>{" "}
      <span
        aria-hidden="true"
        className="block bg-current opacity-45"
        style={{ width: 1, height: "1em", marginLeft: "-0.2em" }}
      />{" "}
      <span>ibiza</span>
    </span>
  );
}
