import {
  Bell,
  BookOpen,
  Boxes,
  Compass,
  FolderGit2,
  Home,
  Search,
  Star,
  Users,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Bell, label: "Notifications" },
  { icon: Compass, label: "Explore" },
  { icon: FolderGit2, label: "Repositories" },
  { icon: Boxes, label: "Packages" },
  { icon: BookOpen, label: "Saved" },
];

const pinnedRepos = [
  {
    name: "nextjs-boilerplate",
    description: "Production-ready Next.js starter kit.",
    language: "TypeScript",
    stars: "1.2k",
    forks: "210",
    color: "bg-info",
  },
  {
    name: "bangla-ui",
    description: "Bangla focused UI component library.",
    language: "TypeScript",
    stars: "856",
    forks: "120",
    color: "bg-info",
  },
  {
    name: "devtools",
    description: "Developer CLI tools and productivity scripts.",
    language: "JavaScript",
    stars: "623",
    forks: "98",
    color: "bg-warning",
  },
  {
    name: "ui-components",
    description: "Reusable components for modern apps.",
    language: "TypeScript",
    stars: "512",
    forks: "73",
    color: "bg-info",
  },
];

const activities = [
  {
    action: "Pushed 3 commits to entrptaher/nextjs-boilerplate",
    meta: "2h ago",
  },
  { action: "Opened pull request in bangla-ui", meta: "3h ago" },
];

