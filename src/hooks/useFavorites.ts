import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const FAVORITES_STORAGE_KEY = "dev_directory_favorites";
const FAVORITES_EVENT = "dev_directory_favorites_updated";

/**
 * Safely parse favorites from localStorage
 */
export function getSavedFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (typeof item === "string") return item.toLowerCase().trim();
          if (item && typeof item === "object" && "login" in item) {
            return String((item as { login: unknown }).login).toLowerCase().trim();
          }
          return "";
        })
        .filter(Boolean);
    }
  } catch (e) {
    console.error("Failed to parse favorites from localStorage", e);
  }
  return [];
}

/**
 * Hook to manage favorite developers persisted in localStorage
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => getSavedFavorites());

  // Listen to cross-component and cross-tab storage updates
  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getSavedFavorites());
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener(FAVORITES_EVENT, handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener(FAVORITES_EVENT, handleUpdate);
    };
  }, []);

  const saveFavorites = useCallback((newList: string[]) => {
    const unique = Array.from(
      new Set(newList.map((u) => u.toLowerCase().trim()).filter(Boolean))
    );
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(unique));
      window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: unique }));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
    setFavorites(unique);
  }, []);

  const isFavorite = useCallback(
    (username?: string | null) => {
      if (!username) return false;
      const clean = username.toLowerCase().trim();
      return favorites.includes(clean);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (username: string, silent = false) => {
      const clean = username.toLowerCase().trim();
      if (!clean) return;

      const current = getSavedFavorites();
      const exists = current.includes(clean);
      const next = exists
        ? current.filter((u) => u !== clean)
        : [...current, clean];

      saveFavorites(next);

      if (!silent) {
        if (exists) {
          toast.info(`Removed @${clean} from favorites`);
        } else {
          toast.success(`Saved @${clean} to favorites!`);
        }
      }
    },
    [saveFavorites]
  );

  const addFavorite = useCallback(
    (username: string) => {
      const clean = username.toLowerCase().trim();
      if (!clean) return;
      const current = getSavedFavorites();
      if (!current.includes(clean)) {
        saveFavorites([...current, clean]);
        toast.success(`Saved @${clean} to favorites!`);
      }
    },
    [saveFavorites]
  );

  const removeFavorite = useCallback(
    (username: string) => {
      const clean = username.toLowerCase().trim();
      if (!clean) return;
      const current = getSavedFavorites();
      saveFavorites(current.filter((u) => u !== clean));
      toast.info(`Removed @${clean} from favorites`);
    },
    [saveFavorites]
  );

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
    toast.info("Cleared all favorite developers");
  }, [saveFavorites]);

  return {
    favorites,
    favoritesSet: new Set(favorites),
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
}

