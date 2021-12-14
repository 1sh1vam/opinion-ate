import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurents} from '../restaurents/actions';
import restaurentsReducer from '../restaurents/reducers';

describe('restaurents', () => {
  let store;
  describe('initially', () => {
    const initial_state = {};
    store = createStore(restaurentsReducer, initial_state);

    it('does not have the loading flag set', () => {
      expect(store.getState().loading).toEqual(false);
    });

    it('does not have the error flag set', () => {
      expect(store.getState().loadingError).toEqual(false);
    });
  });

  describe('loadRestaurents action', () => {
    describe('while loading succeeds', () => {
      const records = [
        {id: 1, name: 'Salad Place'},
        {id: 2, name: 'Pasta Place'},
      ];

      let store;

      beforeEach(() => {
        const api = {
          loadRestaurents: () => Promise.resolve(records),
        };

        const initial_state = {
          records: [],
        };

        store = createStore(
          restaurentsReducer,
          initial_state,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurents());
      });

      it('stores the restaurents', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toBe(false);
      });
    });

    describe('when loading fails', () => {
      let store;

      beforeEach(() => {
        const api = {
          loadRestaurents: () => Promise.reject(),
        };

        const initialState = {};

        store = createStore(
          restaurentsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurents());
      });

      it('sets an error flag', () => {
        expect(store.getState().loadingError).toEqual(true);
      });

      it('clears loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });

    describe('while loading', () => {
      let store;
      beforeEach(() => {
        const api = {
          loadRestaurents: () => new Promise(() => {}),
        };

        const initial_state = {loadingError: true};

        store = createStore(
          restaurentsReducer,
          initial_state,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        store.dispatch(loadRestaurents());
      });

      it('sets a loading flag', async () => {
        expect(store.getState().loading).toEqual(true);
      });

      it('clears error flag', async () => {
        expect(store.getState().loadingError).toEqual(false);
      });
    });
  });
});
