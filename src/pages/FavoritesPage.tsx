import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  Radar,
  Users,
  FolderGit2,
  Star,
  Trash2,
  Search,
  Sparkles,
  ArrowRight,
  Code2,
  BookmarkCheck,
} from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import DevCard from "@/components/shared/DevCard";
import { useFavorites } from "@/hooks/useFavorites";
import {
  fetchAllDevelopers,
  formatFollowers,
  getDeveloperUsernames,
} from "@/services/github";

export default function FavoritesPage() {
  const {
    favorites,
    favoritesSet,
    toggleFavorite,
    addFavorite,
    clearFavorites,
    favoritesCount,
  } = useFavorites();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"followers" | "repos" | "name">("followers");

  // Dynamic suggested developers from developerGithubUsername.json not yet favorited
  const suggestedDevelopers = useMemo(() => {
    return getDeveloperUsernames().filter((u) => !favoritesSet.has(u));
  }, [favoritesSet]);

  // Fetch developers in favorites
  const {
    data: developers = [],
    isLoading,
  } = useQuery({
    queryKey: ["favorite_developers", favorites],
    queryFn: () => fetchAllDevelopers(favorites),
    enabled: favorites.length > 0,
    staleTime: 1000 * 60 * 30,
  });

  // Filter & sort
  const filteredDevelopers = useMemo(() => {
    return developers
      .filter((user) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const login = user.login.toLowerCase();
        const name = (user.name || "").toLowerCase();
        const bio = (user.bio || "").toLowerCase();
        const lang = (user.topLanguage || "").toLowerCase();
        const location = (user.location || "").toLowerCase();
        return (
          login.includes(q) ||
          name.includes(q) ||
          bio.includes(q) ||
          lang.includes(q) ||
          location.includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "followers") return b.followers - a.followers;
        if (sortBy === "repos") return b.public_repos - a.public_repos;
        if (sortBy === "name") {
          return (a.name || a.login).localeCompare(b.name || b.login);
        }
        return 0;
      });
  }, [developers, searchQuery, sortBy]);

  // Aggregate metrics
  const totalRepos = useMemo(
    () => developers.reduce((sum, d) => sum + (d.public_repos || 0), 0),
    [developers]
  );

  const totalFollowers = useMemo(
    () => developers.reduce((sum, d) => sum + (d.followers || 0), 0),
    [developers]
  );

  const topLanguages = useMemo(() => {
    const counts: Record<string, number> = {};
    developers.forEach((d) => {
      if (d.topLanguage) {
        counts[d.topLanguage] = (counts[d.topLanguage] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang);
  }, [developers]);

  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-background text-foreground">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
          {/* Header Banner */}
          <section className="surface-panel-strong radar-ring relative mb-10 overflow-hidden rounded-3xl border border-border/70 bg-surface p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-0 texture-noise" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/15 px-3 py-1 text-tech text-xs uppercase text-primary">
                <BookmarkCheck className="h-3.5 w-3.5" />
                Local Storage • Persisted Roster
              </div>

              <h1 className="font-display text-3xl font-black tracking-tight sm:text-5xl">
                Favorite Developers
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Your personally bookmarked engineering talents saved securely in your browser's localStorage. Track their live repositories, community reach, and tech stacks.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-secondary/70 border border-border/70 px-5 py-3 text-xs font-bold uppercase tracking-wide text-foreground transition hover:border-accent hover:text-accent"
                >
                  <Users className="h-4 w-4" />
                  Explore Directory
                </Link>

                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-secondary/40 px-5 py-3 text-xs font-bold uppercase tracking-wide text-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  <Radar className="h-4 w-4" />
                  Search Deck
                </Link>

                {favoritesCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove all developers from your favorites?"
                        )
                      ) {
                        clearFavorites();
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs font-semibold text-destructive hover:bg-destructive/20 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="relative mt-8 grid grid-cols-2 gap-3 border-t border-border/60 pt-6 sm:grid-cols-4">
              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Heart className="h-4 w-4 text-primary fill-primary" />
                  <span>Favorites Saved</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  {favoritesCount}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FolderGit2 className="h-4 w-4 text-accent" />
                  <span>Total Repos</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  {formatFollowers(totalRepos)}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Total Reach</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  {formatFollowers(totalFollowers)}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Code2 className="h-4 w-4 text-accent" />
                  <span>Primary Stacks</span>
                </div>
                <p className="mt-2 font-display text-base font-bold text-foreground truncate">
                  {topLanguages.length > 0 ? topLanguages.slice(0, 2).join(", ") : "Various"}
                </p>
              </div>
            </div>
          </section>

          {/* If No Favorites */}
          {favoritesCount === 0 ? (
            <section className="surface-panel-strong rounded-3xl border border-border/70 bg-surface p-8 text-center sm:p-14">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Heart className="h-10 w-10 fill-primary/30 text-primary" />
              </div>

              <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
                No Favorite Developers Yet
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
                You haven't saved any developers to your local storage yet. Click the heart icon on any developer card to pin them here for instant access!
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 transition"
                >
                  <Users className="h-4 w-4" />
                  Browse Developers Directory
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-secondary/40 px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition"
                >
                  <Radar className="h-4 w-4" />
                  Search & Filter
                </Link>
              </div>

              {/* Suggestions */}
              {suggestedDevelopers.length > 0 && (
                <div className="mt-12 border-t border-border/60 pt-8 text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Quick Add Suggested Developers:
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {suggestedDevelopers.map((username) => (
                      <div
                        key={username}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3 transition hover:border-primary/50"
                      >
                        <div className="min-w-0">
                          <Link
                            to={`/profile/${username}`}
                            className="font-semibold text-sm hover:text-accent transition truncate block"
                          >
                            @{username}
                          </Link>
                          <p className="text-xs text-muted-foreground truncate">
                            GitHub Developer
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => addFavorite(username)}
                          className="inline-flex items-center gap-1 rounded-xl border border-primary/50 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition shrink-0"
                        >
                          <Heart className="h-3.5 w-3.5" />
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Controls: Search within favorites & sort */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">
                    Saved Roster ({filteredDevelopers.length})
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Persisted in localStorage key <code className="text-xs font-mono text-accent">dev_directory_favorites</code>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Filter favorites..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-full border border-border/70 bg-secondary/40 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "followers" | "repos" | "name")}
                    className="rounded-full border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-accent"
                  >
                    <option value="followers">Sort by Followers</option>
                    <option value="repos">Sort by Repos</option>
                    <option value="name">Sort by Name</option>
                  </select>
                </div>
              </div>

              {/* Developer Grid */}
              <section className="grid gap-5 md:grid-cols-2">
                {isLoading ? (
                  Array.from({ length: Math.min(favoritesCount, 4) }).map((_, idx) => (
                    <div
                      key={idx}
                      className="surface-panel-strong rounded-3xl p-6 border border-border/70 bg-surface animate-pulse h-80"
                    />
                  ))
                ) : filteredDevelopers.length === 0 ? (
                  <div className="col-span-full rounded-2xl border border-border/60 bg-surface p-8 text-center text-muted-foreground">
                    <p className="text-sm">
                      No favorite developer matched "{searchQuery}".
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="mt-3 text-xs font-semibold text-accent hover:underline"
                    >
                      Clear search filter
                    </button>
                  </div>
                ) : (
                  filteredDevelopers.map((dev) => (
                    <DevCard
                      key={dev.login}
                      user={dev}
                      isFavorite={favoritesSet.has(dev.login.toLowerCase())}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}

