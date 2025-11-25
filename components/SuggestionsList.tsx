'use client';

export default function SuggestionsList({
  items,
  selectedIndex,
  onSelect,
}: {
  items: string[];
  selectedIndex: number;
  onSelect: (s: string) => void;
}) {
  return (
    <ul className="max-h-60 overflow-y-auto rounded-xl bg-white shadow-lg py-2 animate-suggestionPopup">
      {items.map((it, i) => (
        <li
          key={it + i}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(it)}
          className={`
            px-4 py-2 cursor-pointer
            text-gray-800
            transition-all
            ${
              i === selectedIndex
                ? 'bg-blue-100 font-medium' 
                : 'hover:bg-gray-100'
            }
          `}
        >
          {it}
        </li>
      ))}
    </ul>
  );
}
