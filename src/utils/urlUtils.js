export function getPageFromQuery(queryStr) {
    const queryParams = new URLSearchParams(queryStr);
    const currentPage = parseInt(queryParams.get("page"), 10) || 1;
    return currentPage;
  }