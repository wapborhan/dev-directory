import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Radar, Sun, Moon, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const HomeHeader = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("dev_theme") === "dark" ||
        document.documentElement.classList.contains("dark") ||
        true // default to dark in this stylish theme
      );
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dev_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dev_theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const isHome = location.pathname === "/";
  const isSearch = location.pathname === "/search";
  const isFavorites = location.pathname === "/favorites";
  const { favoritesCount } = useFavorites();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/78 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 atmosphere-grid opacity-15" />
      <div className="pointer-events-none absolute inset-0 texture-noise" />
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="group flex items-center gap-3" to="/">
          <div className="radar-ring relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-secondary/55">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-accent/30 to-transparent scanline" />
            <div style={{ transform: "scale(1.01908) rotate(7.98883deg)" }}>
              <Compass className="h-5 w-5 text-accent transition-transform duration-300 group-hover:rotate-45" />
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
        </Link>

        <nav className="flex items-center gap-2" aria-label="Primary">
          <Link
            className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-all ${
              isHome
                ? "bg-primary text-primary-foreground glow-amber"
                : "text-muted-foreground hover:bg-secondary/75 hover:text-foreground"
            }`}
            aria-current={isHome ? "page" : undefined}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-all ${
              isSearch
                ? "bg-primary text-primary-foreground glow-amber"
                : "text-muted-foreground hover:bg-secondary/75 hover:text-foreground"
            }`}
            aria-current={isSearch ? "page" : undefined}
            to="/search"
          >
            <Radar className="mr-1.5 h-4 w-4" />
            Search
          </Link>

          <Link
            className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-all ${
              isFavorites
                ? "bg-primary text-primary-foreground glow-amber"
                : "text-muted-foreground hover:bg-secondary/75 hover:text-foreground"
            }`}
            aria-current={isFavorites ? "page" : undefined}
            to="/favorites"
          >
            <Heart
              className={`mr-1.5 h-4 w-4 ${favoritesCount > 0 ? "fill-current" : ""}`}
            />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span
                className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  isFavorites
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {favoritesCount}
              </span>
            )}
          </Link>

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
            type="button"
            onClick={toggleTheme}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/55 text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
