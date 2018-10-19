// Movies reducer

const initialState = {
  isActive: 0,
  selectedCategory: 'trending',
  selectedMovies: [],
  selectedMoviesRow2: [],
  randomMovies: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'INITIAL_MOVIE_FETCH':
      return {
        ...state,
        selectedCategory: action.selectedCategory,
        selectedMovies: action.selectedMovies,
        selectedMoviesRow2: action.selectedMoviesRow2,
        randomMovies: action.randomMovies
      }
    case 'FETCH_NEW_MOVIES':
      return {
        ...state,
        isActive: action.isActive,
        selectedCategory: action.selectedCategory,
        selectedMovies: action.selectedMovies,
        selectedMoviesRow2: action.selectedMoviesRow2,
      }

    default:
      return state;
  }
}
