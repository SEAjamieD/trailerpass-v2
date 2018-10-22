// Search page reducer

const initialState = {
  results: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH_MOVIE':
      return {
        ...state,
        results: action.results
      }
    case 'CLEAR_SEARCH':
      return {
        ...state,
        results: action.results
      }
    default:
      return state;
  }
}
