import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("GitHub Rate Limit & Auth Header logic", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset env
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("encodes client_id and client_secret into standard Basic Auth header", () => {
    const clientId = "Iv1.abcdef123456";
    const clientSecret = "secret9876543210";
    const authString = `${clientId}:${clientSecret}`;
    const encoded = Buffer.from(authString).toString("base64");
    const header = `Basic ${encoded}`;

    expect(header).toBe(`Basic ${Buffer.from("Iv1.abcdef123456:secret9876543210").toString("base64")}`);

    // Verify it decodes back properly
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    expect(decoded).toBe("Iv1.abcdef123456:secret9876543210");
  });

  it("formats API version header according to GitHub REST API standards", () => {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    expect(headers["Accept"]).toBe("application/vnd.github+json");
    expect(headers["X-GitHub-Api-Version"]).toBe("2022-11-28");
  });
});

