import { combineReducers } from 'redux';
import todos from './todo.reducer';
import visibilityFilter from './visibilityFilter.reducer';

export default combineReducers({
  todos,
  visibilityFilter
})