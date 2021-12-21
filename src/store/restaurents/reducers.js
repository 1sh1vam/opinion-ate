import {combineReducers} from 'redux';
import {STORE_RESTAURENTS, START_LOADING, LOADING_FAILS, ADD_RESTAURENT} from './actions';

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURENTS:
      return action.records;
    case ADD_RESTAURENT:
      console.log('action', action);
      return [...state, action.record];
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STORE_RESTAURENTS:
    case LOADING_FAILS:
      return false;
    default:
      return state;
  }
};

const loadingError = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return false;
    case LOADING_FAILS:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  records,
  loading,
  loadingError,
});
