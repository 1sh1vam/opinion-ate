import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createRestaurent, loadRestaurents} from '../restaurents/actions';
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

  describe('createRestaurent action', () => {
    const newRestaurentName = 'Salad Place';

    const existingRestaurent = {id: 1, name: 'Pasta Place'};
    const newRestaurent = {id: 2, name: newRestaurentName};

    let api;
    let store;
    let promise;

    beforeEach(async () => {
      api = {
        createRestaurent: jest.fn().mockName('createRestaurent'),
      };

      const initial_state = {records: [existingRestaurent]};

      store = createStore(
        restaurentsReducer,
        initial_state,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
    });

    it('saves the restaurent to the server', () => {
      api.createRestaurent.mockResolvedValue(newRestaurent);
      store.dispatch(createRestaurent(newRestaurentName));
      expect(api.createRestaurent).toHaveBeenCalledWith(newRestaurentName);
    });

    describe('when save succeeds', () => {
      beforeEach(() => {
        api.createRestaurent.mockResolvedValue(newRestaurent);
        promise = store.dispatch(createRestaurent(newRestaurentName));
      });

      it('stores the returned store value in the store', () => {
        expect(store.getState().records).toEqual([
          existingRestaurent,
          newRestaurent,
        ]);
      });

      it('resolves', () => {
        expect(promise).resolves.toBeUndefined();
      });
    });

    describe('when save fails', () => {
      it('rejects', () => {
        api.createRestaurent.mockRejectedValue();
        promise = store.dispatch(createRestaurent(newRestaurentName));
        expect(promise).rejects.toBeUndefined();
      });
    });
  });
});
