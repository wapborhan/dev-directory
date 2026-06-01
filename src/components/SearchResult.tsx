function SearchResult() {
  return (
    <section
      className="surface-panel mt-8 rounded-3xl p-10 text-center border border-border/70 bg-surface"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/55">
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
          className="lucide lucide-radar h-7 w-7 text-accent"
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
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold">
        Ready to scan GitHub
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
        Enter at least one filter above, then launch search to populate this
        results deck.
      </p>
      <div className="mt-4 inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-tech text-[11px] uppercase text-muted-foreground">
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
          className="lucide lucide-sparkles h-3.5 w-3.5"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
        Try "TypeScript" + "Dhaka"
      </div>
    </section>
  );
}

export default SearchResult;
