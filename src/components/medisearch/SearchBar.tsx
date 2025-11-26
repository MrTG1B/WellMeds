
"use client";

import React from "react";
import type { TranslationKeys } from "@/lib/translations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Camera } from "lucide-react";
import { SuggestionsList } from "./SuggestionsList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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
    <div className="relative w-full max-w-lg">
      <form onSubmit={onSubmit} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          placeholder={t.searchPlaceholder}
          className="flex-grow text-base"
          aria-label={t.searchPlaceholder}
          disabled={isLoading}
          autoComplete="off" // Disable browser autocomplete to prefer our suggestions
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onCameraClick}
                disabled={isLoading}
                aria-label={t.uploadPrescriptionTooltip}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.uploadPrescriptionTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button type="submit" disabled={isLoading || !searchQuery.trim()} className="min-w-[100px]">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          {t.searchButton}
        </Button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsList suggestions={suggestions} onSuggestionClick={onSuggestionClick} />
      )}
    </div>
  );
}
