import React, { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Parses markdown into safe, sanitized HTML suitable for GitHub Profile READMEs.
 */
function parseMarkdown(md: string): string {
  if (!md) return "";

  // 1. Remove dangerous elements & attributes for security
  let html = md
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");

  // 2. Fenced code blocks
  html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gim, (_, lang, code) => {
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="my-4 overflow-x-auto rounded-xl border border-border/70 bg-surface-soft p-4 text-xs font-mono text-foreground leading-relaxed"><code class="language-${lang}">${escapedCode}</code></pre>`;
  });

  // 3. Linked Images: [![alt](imgUrl)](linkUrl)
  html = html.replace(
    /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/gim,
    '<a href="$3" target="_blank" rel="noopener noreferrer" class="inline-block transition hover:opacity-85"><img src="$2" alt="$1" class="inline-block max-w-full rounded" loading="lazy" /></a>'
  );

  // 4. Standalone Images: ![alt](url)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/gim,
    '<img src="$2" alt="$1" class="inline-block max-w-full rounded my-1" loading="lazy" />'
  );

  // 5. Standard Links: [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-accent hover:underline break-words">$1</a>'
  );

  // 6. Headers (# Heading)
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-base font-bold text-foreground mt-4 mb-2">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-foreground mt-5 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-foreground mt-6 mb-3 border-b border-border/50 pb-1.5">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-foreground mt-7 mb-3 border-b border-border/70 pb-2">$1</h1>');

  // 7. Horizontal Rules (--- or ***)
  html = html.replace(/^(?:---|\*\*\*|___)\s*$/gim, '<hr class="my-6 border-border/70" />');

  // 8. Blockquotes (> quote)
  html = html.replace(
    /^(?:>|&gt;)\s*(.*$)/gim,
    '<blockquote class="border-l-4 border-accent/80 pl-4 py-1 my-3 text-muted-foreground italic">$1</blockquote>'
  );

  // 9. Bold and Italic formatting
  html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/__([^_]+)__/gim, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/(^|[^\*])\*([^*]+)\*([^\*]|$)/gim, '$1<em class="italic text-foreground/90">$2</em>$3');
  html = html.replace(/(^|[^_])_([^_]+)_([^_]|$)/gim, '$1<em class="italic text-foreground/90">$2</em>$3');

  // 10. Inline code (`code`)
  html = html.replace(
    /`([^`]+)`/gim,
    '<code class="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground border border-border/60">$1</code>'
  );

  // 11. Lists
  // Convert unordered list items: - item or * item
  html = html.replace(/^\s*[-*+]\s+(.*)$/gim, '<li class="ml-5 list-disc leading-relaxed text-foreground/90 my-1">$1</li>');
  // Convert ordered list items: 1. item
  html = html.replace(/^\s*\d+\.\s+(.*)$/gim, '<li class="ml-5 list-decimal leading-relaxed text-foreground/90 my-1">$1</li>');

  // 12. Paragraph breaks (double newlines)
  const blocks = html.split(/\n\s*\n/);
  const formattedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    // If block starts with a tag that doesn't need <p> wrapper
    if (
      /^<(?:h[1-6]|pre|blockquote|hr|ul|ol|li|div|p|table|details)/i.test(trimmed)
    ) {
      return trimmed;
    }
    // Replace single newlines inside paragraph with <br />
    const withBreaks = trimmed.replace(/\n/g, "<br />");
    return `<p class="my-3 text-sm leading-relaxed text-foreground/90">${withBreaks}</p>`;
  });

  return formattedBlocks.filter(Boolean).join("\n");
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  const renderedHtml = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div
      className={`markdown-body w-full max-w-none text-foreground leading-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

