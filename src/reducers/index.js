import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import {LOGOUT, SEARCH_REPO, SEARCH_DATA_STORAGE} from '../actions/ActionTypes';

const appReducer = combineReducers({
  searchRepoReducer: serviceReducer(SEARCH_REPO),
  searchDataStorage: serviceReducer(SEARCH_DATA_STORAGE),
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    let newState = {};
    for (let key of Object.keys(state)) {
      newState[key] = {
        ...state[key],
        data: [],
        meta: {current_page: 0, last_page: 0},
      };
    }
    state = {
      ...newState,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
