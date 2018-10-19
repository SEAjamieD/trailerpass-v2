//actions
export const setSelectedMovies = (selectedCategory, selectedMovies, selectedMoviesRow2, randomMovies) => {
  return {
    type: 'SELECTED_MOVIES',
    selectedCategory,
    selectedMovies,
    selectedMoviesRow2,
    randomMovies
  }
}
