'use client';

export function TagChip({
  label,
  trigger,
}: {
  label: string;
  trigger: '@' | '#';
}) {
  const isAt = trigger === '@';
  const style: React.CSSProperties = isAt
    ? { background: '#cfe1ff', border: '1px solid #cfe1ff', color: '#1d4ed8' }
    : { background: '#ccf8d5', border: '1px solid #ccf8d5', color: '#047857' };

  return (
    <span
      className="inline-flex items-center font-semibold px-2 py-0.5 rounded mx-1"
      style={{ fontSize: 13, ...style }}
    >
      {trigger}
      {label}
    </span>
  );
}
