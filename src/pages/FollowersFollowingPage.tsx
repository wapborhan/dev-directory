import { useState, useMemo } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  UserCheck,
  ArrowLeft,
  Search,
  ExternalLink,
  Heart,
  Radar,
  Sparkles,
} from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import { useFavorites } from "@/hooks/useFavorites";
import {
  fetchDeveloperProfile,
  fetchDeveloperFollowers,
  fetchDeveloperFollowing,
  getDeveloperUsernames,
  formatFollowers,
} from "@/services/github";

interface FollowersFollowingPageProps {
  initialType?: "followers" | "following";
}

export default function FollowersFollowingPage({
  initialType,
}: FollowersFollowingPageProps) {
  const { username: paramUsername } = useParams<{ username?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active view: followers or following
  const determinedType: "followers" | "following" =
    initialType ||
    (location.pathname.endsWith("/following") || location.pathname === "/following"
      ? "following"
      : "followers");

  const [activeType, setActiveType] = useState<"followers" | "following">(
    determinedType
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { isFavorite, toggleFavorite } = useFavorites();

  const defaultUsername = useMemo(() => {
    const list = getDeveloperUsernames();
    return list[0] || "";
  }, []);

  const currentUsername = paramUsername || defaultUsername;

  // Profile data
  const { data: user } = useQuery({
    queryKey: ["developer_profile", currentUsername],
    queryFn: () => fetchDeveloperProfile(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // Followers query
  const { data: followers = [], isLoading: followersLoading } = useQuery({
    queryKey: ["developer_followers", currentUsername],
    queryFn: () => fetchDeveloperFollowers(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // Following query
  const { data: following = [], isLoading: followingLoading } = useQuery({
    queryKey: ["developer_following", currentUsername],
    queryFn: () => fetchDeveloperFollowing(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  const activeList = activeType === "followers" ? followers : following;
  const isLoading = activeType === "followers" ? followersLoading : followingLoading;

  const filteredList = useMemo(() => {
    return activeList.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.login.toLowerCase().includes(q) ||
        (item.name || "").toLowerCase().includes(q)
      );
    });
  }, [activeList, searchQuery]);

  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-background text-foreground">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
          {/* Top Navigation Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/profile/${currentUsername}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to @{currentUsername}'s Profile
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/30 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                Directory
              </Link>
              <Link
                to="/favorites"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/30 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <Heart className="h-3.5 w-3.5 text-primary" />
                Favorites
              </Link>
            </div>
          </div>

          {/* User Banner */}
          <section className="surface-panel-strong radar-ring relative mb-8 overflow-hidden rounded-3xl border border-border/70 bg-surface p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 texture-noise" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Link to={`/profile/${currentUsername}`}>
                  <img
                    src={user?.avatar_url || `https://github.com/${currentUsername}.png`}
                    alt={user?.name || currentUsername}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border border-border/70 object-cover shadow-lg transition hover:scale-105"
                  />
                </Link>

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-2.5 py-0.5 text-tech text-[10px] uppercase text-accent mb-1.5">
                    <Sparkles className="h-3 w-3" />
                    Developer Network Signal
                  </div>
                  <h1 className="font-display text-2xl font-bold sm:text-3xl">
                    {user?.name || currentUsername}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    @{currentUsername} •{" "}
                    <span className="font-semibold text-foreground">
                      {formatFollowers(user?.followers ?? followers.length)}
                    </span>{" "}
                    followers •{" "}
                    <span className="font-semibold text-foreground">
                      {formatFollowers(user?.following ?? following.length)}
                    </span>{" "}
                    following
                  </p>
                </div>
              </div>

              {/* Toggle Tabs on the Page */}
              <div className="inline-flex rounded-2xl border border-border/70 bg-secondary/40 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveType("followers");
                    navigate(`/profile/${currentUsername}/followers`, {
                      replace: true,
                    });
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeType === "followers"
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  Followers ({formatFollowers(user?.followers ?? followers.length)})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveType("following");
                    navigate(`/profile/${currentUsername}/following`, {
                      replace: true,
                    });
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeType === "following"
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  Following ({formatFollowers(user?.following ?? following.length)})
                </button>
              </div>
            </div>
          </section>

          {/* Search bar inside followers/following */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-xl font-bold">
              {activeType === "followers"
                ? `People following @${currentUsername}`
                : `Engineers followed by @${currentUsername}`}{" "}
              ({filteredList.length})
            </h2>

            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${activeType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border/70 bg-secondary/40 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="surface-panel-strong rounded-2xl p-5 border border-border/70 bg-surface animate-pulse h-28"
                />
              ))
            ) : filteredList.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-border/60 bg-surface p-10 text-center text-muted-foreground">
                <Users className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <p className="text-sm font-semibold">
                  {searchQuery
                    ? `No users matched "${searchQuery}"`
                    : `No ${activeType} found for @${currentUsername}`}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-xs font-semibold text-accent hover:underline"
                  >
                    Clear search filter
                  </button>
                )}
              </div>
            ) : (
              filteredList.map((dev) => (
                <div
                  key={dev.id}
                  className="surface-panel-strong group relative flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-surface p-4 transition-all duration-200 hover:border-accent/60 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Link to={`/profile/${dev.login}`}>
                      <img
                        src={dev.avatar_url}
                        alt={dev.login}
                        className="h-12 w-12 rounded-2xl border border-border/70 object-cover shadow-sm transition group-hover:scale-105"
                      />
                    </Link>

                    <div className="min-w-0">
                      <Link
                        to={`/profile/${dev.login}`}
                        className="font-bold text-sm text-foreground hover:text-accent transition truncate block"
                      >
                        @{dev.login}
                      </Link>
                      <a
                        href={dev.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-muted-foreground hover:underline inline-flex items-center gap-1"
                      >
                        GitHub Profile
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(dev.login)}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                        isFavorite(dev.login)
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border/70 bg-secondary/40 text-muted-foreground hover:text-primary"
                      }`}
                      title={
                        isFavorite(dev.login)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite(dev.login) ? "fill-primary" : ""
                        }`}
                      />
                    </button>

                    <Link
                      to={`/profile/${dev.login}`}
                      className="rounded-xl border border-border/70 bg-secondary/50 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
    </>
  );
}

