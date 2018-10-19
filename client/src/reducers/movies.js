// Movies reducer

const initialState = {
  selectedCategory: 'trending',
  selectedMovies: [],
  selectedMoviesRow2: [],
  randomMovies: [],
}

// function fetchPopularMovies() {
//   fetch('/api/trending-movies')
//     .then(res => res.json())
//     .then((data) => {
//       let selectedCategory = 'trending';
//       let selectedMovies = data.results.slice(0,10);
//       let selectedMoviesRow2 = data.results.slice(11,20);
//       let randomMovies = data.results.slice(13,16);
//       return {
//         selectedCategory: 'trending',
//         selectedMovies: data.results.slice(0,10),
//         selectedMoviesRow2: data.results.slice(11,20),
//         randomMovies: data.results.slice(13,16)
//       }
//       // store.dispatch(setSelectedMovies(selectedCategory, selectedMovies, selectedMoviesRow2, randomMovies))
//     })
// }


export default (state = initialState, action) => {
  switch(action.type) {
    case 'SELECTED_MOVIES':
      return {
        ...state,
        selectedCategory: action.selectedCategory,
        selectedMovies: action.selectedMovies,
        selectedMoviesRow2: action.selectedMoviesRow2,
        randomMovies: action.randomMovies
      }
    default:
      return state;
  }
}
