import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomeHeader from "@/components/HomeHeader";
import SearchData from "@/components/SearchData";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";
import DevCard from "@/components/shared/DevCard";
import { useFavorites } from "@/hooks/useFavorites";
import {
  fetchAllDevelopers,
  getDeveloperUsernames,
} from "@/services/github";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoritesSet, toggleFavorite } = useFavorites();

  // Search and filter states initialized from URL params
  const [language, setLanguage] = useState<string>(
    searchParams.get("lang") || ""
  );
  const [locationFilter, setLocationFilter] = useState<string>(
    searchParams.get("loc") || ""
  );
  const [sortBy, setSortBy] = useState<"followers" | "repos" | "joined">(
    (searchParams.get("sort") as "followers" | "repos" | "joined") || "followers"
  );
  const [showFavorites, setShowFavorites] = useState<boolean>(
    searchParams.get("favorites") === "true"
  );

  // Fetch developers defined in developerGithubUsername.json
  const usernames = useMemo(() => getDeveloperUsernames(), []);

  const {
    data: developers = [],
    isLoading,
  } = useQuery({
    queryKey: ["developers", usernames],
    queryFn: () => fetchAllDevelopers(usernames),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Sync URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (language) params.set("lang", language);
    if (locationFilter) params.set("loc", locationFilter);
    if (showFavorites) params.set("favorites", "true");
    if (sortBy !== "followers") params.set("sort", sortBy);
    setSearchParams(params, { replace: true });
  }, [language, locationFilter, showFavorites, sortBy, setSearchParams]);

  // Filter and sort developers
  const filteredDevelopers = useMemo(() => {
    return developers
      .filter((user) => {
        if (showFavorites && !favoritesSet.has(user.login.toLowerCase())) {
          return false;
        }

        if (language.trim()) {
          const lQuery = language.trim().toLowerCase();
          const userLang = (user.topLanguage || "").toLowerCase();
          const bio = (user.bio || "").toLowerCase();
          const company = (user.company || "").toLowerCase();
          if (
            !userLang.includes(lQuery) &&
            !bio.includes(lQuery) &&
            !company.includes(lQuery)
          ) {
            return false;
          }
        }

        if (locationFilter.trim()) {
          const locQuery = locationFilter.trim().toLowerCase();
          const userLoc = (user.location || "").toLowerCase();
          if (!userLoc.includes(locQuery)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "followers") {
          return b.followers - a.followers;
        }
        if (sortBy === "repos") {
          return b.public_repos - a.public_repos;
        }
        if (sortBy === "joined") {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
        return 0;
      });
  }, [developers, language, locationFilter, showFavorites, sortBy, favoritesSet]);

  const totalLanguages = useMemo(() => {
    const langs = new Set<string>();
    developers.forEach((dev) => {
      if (dev.topLanguage) langs.add(dev.topLanguage);
    });
    return Math.max(langs.size, 5);
  }, [developers]);

  const totalLocations = useMemo(() => {
    const locs = new Set<string>();
    developers.forEach((dev) => {
      if (dev.location) locs.add(dev.location);
    });
    return Math.max(locs.size, 6);
  }, [developers]);

  const handleResetFilters = () => {
    setLanguage("");
    setLocationFilter("");
    setShowFavorites(false);
    setSortBy("followers");
  };

  const isFilterActive = Boolean(language || locationFilter || showFavorites);

  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-background text-foreground">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6">
          {/* Search Deck & Overview only on this Search page */}
          <div className="grid grid-cols-5 gap-5">
            <SearchForm
              language={language}
              onLanguageChange={setLanguage}
              location={locationFilter}
              onLocationChange={setLocationFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFavorites={showFavorites}
              onToggleFavorites={() => setShowFavorites((prev) => !prev)}
              onSubmit={() => {}}
              totalMatches={filteredDevelopers.length}
            />
            <SearchData
              totalDevelopers={developers.length}
              totalLanguages={totalLanguages}
              totalLocations={totalLocations}
            />
          </div>

          <SearchResult
            count={filteredDevelopers.length}
            isLoading={isLoading}
            filterActive={isFilterActive}
            onResetFilters={handleResetFilters}
            language={language}
            location={locationFilter}
          />

          <section className="mt-6 grid gap-5 md:grid-cols-2">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="surface-panel-strong rounded-3xl p-6 border border-border/70 bg-surface animate-pulse h-80"
                />
              ))
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
        </div>
      </main>
    </>
  );
}

export default SearchPage;

