import { Radar, RotateCcw } from "lucide-react";

interface SearchResultProps {
  count: number;
  isLoading?: boolean;
  filterActive?: boolean;
  onResetFilters?: () => void;
  language?: string;
  location?: string;
}

function SearchResult({
  count,
  isLoading = false,
  filterActive = false,
  onResetFilters,
  language,
  location,
}: SearchResultProps) {
  if (isLoading) {
    return (
      <section className="surface-panel mt-8 rounded-3xl p-10 text-center border border-border/70 bg-surface">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/55 animate-pulse">
          <Radar className="h-7 w-7 text-accent animate-spin" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">
          Scanning GitHub Directory...
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Fetching developer signals and live repository statistics from GitHub API.
        </p>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="surface-panel mt-8 rounded-3xl p-10 text-center border border-border/70 bg-surface">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/55">
          <Radar className="h-7 w-7 text-destructive" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">
          No Developers Found
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          No developer matched {language ? `language "${language}"` : ""}{" "}
          {location ? `location "${location}"` : ""}. Try adjusting or clearing your filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition hover:brightness-110"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset all filters
          </button>
        )}
      </section>
    );
  }

  // When developers are found and displayed, do not show the banner
  return null;
}

export default SearchResult;
