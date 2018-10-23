//reducers
import { combineReducers } from 'redux';

import movies from './movies';
import search from './search';
import styles from './styles';

export default combineReducers({
  movies,
  search,
  styles
});
