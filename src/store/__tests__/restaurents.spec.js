import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurents} from '../restaurents/actions';
import restaurentsReducer from '../restaurents/reducers';

describe('restaurents', () => {
  describe('loadRestauurents action', () => {
    it('stores the restaurents', async () => {
      const records = [
        {id: 1, name: 'Salad Place'},
        {id: 2, name: 'Pasta Place'},
      ];

      const api = {
        loadRestaurents: () => Promise.resolve(records),
      };

      const initial_state = {
        records: [],
      };

      const store = createStore(
        restaurentsReducer,
        initial_state,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      await store.dispatch(loadRestaurents());

      expect(store.getState().records).toEqual(records);
    });
  });
});
