import { describe, it, expect, beforeEach } from "vitest";
import {
  getSavedFavorites,
  FAVORITES_STORAGE_KEY,
} from "@/hooks/useFavorites";

describe("Favorites helper and localStorage persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty array when localStorage has no favorites", () => {
    expect(getSavedFavorites()).toEqual([]);
  });

  it("should parse string array from localStorage", () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(["shadcn", "yyx990803", "wapborhan"])
    );
    const favs = getSavedFavorites();
    expect(favs).toEqual(["shadcn", "yyx990803", "wapborhan"]);
    expect(favs.length).toBe(3);
  });

  it("should normalize and trim usernames to lowercase", () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify([" Torvalds ", "SHADCN", "antfu "])
    );
    const favs = getSavedFavorites();
    expect(favs).toEqual(["torvalds", "shadcn", "antfu"]);
  });

  it("should handle object array with login keys gracefully", () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify([{ login: "leerob" }, { login: "torvalds" }])
    );
    const favs = getSavedFavorites();
    expect(favs).toEqual(["leerob", "torvalds"]);
  });

  it("should handle invalid JSON in localStorage gracefully without throwing", () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, "invalid-json{{[");
    expect(getSavedFavorites()).toEqual([]);
  });

  it("should filter out empty or blank strings", () => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(["", "   ", "shadcn", null])
    );
    const favs = getSavedFavorites();
    expect(favs).toEqual(["shadcn"]);
  });
});
