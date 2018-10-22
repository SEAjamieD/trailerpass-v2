// Movies Home actions
export const _initialMovieFetch = (isActive, selectedCategory, selectedMovies, selectedMoviesRow2, randomMovies) => {
  return {
    type: 'INITIAL_MOVIE_FETCH',
    isActive,
    selectedCategory,
    selectedMovies,
    selectedMoviesRow2,
    randomMovies
  }
}

export const _fetchNewSet = (isActive, selectedCategory, selectedMovies, selectedMoviesRow2) => {
  return {
    type: 'FETCH_NEW_MOVIES',
    isActive,
    selectedCategory,
    selectedMovies,
    selectedMoviesRow2
  }
}
