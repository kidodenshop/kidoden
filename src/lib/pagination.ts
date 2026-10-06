export type PaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: string };

/**
 * Returns the page items to display on mobile screens.
 * When totalPages > 5:
 * - If currentPage <= 4: shows 1, 2, 3, 4, '...', totalPages
 * - If currentPage >= totalPages - 3: shows 1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages
 * - Otherwise (middle): shows 1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages
 */
export function getMobilePaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [{ type: "page", page: 1 }];

  const current = Math.max(1, Math.min(currentPage, totalPages));

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: "page",
      page: i + 1,
    }));
  }

  // When totalPages is 6 or 7
  if (totalPages <= 7) {
    if (current <= 4) {
      return [
        { type: "page", page: 1 },
        { type: "page", page: 2 },
        { type: "page", page: 3 },
        { type: "page", page: 4 },
        { type: "ellipsis", key: "ellipsis-end" },
        { type: "page", page: totalPages },
      ];
    }
    return [
      { type: "page", page: 1 },
      { type: "ellipsis", key: "ellipsis-start" },
      { type: "page", page: totalPages - 3 },
      { type: "page", page: totalPages - 2 },
      { type: "page", page: totalPages - 1 },
      { type: "page", page: totalPages },
    ];
  }

  // When totalPages > 7
  if (current <= 4) {
    return [
      { type: "page", page: 1 },
      { type: "page", page: 2 },
      { type: "page", page: 3 },
      { type: "page", page: 4 },
      { type: "ellipsis", key: "ellipsis-end" },
      { type: "page", page: totalPages },
    ];
  }

  if (current >= totalPages - 3) {
    return [
      { type: "page", page: 1 },
      { type: "ellipsis", key: "ellipsis-start" },
      { type: "page", page: totalPages - 3 },
      { type: "page", page: totalPages - 2 },
      { type: "page", page: totalPages - 1 },
      { type: "page", page: totalPages },
    ];
  }

  // Middle pages
  return [
    { type: "page", page: 1 },
    { type: "ellipsis", key: "ellipsis-start" },
    { type: "page", page: current - 1 },
    { type: "page", page: current },
    { type: "page", page: current + 1 },
    { type: "ellipsis", key: "ellipsis-end" },
    { type: "page", page: totalPages },
  ];
}

/**
 * Returns the page items to display on desktop screens.
 * Shows up to 7 pages without truncation. When totalPages > 7, shows standard desktop pagination.
 */
export function getDesktopPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [{ type: "page", page: 1 }];

  const current = Math.max(1, Math.min(currentPage, totalPages));

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: "page",
      page: i + 1,
    }));
  }

  if (current <= 4) {
    return [
      { type: "page", page: 1 },
      { type: "page", page: 2 },
      { type: "page", page: 3 },
      { type: "page", page: 4 },
      { type: "page", page: 5 },
      { type: "ellipsis", key: "ellipsis-end" },
      { type: "page", page: totalPages },
    ];
  }

  if (current >= totalPages - 3) {
    return [
      { type: "page", page: 1 },
      { type: "ellipsis", key: "ellipsis-start" },
      { type: "page", page: totalPages - 4 },
      { type: "page", page: totalPages - 3 },
      { type: "page", page: totalPages - 2 },
      { type: "page", page: totalPages - 1 },
      { type: "page", page: totalPages },
    ];
  }

  return [
    { type: "page", page: 1 },
    { type: "ellipsis", key: "ellipsis-start" },
    { type: "page", page: current - 1 },
    { type: "page", page: current },
    { type: "page", page: current + 1 },
    { type: "ellipsis", key: "ellipsis-end" },
    { type: "page", page: totalPages },
  ];
}
