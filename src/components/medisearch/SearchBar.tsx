
"use client";

import React from "react";
import type { TranslationKeys } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Camera } from "lucide-react";
import { SuggestionsList } from "./SuggestionsList";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  t: TranslationKeys;
  suggestions: string[];
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onCameraClick: () => void;
}

export function SearchBar({
  searchQuery,
  onSearchQueryChange,
  onSubmit,
  isLoading,
  t,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  onInputFocus,
  onInputBlur,
  onCameraClick,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit}>
          <div className="relative flex w-full items-center rounded-full bg-white shadow-lg transition-shadow hover:shadow-xl" style={{boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'}}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  placeholder={t.searchPlaceholder}
                  className="w-full h-14 pl-12 pr-12 rounded-full border-none text-base bg-transparent focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label={t.searchPlaceholder}
                  disabled={isLoading}
                  autoComplete="off"
              />
              <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onCameraClick}
                  disabled={isLoading}
                  aria-label={t.uploadPrescriptionTooltip}
                  className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                  <Camera className="h-6 w-6" />
              </Button>
          </div>
            {/* We need a hidden submit button to allow form submission on mobile keyboards */}
            <button type="submit" disabled={isLoading} className="hidden" aria-hidden="true"></button>
        </form>
        {showSuggestions && suggestions.length > 0 && (
        <SuggestionsList suggestions={suggestions} onSuggestionClick={onSuggestionClick} />
      )}
    </div>
  );
}
