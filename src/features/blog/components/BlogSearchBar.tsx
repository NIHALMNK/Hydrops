import React, { useEffect, useRef } from 'react';

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function BlogSearchBar({ query, onQueryChange, onClear, placeholder = 'Search Journal...' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener: ⌘ K or Ctrl K to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <svg
          className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search Journal articles"
          className="w-full pl-12 pr-20 py-3.5 rounded-2xl bg-neutral-100/90 border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 transition-all duration-300 shadow-sm"
        />

        {/* Keyboard shortcut badge or Clear Button */}
        <div className="absolute right-3.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              aria-label="Clear search query"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-neutral-400 bg-white border border-neutral-200 rounded shadow-2xs pointer-events-none">
              ⌘ K
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
}
