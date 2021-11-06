export default (a, b, filterState) => {
  if (filterState.sort === "popularity") {
    if (a.wtsCount > b.wtsCount) return 1;
    if (a.wtsCount < b.wtsCount) return -1;
    return 0;
  } else {
    if (a.trailerUploadDate > b.trailerUploadDate) return 1;
    if (a.trailerUploadDate < b.trailerUploadDate) return -1;
    return 0;
  }
};
