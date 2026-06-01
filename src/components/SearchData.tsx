function SearchData() {
  return (
    <aside
      className="surface-panel-strong radar-ring relative overflow-hidden rounded-3xl p-5 sm:p-6 border border-border/70 bg-surface col-span-2"
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
            className="lucide lucide-badge-check h-4 w-4 text-accent"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        {/* <div className="rounded-2xl border border-border/70 bg-background/50 p-4">
          <p className="text-tech text-[10px] uppercase text-muted-foreground">
            Current objective
          </p>
          <p className="mt-2 font-display text-xl font-bold sm:text-2xl">
            Identify high-signal developers
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Create search campaigns by stack and region, then shortlist with
            richer card metadata.
          </p>
        </div> */}
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
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
              className="lucide lucide-users h-5 w-5 text-primary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
              100M+
            </p>
            <p className="text-xs text-muted-foreground">Developers indexed</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
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
              className="lucide lucide-code-xml h-5 w-5 text-accent"
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
            <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
              50+
            </p>
            <p className="text-xs text-muted-foreground">Languages tracked</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-secondary/35 p-4">
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
              className="lucide lucide-earth h-5 w-5 text-primary"
            >
              <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
              <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
              <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
              <circle cx={12} cy={12} r={10} />
            </svg>
            <p className="mt-3 font-display text-2xl font-black sm:text-3xl">
              195+
            </p>
            <p className="text-xs text-muted-foreground">Regions covered</p>
          </div>
        </div>
        <a
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110"
          href="/search"
        >
          Open Search Deck
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
            className="lucide lucide-arrow-right h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </aside>
  );
}

export default SearchData;
