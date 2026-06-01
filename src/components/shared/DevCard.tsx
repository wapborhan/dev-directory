import { Link } from "react-router-dom";

export default function DevCard() {
  return (
    <article
      className="surface-panel-strong radar-ring group relative overflow-hidden rounded-3xl p-5 sm:p-6 border border-border/70 bg-surface"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/18 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-44 w-44 rounded-full bg-accent/14 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 texture-noise" />
      <div className="relative space-y-4">
        <div className="flex items-start gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/126733545?v=4"
            alt="langchain-ai"
            loading="lazy"
            className="h-36 w-36 rounded-[1.6rem] border border-border/70 object-cover shadow-xl shadow-background/60 sm:h-40 sm:w-40"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/profile" className="inline-flex">
                <h3 className="truncate font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Borhan Uddin
                </h3>
              </Link>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition border-border/70 bg-secondary/45 text-muted-foreground hover:border-primary/50 hover:text-primary"
                aria-label="Add langchain-ai to favorites"
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
                  className="lucide lucide-heart h-4 w-4"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
            </div>
            <p className="text-tech mt-1 truncate text-xs uppercase tracking-wide text-muted-foreground">
              @wapborhan
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/60 bg-primary/20 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary">
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
                  className="lucide lucide-sparkles h-3 w-3"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
                Popular
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Signal Elite
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/40 px-2 py-1">
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
                  className="lucide lucide-map-pin h-3 w-3"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                Bheramara
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border/70 bg-background/45 p-3 sm:grid-cols-4">
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Repos
            </p>
            <p className="font-display text-2xl font-bold">239</p>
          </div>
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Gists
            </p>
            <p className="font-display text-2xl font-bold">0</p>
          </div>
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Followers
            </p>
            <p className="font-display text-2xl font-bold">19.5K</p>
          </div>
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Following
            </p>
            <p className="font-display text-2xl font-bold">0</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-2.5 py-2">
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
              className="lucide lucide-calendar-days h-3.5 w-3.5"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width={18} height={18} x={3} y={4} rx={2} />
              <path d="M3 10h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
            Joined Mar 2023
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-2.5 py-2">
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
              className="lucide lucide-users h-3.5 w-3.5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Age 3y
          </div>
          <div className="inline-flex min-w-0 items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-2.5 py-2">
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
              className="lucide lucide-mail h-3.5 w-3.5"
            >
              <rect width={20} height={16} x={2} y={4} rx={2} />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="min-w-0 truncate" title="borhaninfos@gmail.com">
              borhaninfos@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://github.com/wapborhan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-accent/70 hover:text-accent"
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
              className="lucide lucide-github h-4 w-4"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Profile
          </a>
          <a
            href="https://www.wapborhan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/70 hover:text-primary"
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
              className="lucide lucide-earth h-4 w-4"
            >
              <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
              <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
              <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
              <circle cx={12} cy={12} r={10} />
            </svg>
            Website
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
              className="lucide lucide-external-link h-3.5 w-3.5"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-accent/70 hover:text-accent"
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
              className="lucide lucide-copy h-4 w-4"
            >
              <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy
          </button>
          <a
            href="mailto:borhaninfos@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/70 hover:text-primary"
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
              className="lucide lucide-send h-4 w-4"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
            Mailto
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-accent/70 hover:text-accent"
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
              className="lucide lucide-copy h-4 w-4"
            >
              <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copy email
          </button>
        </div>
      </div>
    </article>
  );
}
