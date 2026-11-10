import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FolderGit2,
  Search,
  Star,
  Users,
  GitFork,
  ArrowLeft,
  ExternalLink,
  MapPin,
  Building,
  Globe,
  Heart,
  FileCode2,
  Activity,
  UserCheck,
  Sparkles,
  Layers,
  FolderKanban,
  Award,
  Building2,
  Calendar,
  Code2,
  Compass,
  FileText,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { PaginationControl } from "@/components/PaginationControl";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  fetchDeveloperProfile,
  fetchDeveloperRepos,
  fetchDeveloperEvents,
  fetchDeveloperGists,
  fetchDeveloperStarred,
  fetchDeveloperProjects,
  fetchDeveloperOrgs,
  fetchDeveloperReadme,
  fetchYearContributions,
  computeDeveloperAchievements,
  getDeveloperUsernames,
  formatFollowers,
  formatRelativeTime,
  formatJoinDate,
  formatAccountAge,
  getLanguageColor,
  GitHubRepo,
} from "@/services/github";

type ProfileTab =
  | "overview"
  | "repositories"
  | "projects"
  | "gists"
  | "stars"
  | "achievements"
  | "organizations";

const Index = () => {
  const { username: paramUsername } = useParams<{ username?: string }>();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  // Active tab state
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  // Selected year for the 1-year contribution graph
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Repository tab filters
  const [repoSearch, setRepoSearch] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("all");
  const [repoType, setRepoType] = useState<"all" | "own" | "forks">("all");
  const [repoSort, setRepoSort] = useState<
    "stars" | "forks" | "updated" | "name"
  >("stars");

  // Default to the first developer in developerGithubUsername.json
  const defaultUsername = useMemo(() => {
    const list = getDeveloperUsernames();
    return list[0] || "";
  }, []);

  const currentUsername = paramUsername || defaultUsername;

  // 1. Fetch GitHub User Profile
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["developer_profile", currentUsername],
    queryFn: () => fetchDeveloperProfile(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // Calculate available years from join date to current year
  const availableYears = useMemo(() => {
    const joinYear = user?.created_at
      ? new Date(user.created_at).getFullYear()
      : currentYear - 3;
    const startYear = Math.min(joinYear, currentYear);
    const years: number[] = [];
    for (let y = currentYear; y >= Math.max(startYear, currentYear - 6); y--) {
      years.push(y);
    }
    return years;
  }, [user, currentYear]);

  // 2. Fetch Developer Repos
  const { data: repos = [], isLoading: reposLoading } = useQuery({
    queryKey: ["developer_repos", currentUsername],
    queryFn: () => fetchDeveloperRepos(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 3. Fetch Developer Events (for Recent Activity)
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["developer_events", currentUsername],
    queryFn: () => fetchDeveloperEvents(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 4. Fetch 1-Year Contribution Graph for selectedYear (Month-wise)
  const { data: yearContributionData, isLoading: yearLoading } = useQuery({
    queryKey: ["year_contributions", currentUsername, selectedYear],
    queryFn: () => fetchYearContributions(currentUsername, selectedYear),
    staleTime: 1000 * 60 * 15,
  });

  // 5. Fetch Projects (Real Live API data)
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["developer_projects", currentUsername],
    queryFn: () => fetchDeveloperProjects(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 6. Fetch Gists
  const { data: gists = [], isLoading: gistsLoading } = useQuery({
    queryKey: ["developer_gists", currentUsername],
    queryFn: () => fetchDeveloperGists(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 7. Fetch Starred Repos
  const { data: starred = [], isLoading: starredLoading } = useQuery({
    queryKey: ["developer_starred", currentUsername],
    queryFn: () => fetchDeveloperStarred(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 8. Fetch Organizations
  const { data: orgs = [], isLoading: orgsLoading } = useQuery({
    queryKey: ["developer_orgs", currentUsername],
    queryFn: () => fetchDeveloperOrgs(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 9. Fetch Developer Profile README.md (/repos/:user/:user/contents/README.md)
  const { data: readmeContent, isLoading: readmeLoading } = useQuery({
    queryKey: ["developer_readme", currentUsername],
    queryFn: () => fetchDeveloperReadme(currentUsername),
    staleTime: 1000 * 60 * 30,
  });

  // 10. Compute Achievements
  const achievements = useMemo(() => {
    return computeDeveloperAchievements(user, repos, events);
  }, [user, repos, events]);

  // Calculate languages from repos
  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;

    repos.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
        total += 1;
      }
    });

    if (total === 0) {
      return [
        { name: "TypeScript", percentage: 65, color: "bg-info" },
        { name: "JavaScript", percentage: 25, color: "bg-warning" },
        { name: "HTML/CSS", percentage: 10, color: "bg-danger" },
      ];
    }

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4);
  }, [repos]);

  // Unique languages in repos for filtering
  const availableRepoLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs);
  }, [repos]);

  // Only the developer's OWN repositories (non-forks, authored by the developer)
  const ownRepos = useMemo(() => {
    return repos.filter((r) => {
      if (r.fork) return false;
      if (r.full_name) {
        return r.full_name
          .toLowerCase()
          .startsWith(`${currentUsername.toLowerCase()}/`);
      }
      return true;
    });
  }, [repos, currentUsername]);

  // Featured repositories: strictly the developer's OWN repositories (sorted by stars/popularity)
  const featuredOwnRepos = useMemo(() => {
    const list = ownRepos.length > 0 ? ownRepos : repos.filter((r) => !r.fork);
    return [...list]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6);
  }, [ownRepos, repos]);

  // Filtered and sorted repositories for Repositories tab
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        if (repoLanguage !== "all" && repo.language !== repoLanguage) {
          return false;
        }
        if (
          repoType === "own" &&
          (repo.fork ||
            (repo.full_name &&
              !repo.full_name
                .toLowerCase()
                .startsWith(`${currentUsername.toLowerCase()}/`)))
        ) {
          return false;
        }
        if (repoType === "forks" && !repo.fork) {
          return false;
        }
        if (repoSearch.trim()) {
          const q = repoSearch.toLowerCase().trim();
          const name = repo.name.toLowerCase();
          const desc = (repo.description || "").toLowerCase();
          return name.includes(q) || desc.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (repoSort === "stars")
          return b.stargazers_count - a.stargazers_count;
        if (repoSort === "forks") return b.forks_count - a.forks_count;
        if (repoSort === "name") return a.name.localeCompare(b.name);
        if (repoSort === "updated") {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
        return 0;
      });
  }, [repos, repoSearch, repoLanguage, repoType, repoSort, currentUsername]);

  // Pagination constants & states (15 items per page)
  const PAGE_SIZE = 15;
  const [repoPage, setRepoPage] = useState(1);
  const [starredPage, setStarredPage] = useState(1);
  const [starredSearch, setStarredSearch] = useState("");
  const [starredLanguage, setStarredLanguage] = useState("all");
  const [starredSort, setStarredSort] = useState<
    "stars" | "forks" | "updated" | "name"
  >("stars");

  // Reset pagination when repo filters or username changes
  useEffect(() => {
    setRepoPage(1);
  }, [repoSearch, repoLanguage, repoType, repoSort, currentUsername]);

  // Reset pagination when starred filters or username changes
  useEffect(() => {
    setStarredPage(1);
  }, [starredSearch, starredLanguage, starredSort, currentUsername]);

  // Unique languages in starred repos
  const availableStarredLanguages = useMemo(() => {
    const langs = new Set<string>();
    starred.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs);
  }, [starred]);

  // Filtered and sorted starred repos
  const filteredStarred = useMemo(() => {
    return starred
      .filter((repo) => {
        if (starredLanguage !== "all" && repo.language !== starredLanguage) {
          return false;
        }
        if (starredSearch.trim()) {
          const q = starredSearch.toLowerCase().trim();
          const name = (repo.name || "").toLowerCase();
          const fullName = (repo.full_name || "").toLowerCase();
          const desc = (repo.description || "").toLowerCase();
          return name.includes(q) || fullName.includes(q) || desc.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (starredSort === "stars")
          return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        if (starredSort === "forks")
          return (b.forks_count || 0) - (a.forks_count || 0);
        if (starredSort === "name")
          return (a.name || "").localeCompare(b.name || "");
        if (starredSort === "updated") {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
        return 0;
      });
  }, [starred, starredSearch, starredLanguage, starredSort]);

  // Paginated Repos (15 items per page)
  const paginatedRepos = useMemo(() => {
    const start = (repoPage - 1) * PAGE_SIZE;
    return filteredRepos.slice(start, start + PAGE_SIZE);
  }, [filteredRepos, repoPage]);

  // Paginated Starred (15 items per page)
  const paginatedStarred = useMemo(() => {
    const start = (starredPage - 1) * PAGE_SIZE;
    return filteredStarred.slice(start, start + PAGE_SIZE);
  }, [filteredStarred, starredPage]);

  // Calculate total stars
  const totalStars = useMemo(() => {
    return repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  }, [repos]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/profile/${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  };

  const websiteUrl =
    user?.blog && user.blog.trim()
      ? user.blog.startsWith("http")
        ? user.blog
        : `https://${user.blog}`
      : null;

  console.log(starred);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
        {/* Top Header */}
        <header className="mb-4 flex h-16 items-center justify-between rounded-lg border border-border/70 bg-surface px-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="grid h-10 w-10 place-items-center rounded-full bg-brand/20 text-brand transition hover:scale-105"
              title="Back to Dev Directory"
            >
              <FolderGit2 className="h-5 w-5" />
            </Link>
            <div>
              <Link
                to="/"
                className="text-lg font-semibold hover:text-accent transition"
              >
                Dev Directory
              </Link>
              <p className="text-xs text-muted-foreground">
                Code • Build • Ship
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden w-full max-w-xl items-center gap-3 rounded-md border border-border/70 bg-surface-elevated px-3 py-1.5 text-muted-foreground md:flex focus-within:border-accent"
          >
            <Search className="h-4 w-4 shrink-0" />
            <input
              type="text"
              placeholder="Search or jump to username (press Enter)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </form>

          <div className="flex items-center gap-2.5">
            <Link
              to="/favorites"
              className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <Heart className="h-3.5 w-3.5 text-primary" />
              Favorites
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <Compass className="h-3.5 w-3.5 text-accent" />
              Search Deck
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Directory
            </Link>
            <div className="h-9 w-9 overflow-hidden rounded-full border border-border/80 bg-accent/70 ml-1">
              {user && (
                <img
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </header>

        {/* 2-Column Layout (Left menu removed as requested) */}
        <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
          {/* Main Profile & Tab Content Column */}
          <section className="space-y-4">
            {/* User Profile Card */}
            <article className="overflow-hidden rounded-2xl border border-border/70 bg-surface">
              <div className="h-36 bg-gradient-to-r from-accent via-surface-soft to-primary/20" />
              <div className="relative px-6 pb-6">
                <div className="-mt-16 mb-3 h-28 w-28 overflow-hidden rounded-2xl border-4 border-surface bg-secondary shadow-xl">
                  {userLoading ? (
                    <div className="h-full w-full bg-secondary/80 animate-pulse" />
                  ) : (
                    <img
                      src={user?.avatar_url}
                      alt={user?.name || user?.login}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl font-bold sm:text-3xl text-foreground">
                      {user?.name || user?.login || currentUsername}
                    </h1>
                    <span className="rounded-full border border-border/70 bg-surface-elevated px-2.5 py-0.5 text-xs font-semibold text-accent">
                      PRO
                    </span>
                    <span className="text-sm text-muted-foreground font-mono">
                      @{user?.login || currentUsername}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite(user?.login || currentUsername)
                      }
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        isFavorite(user?.login || currentUsername)
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border/70 bg-secondary/40 text-muted-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          isFavorite(user?.login || currentUsername)
                            ? "fill-primary text-primary"
                            : ""
                        }`}
                      />
                      <span>
                        {isFavorite(user?.login || currentUsername)
                          ? "Favorited"
                          : "Favorite"}
                      </span>
                    </button>

                    <a
                      href={
                        user?.html_url ||
                        `https://github.com/${currentUsername}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/40 px-3.5 py-1.5 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
                    >
                      GitHub Profile
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Followers and Following links (Navigates to dedicated page) */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <Link
                    to={`/profile/${currentUsername}/followers`}
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition font-medium"
                  >
                    <Users className="h-3.5 w-3.5 text-accent" />
                    <strong className="text-foreground">
                      {formatFollowers(user?.followers ?? 0)}
                    </strong>{" "}
                    followers
                  </Link>
                  <span>•</span>
                  <Link
                    to={`/profile/${currentUsername}/following`}
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition font-medium"
                  >
                    <UserCheck className="h-3.5 w-3.5 text-accent" />
                    <strong className="text-foreground">
                      {formatFollowers(user?.following ?? 0)}
                    </strong>{" "}
                    following
                  </Link>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    <strong>{formatFollowers(totalStars)}</strong> stars
                  </span>
                </div>

                {/* Location, Company, Blog */}
                <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  {user?.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {user.location}
                    </span>
                  )}
                  {user?.company && (
                    <span className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" />
                      {user.company}
                    </span>
                  )}
                  {websiteUrl && (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      {user?.blog}
                    </a>
                  )}
                </div>

                {user?.bio && (
                  <p className="mt-3 max-w-3xl text-sm text-foreground/90 leading-relaxed">
                    {user.bio}
                  </p>
                )}

                {/* Tabs: Overview, Repositories, Projects, Gists, Stars, Achievements, Organizations */}
                <div
                  id="profile-tabs-content"
                  className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-4 text-xs font-semibold"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "overview"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    Overview
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("repositories")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "repositories"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <FolderGit2 className="h-3.5 w-3.5" />
                    <span>Repositories</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        activeTab === "repositories"
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {user?.public_repos ?? repos.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "projects"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <FolderKanban className="h-3.5 w-3.5" />
                    <span>Projects</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        activeTab === "projects"
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {projects.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("gists")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "gists"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <FileCode2 className="h-3.5 w-3.5" />
                    <span>Gists</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        activeTab === "gists"
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {user?.public_gists ?? gists.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("stars")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "stars"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <Star className="h-3.5 w-3.5" />
                    <span>Stars</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        activeTab === "stars"
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {starred.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("achievements")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "achievements"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>Achievements</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        activeTab === "achievements"
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {achievements.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("organizations")}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition ${
                      activeTab === "organizations"
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25"
                        : "bg-secondary/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Organizations</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        activeTab === "organizations"
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {orgs.length}
                    </span>
                  </button>
                </div>
              </div>
            </article>

            {/* TAB CONTENT: 1. OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* PROFILE README.md CARD (fetched from /repos/:user/:user/contents/README.md) */}
                {(readmeLoading || readmeContent) && (
                  <article className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-6 transition">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-accent" />
                        <span className="text-xs font-semibold text-foreground">
                          {currentUsername} / README.md
                        </span>
                        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent uppercase">
                          Profile README
                        </span>
                      </div>
                      <a
                        href={`https://github.com/${currentUsername}/${currentUsername}/blob/main/README.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-accent transition"
                        title="View repository on GitHub"
                      >
                        <span>View on GitHub</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {readmeLoading ? (
                      <div className="space-y-3 py-3">
                        <div className="h-6 w-1/2 rounded-lg bg-surface-elevated animate-pulse" />
                        <div className="h-4 w-full rounded bg-surface-elevated animate-pulse" />
                        <div className="h-4 w-5/6 rounded bg-surface-elevated animate-pulse" />
                        <div className="h-24 w-full rounded-xl bg-surface-elevated animate-pulse" />
                      </div>
                    ) : readmeContent ? (
                      <div className="overflow-x-auto py-1">
                        <MarkdownRenderer content={readmeContent} />
                      </div>
                    ) : null}
                  </article>
                )}

                {/* 1-YEAR GITHUB CONTRIBUTION GRAPH WITH YEAR SELECTOR */}
                <article className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-6">
                  {/* Top Bar: Title & Year Selection Buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-foreground sm:text-lg">
                        {yearContributionData?.totalContributions?.toLocaleString() ??
                          0}{" "}
                        contributions in {selectedYear}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        GitHub contribution activity stream across 12 months
                      </p>
                    </div>

                    {/* Year Selector Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {availableYears.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setSelectedYear(yr)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                            selectedYear === yr
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "bg-secondary/40 text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 1-Year 52-Week Grid */}
                  {yearLoading ? (
                    <div className="h-36 w-full rounded-xl bg-surface-elevated animate-pulse" />
                  ) : (
                    <div className="rounded-xl border border-border/60 bg-surface-elevated p-4 overflow-x-auto">
                      <div className="min-w-[720px]">
                        {/* Month Labels along top */}
                        <div className="flex text-[10px] font-mono text-muted-foreground mb-1.5 pl-6">
                          {yearContributionData?.months.map((m, idx) => (
                            <span
                              key={`${m.name}-${idx}`}
                              style={{ width: `${100 / 12}%` }}
                              className="truncate text-left"
                            >
                              {m.name}
                            </span>
                          ))}
                        </div>

                        {/* Graph: 7 rows x ~52 columns */}
                        <div className="flex items-start gap-1">
                          {/* Day-of-week labels */}
                          <div className="flex flex-col justify-between text-[9px] font-mono text-muted-foreground h-[92px] pr-2 select-none">
                            <span className="h-3 leading-3">Mon</span>
                            <span className="h-3 leading-3">Wed</span>
                            <span className="h-3 leading-3">Fri</span>
                          </div>

                          {/* 52 Week Columns */}
                          <div className="flex gap-1 flex-1">
                            {yearContributionData?.weeks.map((week, wIdx) => (
                              <div key={wIdx} className="flex flex-col gap-1">
                                {week.map((day, dIdx) => {
                                  if (!day) {
                                    return (
                                      <div
                                        key={`empty-${dIdx}`}
                                        className="h-2.5 w-2.5 rounded-[2px] bg-transparent"
                                      />
                                    );
                                  }

                                  let bgClass =
                                    "bg-secondary/40 border border-border/25";
                                  if (day.level === 1)
                                    bgClass =
                                      "bg-[#0e4429] border border-[#006d32]/40";
                                  else if (day.level === 2)
                                    bgClass =
                                      "bg-[#006d32] border border-[#26a641]/40";
                                  else if (day.level === 3)
                                    bgClass =
                                      "bg-[#26a641] border border-[#39d353]/40";
                                  else if (day.level === 4)
                                    bgClass =
                                      "bg-[#39d353] border border-[#39d353]";

                                  return (
                                    <div
                                      key={day.date}
                                      title={`${day.count} contribution${
                                        day.count === 1 ? "" : "s"
                                      } on ${day.date}`}
                                      className={`h-2.5 w-2.5 rounded-[2px] cursor-pointer transition-transform hover:scale-125 ${bgClass}`}
                                    />
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* GitHub Footer Legend */}
                        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-muted-foreground">
                          <span>Contribution data for year {selectedYear}</span>
                          <div className="flex items-center gap-1.5">
                            <span>Less</span>
                            <span className="h-2.5 w-2.5 rounded-[2px] bg-secondary/40 border border-border/25" />
                            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#0e4429]" />
                            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#006d32]" />
                            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#26a641]" />
                            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#39d353]" />
                            <span>More</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>

                {/* Featured Repositories (Own Repositories) */}
                <article className="rounded-2xl border border-border/70 bg-surface p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">
                          Featured Repositories
                        </h3>
                        <span className="rounded-full border border-primary/50 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                          Own Repos
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Original repositories authored and owned by @
                        {currentUsername}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("repositories")}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      View all ({ownRepos.length}) &rarr;
                    </button>
                  </div>

                  {reposLoading ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-28 rounded-xl border border-border/70 bg-surface-elevated animate-pulse"
                        />
                      ))}
                    </div>
                  ) : featuredOwnRepos.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">
                      No original own repositories found for @{currentUsername}.
                    </p>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                      {featuredOwnRepos.map((repo: GitHubRepo) => (
                        <div
                          key={repo.id}
                          className="rounded-xl border border-border/70 bg-surface-elevated p-4 transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-foreground hover:text-accent truncate transition"
                            >
                              {repo.name}
                            </a>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                Owner
                              </span>
                              <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] text-muted-foreground uppercase">
                                Public
                              </span>
                            </div>
                          </div>
                          <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                            {repo.description || "No description provided."}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {repo.language && (
                              <span className="flex items-center gap-1.5">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                                    repo.language,
                                  )}`}
                                />
                                {repo.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-primary" />
                              {formatFollowers(repo.stargazers_count)}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="h-3.5 w-3.5" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            )}

            {/* TAB CONTENT: 2. REPOSITORIES */}
            {activeTab === "repositories" && (
              <article className="rounded-2xl border border-border/70 bg-surface p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Repositories ({filteredRepos.length})
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Public repositories available on GitHub
                    </p>
                  </div>

                  {/* Filter & Sort Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative min-w-[180px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search repos..."
                        value={repoSearch}
                        onChange={(e) => setRepoSearch(e.target.value)}
                        className="w-full rounded-lg border border-border/70 bg-surface-elevated py-1.5 pl-8 pr-3 text-xs outline-none focus:border-accent"
                      />
                    </div>

                    <select
                      value={repoType}
                      onChange={(e) =>
                        setRepoType(e.target.value as "all" | "own" | "forks")
                      }
                      className="rounded-lg border border-border/70 bg-surface-elevated px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    >
                      <option value="all">Type: All</option>
                      <option value="own">Type: Sources (Own)</option>
                      <option value="forks">Type: Forks</option>
                    </select>

                    <select
                      value={repoLanguage}
                      onChange={(e) => setRepoLanguage(e.target.value)}
                      className="rounded-lg border border-border/70 bg-surface-elevated px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    >
                      <option value="all">All Languages</option>
                      {availableRepoLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>

                    <select
                      value={repoSort}
                      onChange={(e) =>
                        setRepoSort(
                          e.target.value as
                            | "stars"
                            | "forks"
                            | "updated"
                            | "name",
                        )
                      }
                      className="rounded-lg border border-border/70 bg-surface-elevated px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    >
                      <option value="stars">Most Stars</option>
                      <option value="forks">Most Forks</option>
                      <option value="updated">Recently Updated</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>

                {reposLoading ? (
                  <div className="grid gap-3 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-32 rounded-xl border border-border/70 bg-surface-elevated animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredRepos.length === 0 ? (
                  <div className="rounded-xl border border-border/60 bg-surface-elevated p-8 text-center text-muted-foreground">
                    <p className="text-sm">
                      No repositories found matching your search.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRepoSearch("");
                        setRepoLanguage("all");
                      }}
                      className="mt-2 text-xs font-semibold text-accent hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-3 md:grid-cols-3">
                      {paginatedRepos.map((repo: GitHubRepo) => (
                        <div
                          key={repo.id}
                          className="rounded-xl border border-border/70 bg-surface-elevated p-4 transition duration-200 hover:border-accent/60"
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-foreground hover:text-accent truncate transition"
                            >
                              {repo.name}
                            </a>
                            <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] text-muted-foreground shrink-0 uppercase">
                              Public
                            </span>
                          </div>

                          <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                            {repo.description || "No description provided."}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
                            <div className="flex items-center gap-3">
                              {repo.language && (
                                <span className="flex items-center gap-1.5">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                                      repo.language,
                                    )}`}
                                  />
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-primary" />
                                {formatFollowers(repo.stargazers_count)}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="h-3 w-3" />
                                {repo.forks_count}
                              </span>
                            </div>

                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
                            >
                              View
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <PaginationControl
                      currentPage={repoPage}
                      totalItems={filteredRepos.length}
                      pageSize={PAGE_SIZE}
                      onPageChange={(p) => {
                        setRepoPage(p);
                        const el = document.getElementById(
                          "profile-tabs-content",
                        );
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      itemName="repositories"
                    />
                  </>
                )}
              </article>
            )}

            {/* TAB CONTENT: 3. PROJECTS (Live API Data) */}
            {activeTab === "projects" && (
              <article className="rounded-2xl border border-border/70 bg-surface p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Projects ({projects.length})
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      GitHub Classic Projects and Project Boards (Live API)
                    </p>
                  </div>
                </div>

                {projectsLoading ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-32 rounded-xl border border-border/70 bg-surface-elevated animate-pulse"
                      />
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="rounded-2xl border border-border/60 bg-surface-elevated p-10 text-center text-muted-foreground">
                    <FolderKanban className="mx-auto h-10 w-10 text-muted-foreground/60 mb-3" />
                    <h4 className="text-base font-bold text-foreground">
                      No Public Projects Found
                    </h4>
                    <p className="mx-auto mt-1.5 max-w-md text-xs sm:text-sm text-muted-foreground">
                      @{currentUsername} does not have any public GitHub Classic
                      Projects or public Project Boards created.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("repositories")}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110 transition"
                    >
                      <FolderGit2 className="h-3.5 w-3.5" />
                      Browse Repositories Instead
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-xl border border-border/70 bg-surface-elevated p-4 flex flex-col justify-between transition hover:border-accent/60"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="font-bold text-sm text-foreground truncate">
                              {proj.name}
                            </h4>
                            <span className="rounded-full border border-accent/50 bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                              {proj.status}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                            {proj.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
                          <span className="text-[11px]">
                            Updated {formatRelativeTime(proj.updatedAt)}
                          </span>

                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
                          >
                            Open Project
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            )}

            {/* TAB CONTENT: 4. GISTS */}
            {activeTab === "gists" && (
              <article className="rounded-2xl border border-border/70 bg-surface p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Public Gists ({gists.length})
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Code snippets, gists, and developer notes
                    </p>
                  </div>
                  <a
                    href={`https://gist.github.com/${currentUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition"
                  >
                    All on Gist
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {gistsLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-24 rounded-xl border border-border/70 bg-surface-elevated animate-pulse"
                      />
                    ))}
                  </div>
                ) : gists.length === 0 ? (
                  <div className="rounded-2xl border border-border/60 bg-surface-elevated p-8 text-center text-muted-foreground">
                    <FileCode2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm">
                      No public gists found for @{currentUsername}.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {gists.map((gist) => {
                      const filesArray = Object.values(gist.files || {});
                      const primaryFile = filesArray[0];
                      return (
                        <div
                          key={gist.id}
                          className="rounded-xl border border-border/70 bg-surface-elevated p-4 transition hover:border-accent/60"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <a
                              href={gist.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-foreground hover:text-accent transition truncate flex items-center gap-1.5"
                            >
                              <FileCode2 className="h-4 w-4 text-accent shrink-0" />
                              {gist.description ||
                                primaryFile?.filename ||
                                "Gist snippet"}
                            </a>
                            <span className="text-[11px] text-muted-foreground">
                              {formatRelativeTime(gist.created_at)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {filesArray.map((file) => (
                              <span
                                key={file.filename}
                                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-xs text-muted-foreground"
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${getLanguageColor(
                                    file.language,
                                  )}`}
                                />
                                {file.filename}
                                <span className="opacity-60 text-[10px]">
                                  ({Math.round(file.size / 1024)} KB)
                                </span>
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
                            <span>Comments: {gist.comments}</span>
                            <a
                              href={gist.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                            >
                              Open Gist
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            )}

            {/* TAB CONTENT: 5. STARS */}
            {activeTab === "stars" && (
              <article className="rounded-2xl border border-border/70 bg-surface p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Starred Repositories ({filteredStarred.length})
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Projects and repositories starred by @{currentUsername}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Search starred */}
                    <div className="relative min-w-[180px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search starred..."
                        value={starredSearch}
                        onChange={(e) => setStarredSearch(e.target.value)}
                        className="w-full rounded-lg border border-border/70 bg-surface-elevated py-1.5 pl-8 pr-3 text-xs outline-none focus:border-accent"
                      />
                    </div>

                    {/* Language selector */}
                    <select
                      value={starredLanguage}
                      onChange={(e) => setStarredLanguage(e.target.value)}
                      className="rounded-lg border border-border/70 bg-surface-elevated px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    >
                      <option value="all">All Languages</option>
                      {availableStarredLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>

                    {/* Sort selector */}
                    <select
                      value={starredSort}
                      onChange={(e) =>
                        setStarredSort(
                          e.target.value as
                            | "stars"
                            | "forks"
                            | "updated"
                            | "name",
                        )
                      }
                      className="rounded-lg border border-border/70 bg-surface-elevated px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    >
                      <option value="stars">Most Stars</option>
                      <option value="forks">Most Forks</option>
                      <option value="updated">Recently Updated</option>
                      <option value="name">Name</option>
                    </select>

                    <a
                      href={`https://github.com/${currentUsername}?tab=stars`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      GitHub
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {starredLoading ? (
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-28 rounded-xl border border-border/70 bg-surface-elevated animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredStarred.length === 0 ? (
                  <div className="rounded-xl border border-border/60 bg-surface-elevated p-8 text-center text-muted-foreground">
                    <p className="text-sm">
                      No starred repositories found matching your search.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStarredSearch("");
                        setStarredLanguage("all");
                      }}
                      className="mt-2 text-xs font-semibold text-accent hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {paginatedStarred.map((repo: GitHubRepo) => (
                        <div
                          key={repo.id}
                          className="rounded-xl border border-border/70 bg-surface-elevated p-4 transition duration-200 hover:border-accent/60 flex flex-col justify-between"
                        >
                          <div>
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-foreground hover:text-accent truncate transition flex items-center gap-1.5"
                              >
                                <Star className="h-3.5 w-3.5 fill-primary text-primary shrink-0" />
                                <span className="truncate">
                                  {repo.full_name || repo.name}
                                </span>
                              </a>
                            </div>
                            <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                              {repo.description || "No description provided."}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                            {repo.language && (
                              <span className="flex items-center gap-1.5">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                                    repo.language,
                                  )}`}
                                />
                                {repo.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-primary" />
                              {formatFollowers(repo.stargazers_count)}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <PaginationControl
                      currentPage={starredPage}
                      totalItems={filteredStarred.length}
                      pageSize={PAGE_SIZE}
                      onPageChange={(p) => {
                        setStarredPage(p);
                        const el = document.getElementById(
                          "profile-tabs-content",
                        );
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      itemName="starred repositories"
                    />
                  </>
                )}
              </article>
            )}

            {/* TAB CONTENT: 6. ACHIEVEMENTS */}
            {activeTab === "achievements" && (
              <article className="rounded-2xl border border-border/70 bg-surface p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Achievements & Milestones ({achievements.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Recognized contributions and GitHub milestone badges
                    unlocked by @{currentUsername}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="rounded-2xl border border-border/70 bg-surface-elevated p-4 flex flex-col justify-between transition hover:border-accent/60"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-3xl">{ach.badge}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              ach.tier === "Gold"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : ach.tier === "Silver"
                                  ? "bg-slate-300/20 text-slate-300 border border-slate-300/30"
                                  : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            }`}
                          >
                            {ach.tier}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-foreground mb-1">
                          {ach.name}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                          {ach.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground flex items-center justify-between">
                        <span>Unlocked {ach.unlockedDate}</span>
                        <span className="font-medium text-accent">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* TAB CONTENT: 7. ORGANIZATIONS */}
            {activeTab === "organizations" && (
              <article className="rounded-2xl border border-border/70 bg-surface p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    Organizations ({orgs.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Public GitHub organizations and teams that @
                    {currentUsername} belongs to
                  </p>
                </div>

                {orgsLoading ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-24 rounded-xl border border-border/70 bg-surface-elevated animate-pulse"
                      />
                    ))}
                  </div>
                ) : orgs.length === 0 ? (
                  <div className="rounded-2xl border border-border/60 bg-surface-elevated p-8 text-center text-muted-foreground">
                    <Building2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-semibold">
                      No public organizations found for @{currentUsername}.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This developer has not made any organization memberships
                      publicly visible.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {orgs.map((org) => (
                      <div
                        key={org.id}
                        className="rounded-xl border border-border/70 bg-surface-elevated p-4 flex items-center justify-between gap-3 transition hover:border-accent/60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={org.avatar_url}
                            alt={org.login}
                            className="h-12 w-12 rounded-xl border border-border/70 object-cover shadow-sm"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-foreground truncate">
                              {org.login}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {org.description || "Public organization member"}
                            </p>
                          </div>
                        </div>

                        <a
                          href={
                            org.html_url || `https://github.com/${org.login}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl border border-border/70 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground hover:text-accent transition shrink-0"
                        >
                          View
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            )}
          </section>

          {/* RIGHT SIDE PANEL: Recent Activity + Metrics Summary */}
          <aside className="space-y-4">
            {/* RECENT ACTIVITY CARD */}
            <article className="rounded-2xl border border-border/70 bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" />
                  <h3 className="font-bold text-sm">Recent Activity</h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent uppercase font-mono">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent pulse-soft" />
                  Live
                </span>
              </div>

              {eventsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-md border border-border/60 bg-surface-elevated animate-pulse"
                    />
                  ))}
                </div>
              ) : events.length === 0 ? (
                <p className="text-xs text-muted-foreground py-3 text-center">
                  No recent public activity recorded.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {events.slice(0, 6).map((activity) => {
                    const commitMsg =
                      activity.payload?.commits?.[0]?.message ||
                      activity.payload?.pull_request?.title ||
                      activity.type.replace("Event", "");

                    return (
                      <div
                        key={activity.id}
                        className="rounded-xl border border-border/70 bg-surface-elevated p-3 transition hover:border-accent/50"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="truncate text-xs font-semibold text-accent">
                            {activity.type === "PushEvent"
                              ? "Pushed commit"
                              : activity.type === "PullRequestEvent"
                                ? "Pull request"
                                : activity.type.replace("Event", "")}
                          </p>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {formatRelativeTime(activity.created_at)}
                          </span>
                        </div>
                        <p className="truncate text-[11px] font-mono text-muted-foreground mb-1">
                          {activity.repo.name}
                        </p>
                        <p className="line-clamp-2 text-xs text-foreground/90">
                          {commitMsg}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>

            {/* Quick Summary */}
            <article className="rounded-2xl border border-border/70 bg-surface p-4">
              <h3 className="mb-3 font-semibold text-sm">Quick Metrics</h3>
              <div className="space-y-2.5 text-xs">
                <p className="flex justify-between text-muted-foreground">
                  <span>Public repos</span>
                  <span className="text-foreground font-semibold">
                    {user?.public_repos ?? repos.length}
                  </span>
                </p>
                <p className="flex justify-between text-muted-foreground">
                  <span>Total stars</span>
                  <span className="text-foreground font-semibold">
                    {formatFollowers(totalStars)}
                  </span>
                </p>
                <Link
                  to={`/profile/${currentUsername}/followers`}
                  className="flex justify-between text-muted-foreground hover:text-accent transition"
                >
                  <span>Followers</span>
                  <span className="text-foreground font-semibold">
                    {formatFollowers(user?.followers ?? 0)}
                  </span>
                </Link>
                <Link
                  to={`/profile/${currentUsername}/following`}
                  className="flex justify-between text-muted-foreground hover:text-accent transition"
                >
                  <span>Following</span>
                  <span className="text-foreground font-semibold">
                    {formatFollowers(user?.following ?? 0)}
                  </span>
                </Link>
              </div>
            </article>

            {/* Top languages */}
            <article className="rounded-2xl border border-border/70 bg-surface p-4">
              <h3 className="mb-3 font-semibold text-sm">Top Languages</h3>
              <div className="mb-3 flex h-2 overflow-hidden rounded-full">
                {languageStats.map((lang) => (
                  <span
                    key={lang.name}
                    className={lang.color}
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                {languageStats.map((lang) => (
                  <p
                    key={lang.name}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${lang.color}`} />
                      {lang.name}
                    </span>
                    <span className="font-mono">{lang.percentage}%</span>
                  </p>
                ))}
              </div>
            </article>

            {/* Collections */}
            <article className="rounded-2xl border border-border/70 bg-surface p-4 text-xs text-muted-foreground">
              <p className="mb-3 flex items-center gap-2 text-foreground font-medium text-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                Signals & Collections
              </p>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Public Gists</span>
                  <span className="text-foreground font-semibold">
                    {user?.public_gists ?? gists.length}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Account Age</span>
                  <span className="text-foreground font-semibold">
                    {user?.created_at
                      ? formatAccountAge(user.created_at)
                      : "Age 2y"}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Joined Date</span>
                  <span className="text-foreground font-semibold">
                    {user?.created_at
                      ? formatJoinDate(user.created_at)
                      : "2023"}
                  </span>
                </p>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Index;
