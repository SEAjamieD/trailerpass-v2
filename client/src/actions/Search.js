// Search actions
export const _searchMovie = (results) => {
  return {
    type: 'SEARCH_MOVIE',
    results
  }
}

export const _clearSearch = () => {
  return {
    type: 'CLEAR_SEARCH',
    results: []
  }
}
