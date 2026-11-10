import { describe, it, expect } from "vitest";

describe("Pagination logic and calculations", () => {
  const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  it("calculates correct total pages for 186 items with page size 15", () => {
    const totalItems = 186;
    const pageSize = 15;
    const totalPages = Math.ceil(totalItems / pageSize);
    expect(totalPages).toBe(13);
  });

  it("generates correct page numbers at beginning of pagination range", () => {
    const pages = getPageNumbers(1, 13);
    expect(pages).toEqual([1, 2, 3, 4, 5, "...", 13]);
  });

  it("generates correct page numbers in middle of pagination range", () => {
    const pages = getPageNumbers(6, 13);
    expect(pages).toEqual([1, "...", 5, 6, 7, "...", 13]);
  });

  it("generates correct page numbers at end of pagination range", () => {
    const pages = getPageNumbers(12, 13);
    expect(pages).toEqual([1, "...", 9, 10, 11, 12, 13]);
  });

  it("slices exactly 15 items per page", () => {
    const items = Array.from({ length: 186 }, (_, i) => ({ id: i + 1, name: `repo-${i + 1}` }));
    const pageSize = 15;

    // Page 1
    const page1 = items.slice(0, 15);
    expect(page1.length).toBe(15);
    expect(page1[0].id).toBe(1);
    expect(page1[14].id).toBe(15);

    // Page 2
    const page2 = items.slice(15, 30);
    expect(page2.length).toBe(15);
    expect(page2[0].id).toBe(16);
    expect(page2[14].id).toBe(30);

    // Last Page (Page 13: 186 - 12*15 = 6 items)
    const page13 = items.slice(12 * 15, 13 * 15);
    expect(page13.length).toBe(6);
    expect(page13[0].id).toBe(181);
    expect(page13[5].id).toBe(186);
  });
});

