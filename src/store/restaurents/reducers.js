import {combineReducers} from 'redux';
import {STORE_RESTAURENTS} from './actions';

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURENTS:
      return action.records;
    default:
      return state;
  }
};

export default combineReducers({
  records,
});
