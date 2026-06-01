const SearchForm = () => {
  return (
    <section className="surface-panel-strong radar-ring relative overflow-hidden rounded-3xl p-5 sm:p-7 border border-border/70 bg-surface col-span-3">
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
            Tracking 2,738,443 potential matches from GitHub.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-accent/60 bg-accent/20 px-3 py-1 text-tech text-[11px] uppercase text-accent">
            Language: TypeScript
          </span>
        </div>
      </div>
      <div className="relative mt-5">
        <div className="w-full">
          <div className="radar-ring rounded-2xl p-[1px]">
            <form className="surface-panel grid w-full grid-cols-1 gap-2 rounded-2xl p-2 md:grid-cols-[1fr_1fr_auto]">
              <label className="group relative block">
                <span className="sr-only">Programming language</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-code-xml pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-accent"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
                <input
                  type="text"
                  list=":r1:"
                  placeholder="Programming language"
                  className="h-12 w-full rounded-xl border border-border/70 bg-background/68 pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                  defaultValue="TypeScript"
                />
              </label>
              <label className="group relative block">
                <span className="sr-only">Location</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition group-focus-within:text-primary"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                <input
                  type="text"
                  placeholder="Location"
                  className="h-12 w-full rounded-xl border border-border/70 bg-background/68 pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
                  defaultValue=""
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-radar h-4 w-4"
                >
                  <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
                  <path d="M4 6h.01" />
                  <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
                  <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
                  <path d="M12 18h.01" />
                  <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
                  <circle cx={12} cy={12} r={2} />
                  <path d="m13.41 10.59 5.66-5.66" />
                </svg>
                Search
              </button>
            </form>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-tech text-[10px] uppercase text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock3 h-3 w-3"
              >
                <circle cx={12} cy={12} r={10} />
                <polyline points="12 6 12 12 16.5 12" />
              </svg>
              Recent
            </span>
            <button
              type="button"
              className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
            >
              TypeScript
            </button>
            <button
              type="button"
              className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
            >
              bheramara
            </button>
            <button
              type="button"
              className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
            >
              javascript / bheramara
            </button>
            <button
              type="button"
              className="rounded-full border border-border/70 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
            >
              TypeScript / kushtia
            </button>
          </div>
          <datalist id=":r1:">
            <option value="JavaScript" />
            <option value="TypeScript" />
            <option value="Python" />
            <option value="Go" />
            <option value="Rust" />
            <option value="Java" />
            <option value="C#" />
            <option value="Ruby" />
            <option value="Swift" />
            <option value="Kotlin" />
            <option value="C++" />
            <option value="Elixir" />
          </datalist>
        </div>
      </div>
      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition border-border/70 bg-secondary/35 text-muted-foreground hover:border-primary/50 hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart h-3.5 w-3.5"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          Show favorites
        </button>
        <label className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/35 px-3 py-2 text-xs text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sliders-horizontal h-3.5 w-3.5"
          >
            <line x1={21} x2={14} y1={4} y2={4} />
            <line x1={10} x2={3} y1={4} y2={4} />
            <line x1={21} x2={12} y1={12} y2={12} />
            <line x1={8} x2={3} y1={12} y2={12} />
            <line x1={21} x2={16} y1={20} y2={20} />
            <line x1={12} x2={3} y1={20} y2={20} />
            <line x1={14} x2={14} y1={2} y2={6} />
            <line x1={8} x2={8} y1={10} y2={14} />
            <line x1={16} x2={16} y1={18} y2={22} />
          </svg>
          <span className="uppercase tracking-wide">Sort</span>
          <select className="bg-transparent text-xs font-semibold text-foreground outline-none">
            <option value="followers">Followers</option>
            <option value="repos">Repos</option>
            <option value="joined">Newest Joined</option>
          </select>
        </label>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/35 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-copy h-3.5 w-3.5"
          >
            <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy search link
        </button>
      </div>
    </section>
  );
};

export default SearchForm;
