import { Link } from "react-router-dom";
import {
  CalendarDays,
  Copy,
  ExternalLink,
  Globe,
  Heart,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  GitHubUser,
  formatFollowers,
  formatJoinDate,
  formatAccountAge,
} from "@/services/github";

interface DevCardProps {
  user: GitHubUser;
  isFavorite?: boolean;
  onToggleFavorite?: (username: string) => void;
}

export default function DevCard({
  user,
  isFavorite = false,
  onToggleFavorite,
}: DevCardProps) {
  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(user.html_url);
    toast.success(`Copied GitHub profile URL for @${user.login}!`);
  };

  const handleCopyEmail = () => {
    if (user.email) {
      navigator.clipboard.writeText(user.email);
      toast.success(`Copied email (${user.email}) to clipboard!`);
    } else {
      toast.info(`@${user.login} has no public email listed on GitHub.`);
    }
  };

  const websiteUrl =
    user.blog && user.blog.trim()
      ? user.blog.startsWith("http")
        ? user.blog
        : `https://${user.blog}`
      : null;

  return (
    <article
      className="surface-panel-strong radar-ring group relative overflow-hidden rounded-3xl p-5 sm:p-6 border border-border/70 bg-surface transition-all duration-300 hover:border-accent/60"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/18 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-44 w-44 rounded-full bg-accent/14 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 texture-noise" />

      <div className="relative space-y-4">
        {/* Header: Avatar, Name, Handle, Favorite */}
        <div className="flex items-start gap-4">
          <Link to={`/profile/${user.login}`}>
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              loading="lazy"
              className="h-32 w-32 rounded-[1.6rem] border border-border/70 object-cover shadow-xl shadow-background/60 transition duration-300 group-hover:scale-105 sm:h-36 sm:w-36"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link to={`/profile/${user.login}`} className="inline-flex min-w-0">
                <h3 className="truncate font-display text-2xl font-bold text-foreground transition hover:text-accent sm:text-3xl">
                  {user.name || user.login}
                </h3>
              </Link>

              <button
                type="button"
                onClick={() => onToggleFavorite?.(user.login)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  isFavorite
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border/70 bg-secondary/45 text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
                aria-label={
                  isFavorite
                    ? `Remove ${user.login} from favorites`
                    : `Add ${user.login} to favorites`
                }
                title={isFavorite ? "Remove favorite" : "Add to favorites"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary" : ""}`} />
              </button>
            </div>

            <p className="text-tech mt-1 truncate text-xs uppercase tracking-wide text-muted-foreground">
              @{user.login}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {user.followers > 1000 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/60 bg-primary/20 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                  <Sparkles className="h-3 w-3" />
                  Popular
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {user.company || "Signal Elite"}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/40 px-2 py-1">
                <MapPin className="h-3 w-3" />
                {user.location || "Global"}
              </span>
            </div>
          </div>
        </div>

        {/* Bio if exists */}
        {user.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2 italic">
            "{user.bio}"
          </p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border/70 bg-background/45 p-3 sm:grid-cols-4">
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Repos
            </p>
            <p className="font-display text-2xl font-bold">{user.public_repos}</p>
          </div>
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Gists
            </p>
            <p className="font-display text-2xl font-bold">{user.public_gists}</p>
          </div>
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Followers
            </p>
            <p className="font-display text-2xl font-bold">
              {formatFollowers(user.followers)}
            </p>
          </div>
          <div>
            <p className="text-tech text-[10px] uppercase text-muted-foreground">
              Following
            </p>
            <p className="font-display text-2xl font-bold">
              {formatFollowers(user.following)}
            </p>
          </div>
        </div>

        {/* Meta: Joined, Age, Email */}
        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-2.5 py-2">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{formatJoinDate(user.created_at)}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-2.5 py-2">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{formatAccountAge(user.created_at)}</span>
          </div>

          <div className="inline-flex min-w-0 items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-2.5 py-2">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span
              className="min-w-0 truncate"
              title={user.email || "No public email"}
            >
              {user.email || "No public email"}
            </span>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 min-w-[90px] items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent/70 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
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
            GitHub
          </a>

          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 min-w-[90px] items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/70 hover:text-primary"
            >
              <Globe className="h-3.5 w-3.5" />
              Website
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <Link
              to={`/profile/${user.login}`}
              className="inline-flex flex-1 min-w-[90px] items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/70 hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Profile
            </Link>
          )}

          <button
            type="button"
            onClick={handleCopyProfileUrl}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent/70 hover:text-accent"
            title="Copy GitHub URL"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>

          {user.email && (
            <>
              <a
                href={`mailto:${user.email}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/70 hover:text-primary"
              >
                <Send className="h-3.5 w-3.5" />
                Mail
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent/70 hover:text-accent"
                title="Copy Email"
              >
                <Copy className="h-3.5 w-3.5" />
                Email
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
