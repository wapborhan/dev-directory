import { describe, it, expect } from "vitest";

describe("Markdown parsing logic for GitHub Profile READMEs", () => {
  function parseMarkdown(md: string): string {
    if (!md) return "";

    let html = md
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

    // Linked images
    html = html.replace(
      /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/gim,
      '<a href="$3"><img src="$2" alt="$1" /></a>'
    );

    // Standalone images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/gim,
      '<img src="$2" alt="$1" />'
    );

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2">$1</a>'
    );

    // Headings
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold & italic
    html = html.replace(/\*\*([^*]+)\*\*/gim, "<strong>$1</strong>");

    return html;
  }

  it("parses headers, bold text, and links", () => {
    const md = "# Hi, I'm Developer\n**Full Stack Engineer**\n[My Website](https://example.com)";
    const result = parseMarkdown(md);
    expect(result).toContain("<h1>Hi, I'm Developer</h1>");
    expect(result).toContain("<strong>Full Stack Engineer</strong>");
    expect(result).toContain('<a href="https://example.com">My Website</a>');
  });

  it("parses images and linked badges", () => {
    const md = "[![Twitter](https://img.shields.io/twitter.svg)](https://twitter.com/dev)";
    const result = parseMarkdown(md);
    expect(result).toContain('<a href="https://twitter.com/dev"><img src="https://img.shields.io/twitter.svg" alt="Twitter" /></a>');
  });

  it("strips harmful script tags", () => {
    const md = 'Hello <script>alert("xss")</script> World';
    const result = parseMarkdown(md);
    expect(result).not.toContain("<script>");
    expect(result).not.toContain("alert");
  });
});