const contributionRows = [
  [
    0.1, 0.2, 0.35, 0.25, 0.15, 0.45, 0.6, 0.35, 0.15, 0.55, 0.2, 0.42, 0.18,
    0.3,
  ],
  [
    0.2, 0.05, 0.48, 0.58, 0.35, 0.2, 0.45, 0.32, 0.55, 0.62, 0.2, 0.4, 0.52,
    0.33,
  ],
  [
    0.1, 0.2, 0.3, 0.52, 0.66, 0.45, 0.1, 0.32, 0.46, 0.2, 0.58, 0.35, 0.63,
    0.52,
  ],
  [
    0.22, 0.45, 0.3, 0.12, 0.34, 0.55, 0.43, 0.62, 0.33, 0.2, 0.44, 0.5, 0.62,
    0.3,
  ],
  [
    0.18, 0.25, 0.56, 0.36, 0.47, 0.3, 0.2, 0.42, 0.53, 0.58, 0.32, 0.25, 0.34,
    0.45,
  ],
  [0.4, 0.5, 0.32, 0.2, 0.1, 0.62, 0.4, 0.3, 0.2, 0.55, 0.63, 0.45, 0.35, 0.42],
  [
    0.16, 0.22, 0.33, 0.42, 0.52, 0.2, 0.45, 0.6, 0.36, 0.25, 0.2, 0.54, 0.4,
    0.3,
  ],
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
        <header className="mb-4 flex h-16 items-center justify-between rounded-lg border border-border/70 bg-surface px-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/20 text-brand">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Dev Directory</h1>
              <p className="text-xs text-muted-foreground">
                Code • Build • Ship
              </p>
            </div>
          </div>

          <div className="hidden w-full max-w-xl items-center gap-3 rounded-md border border-border/70 bg-surface-elevated px-3 py-2 text-muted-foreground md:flex">
            <Search className="h-4 w-4" />
            <span className="text-sm">Search or jump to…</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-md border border-border/70 bg-surface-elevated p-2 text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <div className="h-10 w-10 rounded-full border border-border/80 bg-accent/70" />
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[260px_1fr_320px]">
          <aside className="space-y-3 rounded-lg border border-border/70 bg-surface p-3">
            {navItems.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
            <div className="h-56 rounded-md border border-border/70 bg-gradient-to-b from-accent/30 to-surface" />
          </aside>

          <section className="space-y-4">
            <article className="overflow-hidden rounded-lg border border-border/70 bg-surface">
              <div className="h-36 bg-gradient-to-r from-accent via-surface-soft to-primary/20" />
              <div className="relative px-5 pb-5">
                <div className="-mt-16 mb-3 h-28 w-28 rounded-full border-4 border-surface bg-secondary" />
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-semibold">wapborhan</h2>
                  <span className="rounded-full border border-border/70 bg-surface-elevated px-3 py-1 text-xs">
                    PRO
                  </span>
                </div>
                <p className="mb-4 text-muted-foreground">
                  @wapborhan • Dhaka, Bangladesh
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {[
                    "Overview",
                    "Repositories 87",
                    "Projects",
                    "Packages",
                    "Stars",
                    "Followers 1.2k",
                    "Following 210",
                  ].map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-md px-2 py-1 transition-colors ${
                        index === 0
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-surface-soft hover:text-foreground"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-lg border border-border/70 bg-surface p-5">
              <h3 className="mb-4 text-xl font-semibold">
                Pinned repositories
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {pinnedRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="rounded-md border border-border/70 bg-surface-elevated p-4 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-medium">{repo.name}</p>
                      <span className="rounded-full border border-border/70 px-2 py-0.5 text-xs text-muted-foreground">
                        Public
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${repo.color}`}
                        />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" /> {repo.stars}
                      </span>
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-border/70 bg-surface p-5">
              <h3 className="mb-4 text-xl font-semibold">Recent activity</h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity.action}
                    className="flex items-center justify-between rounded-md border border-border/70 bg-surface-elevated p-4"
                  >
                    <p>{activity.action}</p>
                    <span className="text-sm text-muted-foreground">
                      {activity.meta}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <aside className="space-y-4">
            <article className="rounded-lg border border-border/70 bg-surface p-4">
              <h3 className="mb-4 font-semibold">Contribution Graph</h3>
              <div className="space-y-1.5 rounded-md bg-surface-elevated p-3">
                {contributionRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1"
                  >
                    {row.map((value, colIndex) => (
                      <span
                        key={`${rowIndex}-${colIndex}`}
                        className="h-3 w-3 rounded-[3px] bg-brand"
                        style={{ opacity: 0.15 + value }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-border/70 bg-surface p-4">
              <h3 className="mb-3 font-semibold">Summary</h3>
              <div className="space-y-3 text-sm">
                <p className="flex justify-between text-muted-foreground">
                  <span>Public repos</span>
                  <span className="text-foreground">87</span>
                </p>
                <p className="flex justify-between text-muted-foreground">
                  <span>Total stars</span>
                  <span className="text-foreground">3.1k</span>
                </p>
                <p className="flex justify-between text-muted-foreground">
                  <span>Followers</span>
                  <span className="text-foreground">1.2k</span>
                </p>
                <p className="flex justify-between text-muted-foreground">
                  <span>Following</span>
                  <span className="text-foreground">210</span>
                </p>
              </div>
            </article>

            <article className="rounded-lg border border-border/70 bg-surface p-4">
              <h3 className="mb-3 font-semibold">Top languages</h3>
              <div className="mb-3 grid h-2 grid-cols-5 overflow-hidden rounded-full">
                <span className="bg-info" />
                <span className="bg-info/80" />
                <span className="bg-warning" />
                <span className="bg-danger" />
                <span className="bg-muted" />
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-info" />
                    TypeScript
                  </span>
                  <span>68.4%</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-warning" />
                    JavaScript
                  </span>
                  <span>16.7%</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-danger" />
                    CSS
                  </span>
                  <span>6.3%</span>
                </p>
              </div>
            </article>

            <article className="rounded-lg border border-border/70 bg-surface p-4 text-sm text-muted-foreground">
              <p className="mb-3 flex items-center gap-2 text-foreground">
                <Users className="h-4 w-4" /> Collections
              </p>
              <p className="mb-2 flex justify-between">
                <span>Gists</span>
                <span>24</span>
              </p>
              <p className="flex justify-between">
                <span>Snippets</span>
                <span>15</span>
              </p>
            </article>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Index;
