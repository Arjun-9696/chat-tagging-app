'use client';
import { TagChip } from './TagChip';

export default function ChatMessage({ text }: { text: string }) {
  const parts: (string | { trigger: string; name: string })[] = [];
  let lastIndex = 0;
  const re = /([@#][^\s@#]+)/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const idx = m.index;
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));

    parts.push({
      trigger: m[0][0],
      name: m[0].slice(1),
    });

    lastIndex = idx + m[0].length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return (
    <div
      className="
      inline-flex
      max-w-[80%]
      bg-white
      shadow-md
      px-4 py-2
      rounded-2xl
      animate-fadeIn
      break-words
      text-gray-800
    "
    >
      <div className="leading-relaxed break-words whitespace-pre-wrap">
        {parts.map((p, i) =>
          typeof p === 'string' ? (
            <span key={i}>{p}</span>
          ) : (
            <TagChip key={i} label={p.name} trigger={p.trigger as '@' | '#'} />
          )
        )}
      </div>
    </div>
  );
}
