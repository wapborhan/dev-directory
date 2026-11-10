import { FormEvent } from "react";
import {
  Clock3,
  CodeXml,
  Copy,
  Heart,
  MapPin,
  Radar,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

interface SearchFormProps {
  language: string;
  onLanguageChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  sortBy: "followers" | "repos" | "joined";
  onSortChange: (value: "followers" | "repos" | "joined") => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  onSubmit: (e?: FormEvent) => void;
  totalMatches: number;
}

const SearchForm = ({
  language,
  onLanguageChange,
  location,
  onLocationChange,
  sortBy,
  onSortChange,
  showFavorites,
  onToggleFavorites,
  onSubmit,
  totalMatches,
}: SearchFormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleCopySearchLink = () => {
    const url = new URL(window.location.href);
    if (language) url.searchParams.set("lang", language);
    else url.searchParams.delete("lang");

    if (location) url.searchParams.set("loc", location);
    else url.searchParams.delete("loc");

    if (showFavorites) url.searchParams.set("favorites", "true");
    else url.searchParams.delete("favorites");

    url.searchParams.set("sort", sortBy);

    navigator.clipboard.writeText(url.toString());
    toast.success("Search deck link copied to clipboard!");
  };

  const setPreset = (lang: string, loc: string) => {
    onLanguageChange(lang);
    onLocationChange(loc);
  };

  return (
    <section className="surface-panel-strong radar-ring relative overflow-hidden rounded-3xl p-5 sm:p-7 border border-border/70 bg-surface col-span-5 lg:col-span-3">
      <div className="pointer-events-none absolute inset-0 texture-noise" />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-tech text-[11px] uppercase text-muted-foreground">
            Search Deck
          </p>
          <h1 className="font-display text-2xl font-black sm:text-4xl">
            Developer Radar Results
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Tracking {totalMatches.toLocaleString()} matching developers from directory & GitHub.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-accent/60 bg-accent/20 px-3 py-1 text-tech text-[11px] uppercase text-accent">
            Language: {language || "All"}
          </span>
          {location && (
            <span className="rounded-full border border-primary/60 bg-primary/20 px-3 py-1 text-tech text-[11px] uppercase text-primary">
              Location: {location}
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-5">
        <div className="w-full">
          <div className="radar-ring rounded-2xl p-[1px]">
            <form
              onSubmit={handleSubmit}
              className="surface-panel grid w-full grid-cols-1 gap-2 rounded-2xl p-2 md:grid-cols-[1fr_1fr_auto]"
            >
              <label className="group relative block">
                <span className="sr-only">Programming language</span>
                <CodeXml className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent" />
                <input
                  type="text"
                  list="languages-datalist"
                  placeholder="Programming language (e.g. TypeScript)"
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border/70 bg-background/68 pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                />
              </label>

              <label className="group relative block">
                <span className="sr-only">Location</span>
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-primary" />
                <input
                  type="text"
                  placeholder="Location (e.g. Bheramara, Dhaka, SF)"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border/70 bg-background/68 pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110"
              >
                <Radar className="h-4 w-4" />
                Scan
              </button>
            </form>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-tech text-[10px] uppercase text-muted-foreground">
              <Clock3 className="h-3 w-3" />
              Quick Filters
            </span>
            <button
              type="button"
              onClick={() => setPreset("TypeScript", "")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                language.toLowerCase() === "typescript" && !location
                  ? "border-accent bg-accent/20 text-accent font-semibold"
                  : "border-border/70 bg-secondary/50 text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              TypeScript
            </button>
            <button
              type="button"
              onClick={() => setPreset("", "bheramara")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                location.toLowerCase() === "bheramara" && !language
                  ? "border-primary bg-primary/20 text-primary font-semibold"
                  : "border-border/70 bg-secondary/50 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              bheramara
            </button>
            <button
              type="button"
              onClick={() => setPreset("JavaScript", "bheramara")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                language.toLowerCase() === "javascript" &&
                location.toLowerCase() === "bheramara"
                  ? "border-accent bg-accent/20 text-accent font-semibold"
                  : "border-border/70 bg-secondary/50 text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              javascript / bheramara
            </button>
            <button
              type="button"
              onClick={() => setPreset("TypeScript", "kushtia")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                language.toLowerCase() === "typescript" &&
                location.toLowerCase() === "kushtia"
                  ? "border-accent bg-accent/20 text-accent font-semibold"
                  : "border-border/70 bg-secondary/50 text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              TypeScript / kushtia
            </button>
            {(language || location) && (
              <button
                type="button"
                onClick={() => setPreset("", "")}
                className="rounded-full border border-border/70 bg-destructive/20 text-destructive-foreground px-3 py-1 text-xs hover:bg-destructive/30"
              >
                Reset
              </button>
            )}
          </div>

          <datalist id="languages-datalist">
            <option value="TypeScript" />
            <option value="JavaScript" />
            <option value="Python" />
            <option value="Go" />
            <option value="Rust" />
            <option value="Java" />
            <option value="C#" />
            <option value="Ruby" />
            <option value="Swift" />
            <option value="Kotlin" />
            <option value="C++" />
            <option value="C" />
            <option value="PHP" />
          </datalist>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleFavorites}
          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
            showFavorites
              ? "border-primary bg-primary/20 text-primary shadow-sm"
              : "border-border/70 bg-secondary/35 text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${showFavorites ? "fill-primary" : ""}`} />
          {showFavorites ? "Showing favorites" : "Show favorites"}
        </button>

        <label className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/35 px-3 py-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="uppercase tracking-wide">Sort</span>
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "followers" | "repos" | "joined")
            }
            className="bg-transparent text-xs font-semibold text-foreground outline-none cursor-pointer"
          >
            <option value="followers" className="bg-surface text-foreground">
              Followers
            </option>
            <option value="repos" className="bg-surface text-foreground">
              Repos
            </option>
            <option value="joined" className="bg-surface text-foreground">
              Newest Joined
            </option>
          </select>
        </label>

        <button
          type="button"
          onClick={handleCopySearchLink}
          className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/35 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy search link
        </button>
      </div>
    </section>
  );
};

export default SearchForm;
