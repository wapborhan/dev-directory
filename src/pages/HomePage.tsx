import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Radar, Sparkles, Users, FolderGit2, Star, Heart } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import DevCard from "@/components/shared/DevCard";
import { useFavorites } from "@/hooks/useFavorites";
import {
  fetchAllDevelopers,
  getDeveloperUsernames,
  formatFollowers,
} from "@/services/github";

function HomePage() {
  const { favoritesSet, toggleFavorite, favoritesCount } = useFavorites();

  const usernames = useMemo(() => getDeveloperUsernames(), []);

  const {
    data: developers = [],
    isLoading,
  } = useQuery({
    queryKey: ["developers", usernames],
    queryFn: () => fetchAllDevelopers(usernames),
    staleTime: 1000 * 60 * 30,
  });

  // Aggregate metrics
  const totalRepos = useMemo(
    () => developers.reduce((sum, d) => sum + (d.public_repos || 0), 0),
    [developers]
  );

  const totalFollowers = useMemo(
    () => developers.reduce((sum, d) => sum + (d.followers || 0), 0),
    [developers]
  );

  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-background text-foreground">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
          {/* Hero Section */}
          <section className="surface-panel-strong radar-ring relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-border/70 bg-surface mb-10">
            <div className="pointer-events-none absolute inset-0 texture-noise" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-3 py-1 text-tech text-xs uppercase text-accent mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Talent Signal Engine • GitHub REST API
              </div>

              <h1 className="font-display text-3xl font-black tracking-tight sm:text-5xl">
                Discover & Track Top GitHub Developers
              </h1>

              <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed">
                Explore verified developer profiles, live repository stats, language distributions, and contribution signals dynamically fetched via GitHub API.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition hover:brightness-110 shadow-lg shadow-primary/25"
                >
                  <Radar className="h-4 w-4" />
                  Open Search Deck
                </Link>

                <Link
                  to="/favorites"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-secondary/40 px-5 py-3.5 text-sm font-bold text-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  <Heart className={`h-4 w-4 ${favoritesCount > 0 ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  Favorites ({favoritesCount})
                </Link>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-secondary/40 px-4 py-3 text-xs font-semibold text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent pulse-soft" />
                  {developers.length} Developers Indexed
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-6 border-t border-border/60">
              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Developers</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  {developers.length}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <FolderGit2 className="h-4 w-4 text-accent" />
                  <span>Public Repos</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  {formatFollowers(totalRepos)}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Total Followers</span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
                  {formatFollowers(totalFollowers)}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-secondary/30 p-3 sm:p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Radar className="h-4 w-4 text-accent" />
                  <span>Search Deck</span>
                </div>
                <Link
                  to="/search"
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 mt-2"
                >
                  Filter & Sort &rarr;
                </Link>
              </div>
            </div>
          </section>

          {/* Developer Directory Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Developer Directory
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Showing profiles fetched using usernames defined in developerGithubUsername.json
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/favorites"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/40 px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <Heart className={`h-3.5 w-3.5 ${favoritesCount > 0 ? "fill-primary text-primary" : "text-primary"}`} />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <Radar className="h-3.5 w-3.5 text-accent" />
                Advanced Search
              </Link>
            </div>
          </div>

          <section className="grid gap-5 md:grid-cols-2">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="surface-panel-strong rounded-3xl p-6 border border-border/70 bg-surface animate-pulse h-80"
                />
              ))
            ) : (
              developers.map((dev) => (
                <DevCard
                  key={dev.login}
                  user={dev}
                  isFavorite={favoritesSet.has(dev.login.toLowerCase())}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default HomePage;
