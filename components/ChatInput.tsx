'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { addMessage } from '@/store/chatSlice';
import SuggestionsList from './SuggestionsList';
import { fetchSuggestionsAPI } from '@/lib/api';

export default function ChatInput() {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [value, setValue] = useState('');
  const [sugs, setSugs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [triggerChar, setTriggerChar] = useState<'@' | '#' | null>(null);
  const [triggerStart, setTriggerStart] = useState<number | null>(null);
  const [caretPos, setCaretPos] = useState(0);
  const [justInserted, setJustInserted] = useState(false);

  /* ---------------- Auto-resize Textarea ---------------- */
  const resizeInput = () => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  };

  useEffect(() => {
    resizeInput();
  }, [value]);

  /* --------------- Caret Listener ------------------ */
  useEffect(() => {
    const onSelect = () => {
      const el = inputRef.current;
      if (!el) return;
      setCaretPos(el.selectionStart ?? 0);
    };
    document.addEventListener('selectionchange', onSelect);
    return () => document.removeEventListener('selectionchange', onSelect);
  }, []);

  /* ------------- Fetch suggestions only when typing trigger word ------------- */
  useEffect(() => {
    if (!triggerChar || triggerStart === null) return;

    if (justInserted) {
      setOpen(false);
      setSugs([]);
      return;
    }

    const q = value.slice(triggerStart + 1, caretPos);
    fetchSuggestionsAPI(q).then((r) => {
      setSugs(r);
      setSelected(0);
      setOpen(true);
    });
  }, [value, caretPos, triggerChar, triggerStart, justInserted]);

  /* --------------- Set value & caret ---------------- */
  function setValueAndCaret(newVal: string, caretIndex: number) {
    setValue(newVal);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(caretIndex, caretIndex);
        setCaretPos(caretIndex);
        resizeInput();
      }
    });
  }

  /* ---------------- Key Down Logic ----------------- */
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === '@' || e.key === '#') {
      const pos = inputRef.current?.selectionStart ?? 0;
      setTriggerChar(e.key as '@' | '#');
      setTriggerStart(pos);
      setJustInserted(false);
      return;
    }

    if (open && sugs.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => (s + 1) % sugs.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => (s - 1 + sugs.length) % sugs.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        selectSuggestion(sugs[selected]);
        return;
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setSugs([]);
        return;
      }
    }

    /* ---------------- Backspace remove whole tag ----------------- */
    if (e.key === 'Backspace') {
      const pos = inputRef.current?.selectionStart ?? 0;
      if (pos > 0) {
        const left = value.slice(0, pos);
        const m = left.match(/([@#][^\s@#]+)\s?$/);
        if (m) {
          const token = m[1];
          const tokenStart = left.lastIndexOf(token);
          const tokenEnd = tokenStart + token.length;
          if (pos === tokenEnd || pos === tokenEnd + 1) {
            e.preventDefault();
            const newLeft = value.slice(0, tokenStart);
            const newRight = value.slice(pos);
            const leftEndsSpace = newLeft.endsWith(' ') || newLeft === '';
            const rightStartsSpace =
              newRight.startsWith(' ') || newRight === '';
            let newVal = '';
            let newCaret = 0;

            if (leftEndsSpace || rightStartsSpace) {
              newVal = newLeft + newRight;
              newCaret = newLeft.length;
            } else {
              newVal = newLeft + ' ' + newRight;
              newCaret = newLeft.length + 1;
            }

            newVal = newVal.replace(/\s{2,}/g, ' ');
            setValueAndCaret(newVal, newCaret);
            return;
          }
        }
      }
    }

    /* ---------------- Send message ----------------- */
    if (e.key === 'Enter' && !open) {
      e.preventDefault();
      const out = value.replace(/\s+/g, ' ').trim();
      if (!out) return;
      dispatch(addMessage(out));
      setValue('');
      resizeInput();
      return;
    }
  }

  /* ---------------- Input Change ---------------- */
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newVal = e.target.value;
    setValue(newVal);

    const pos = e.target.selectionStart ?? 0;
    setCaretPos(pos);

    if (justInserted) {
      setJustInserted(false);
      setTriggerChar(null);
      setTriggerStart(null);
      setOpen(false);
      setSugs([]);
    }

    resizeInput();
  }

  /* ---------------- Insert Suggestion ---------------- */
  function selectSuggestion(name: string) {
    if (triggerStart === null || triggerChar === null) return;

    const insert = `${triggerChar}${name} `;
    const before = value.slice(0, triggerStart);
    const after = value.slice(caretPos);
    const newVal = before + insert + after;
    const newCaret = (before + insert).length;

    setValueAndCaret(newVal, newCaret);

    setOpen(false);
    setSugs([]);
    setTriggerChar(null);
    setTriggerStart(null);
    setSelected(0);
    setJustInserted(true);
  }

  function onClickSuggestion(name: string) {
    selectSuggestion(name);
  }

  /* ---------------- Highlight Tags ---------------- */
  function highlightTags(text: string) {
    return text.replace(/([@#][^\s@#]+)/g, (m) => {
      if (m.startsWith('@')) {
        return `<span class="mention-tag">${m}</span>`;
      }
      if (m.startsWith('#')) {
        return `<span class="hashtag-tag">${m}</span>`;
      }
      return m;
    });
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="relative w-full">
      <div className="flex  justify-center items-center gap-2 ">
        <div className="relative w-full">
          <div
            className="
              absolute inset-0
              pointer-events-none
              whitespace-pre-wrap
              break-words
              p-3
              font-sans text-base leading-normal
              text-black
              bg-[#f2f2f2]
              rounded-xl
            "
            style={{
              minHeight: '40px',
            }}
            dangerouslySetInnerHTML={{
              __html: highlightTags(value) + '<span class="opacity-0">.</span>',
            }}
          />

          <textarea
            ref={inputRef}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="
    w-full
    p-3
    bg-transparent
    relative z-10
    caret-black
    font-sans text-base leading-normal

    text-transparent                /* hides typed text */
    placeholder-gray-400           /* placeholder visible */
    placeholder-opacity-100        /* ensure full opacity */

    resize-none
    overflow-hidden

    border-0
    outline-none
    focus:ring-0
  "
            style={{
              WebkitTextFillColor: 'transparent', // also hides typed text
              minHeight: '40px',
            }}
            placeholder="Type message — use @ or #"
          />
        </div>
        <button
          onClick={() => {
            const out = value.replace(/\s+/g, ' ').trim();
            if (!out) return;
            dispatch(addMessage(out));
            setValue('');
            resizeInput();
          }}
          className="w-15 md:w-13 h-12 flex items-center justify-center m-auto rounded-full bg-[#ffc700] hover:bg-green-600 transition shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 bottom-full mb-1 w-full bg-white shadow-lg rounded-xl z-50 transition-all duration-150">
          {sugs.length > 0 ? (
            <SuggestionsList
              items={sugs}
              selectedIndex={selected}
              onSelect={onClickSuggestion}
            />
          ) : (
            <div className="p-3 text-sm text-gray-400">No results</div>
          )}
        </div>
      )}
    </div>
  );
}
