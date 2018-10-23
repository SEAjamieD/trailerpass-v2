// styles page reducer

const initialState = {
  headerColor: '#fff',
  headerText: '',
  textSize: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_HEADER_COLOR':
      return {
        ...state,
        headerColor: action.headerColor,
        headerText: action.headerText,
        textSize: action.textSize
      }
    default:
      return state;
  }
}
