import { describe, it, expect } from "vitest";
import {
  getDeveloperUsernames,
  fetchDeveloperProfile,
  formatFollowers,
  formatJoinDate,
  formatAccountAge,
  formatRelativeTime,
  getLanguageColor,
} from "@/services/github";

describe("GitHub Service & Developer Usernames", () => {
  it("should extract developers list from developerGithubUsername.json", () => {
    const usernames = getDeveloperUsernames();
    expect(Array.isArray(usernames)).toBe(true);
    expect(usernames.length).toBeGreaterThan(0);
    expect(usernames).toContain("wapborhan");
  });

  it("should fetch developer profile from GitHub API", async () => {
    const mockUser = {
      login: "wapborhan",
      id: 126733545,
      avatar_url: "https://avatars.githubusercontent.com/u/126733545?v=4",
      html_url: "https://github.com/wapborhan",
      name: "Borhan Uddin",
      company: "Dev Directory",
      blog: "https://www.wapborhan.com",
      location: "Bheramara, Bangladesh",
      email: "borhaninfos@gmail.com",
      bio: "Full Stack Developer",
      twitter_username: "wapborhan",
      public_repos: 239,
      public_gists: 24,
      followers: 19500,
      following: 210,
      created_at: "2023-03-01T10:00:00Z",
    };

    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => ({
      ok: true,
      status: 200,
      json: async () => mockUser,
    })) as unknown as typeof fetch;

    try {
      const profile = await fetchDeveloperProfile("wapborhan");
      expect(profile.login).toBe("wapborhan");
      expect(profile.name).toBe("Borhan Uddin");
      expect(profile.public_repos).toBe(239);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("should format followers count properly", () => {
    expect(formatFollowers(500)).toBe("500");
    expect(formatFollowers(1500)).toBe("1.5K");
    expect(formatFollowers(19500)).toBe("19.5K");
    expect(formatFollowers(1200000)).toBe("1.2M");
  });

  it("should format join dates properly", () => {
    const formatted = formatJoinDate("2023-03-01T10:00:00Z");
    expect(formatted).toBe("Mar 2023");
  });

  it("should format account age properly", () => {
    const age = formatAccountAge("2020-01-01T00:00:00Z");
    expect(age).toMatch(/^Age \d+y$/);
  });

  it("should format relative time properly", () => {
    const now = new Date().toISOString();
    expect(formatRelativeTime(now)).toBe("just now");

    const twoHoursAgo = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
    expect(formatRelativeTime(twoHoursAgo)).toBe("2h ago");
  });

  it("should map language color tags correctly", () => {
    expect(getLanguageColor("TypeScript")).toBe("bg-info");
    expect(getLanguageColor("JavaScript")).toBe("bg-warning");
    expect(getLanguageColor("Python")).toBe("bg-primary");
    expect(getLanguageColor(null)).toBe("bg-muted");
  });
});

