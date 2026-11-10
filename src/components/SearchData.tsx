import { BadgeCheck, Users, CodeXml, Earth, ArrowRight } from "lucide-react";

interface SearchDataProps {
  totalDevelopers?: number;
  totalLanguages?: number;
  totalLocations?: number;
}

function SearchData({
  totalDevelopers = 8,
  totalLanguages = 12,
  totalLocations = 15,
}: SearchDataProps) {
  const scrollToSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const searchDeck = document.querySelector("input[placeholder*='language']");
    if (searchDeck) {
      (searchDeck as HTMLInputElement).focus();
      searchDeck.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <aside
      className="surface-panel-strong radar-ring relative overflow-hidden rounded-3xl p-5 sm:p-6 border border-border/70 bg-surface col-span-5 lg:col-span-2"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="pointer-events-none absolute inset-0 texture-noise" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-accent/18 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-primary/26 to-transparent scanline" />

      <div className="relative space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-tech text-[11px] uppercase text-muted-foreground">
            Command Overview
          </p>
          <BadgeCheck className="h-4 w-4 text-accent" />
        </div>

        <div className="grid gap-3 grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
            <Users className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
              {totalDevelopers}
            </p>
            <p className="text-xs text-muted-foreground">Devs in Deck</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
            <CodeXml className="h-5 w-5 text-accent" />
            <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
              {totalLanguages}+
            </p>
            <p className="text-xs text-muted-foreground">Languages</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
            <Earth className="h-5 w-5 text-primary" />
            <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
              {totalLocations}+
            </p>
            <p className="text-xs text-muted-foreground">Regions</p>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToSearch}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110"
        >
          Explore Developers
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

export default SearchData;
