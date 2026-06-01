const HomeHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/78 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 atmosphere-grid opacity-15" />
      <div className="pointer-events-none absolute inset-0 texture-noise" />
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a className="group flex items-center gap-3" href="/">
          <div className="radar-ring relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-secondary/55">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-accent/30 to-transparent scanline" />
            <div style={{ transform: "scale(1.01908) rotate(7.98883deg)" }}>
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
                className="lucide lucide-compass h-5 w-5 text-accent transition-transform duration-300 group-hover:rotate-45"
              >
                <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
                <circle cx={12} cy={12} r={10} />
              </svg>
            </div>
          </div>
          <div>
            <p className="font-display text-[1.9rem] font-extrabold leading-none tracking-tight">
              Dev Directory
            </p>
            <p className="text-tech flex items-center gap-1 text-[10px] uppercase text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent pulse-soft" />
              Talent Signal Engine
            </p>
          </div>
        </a>
        <nav className="flex items-center gap-2" aria-label="Primary">
          <a
            className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-all bg-primary text-primary-foreground glow-amber"
            aria-current="page"
            href="/"
          >
            Home
          </a>
          <a
            className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-all text-muted-foreground hover:bg-secondary/75 hover:text-foreground"
            href="/search"
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
              className="lucide lucide-radar mr-1.5 h-4 w-4"
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
          </a>
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-1.5 rounded-full border border-border/70 bg-card/55 px-3 text-xs font-semibold text-muted-foreground transition hover:border-accent/60 hover:text-foreground sm:inline-flex"
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
              className="lucide lucide-github h-3.5 w-3.5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            API
          </a>
          <button
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/55 text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
            title="Switch to light mode"
            aria-label="Switch to light mode"
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
              className="lucide lucide-sun h-4 w-4"
            >
              <circle cx={12} cy={12} r={4} />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
