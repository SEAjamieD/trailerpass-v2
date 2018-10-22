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
    default:
      return state;
  }
}
