export const STORE_RESTAURENTS = 'STORE_RESTAURENTS';
export const START_LOADING = 'START_LOADING';
export const LOADING_FAILS = 'LOADING_FAILS';
export const ADD_RESTAURENT = 'ADD_RESTAURENT';

export const loadRestaurents = () => (dispatch, getState, api) => {
  dispatch(startLoading(true));
  api
    .loadRestaurents()
    .then(records => {
      dispatch(storeRestaurents(records));
    })
    .catch(err => {
      dispatch(loadingFails());
    });
};

export const createRestaurent = name => (dispatch, getState, api) => {
  return api.createRestaurent(name).then(record => {
    console.log('record', record);
    dispatch(addRestaurent(record));
  });
};

const storeRestaurents = records => ({
  type: STORE_RESTAURENTS,
  records,
});

const addRestaurent = record => ({
  type: ADD_RESTAURENT,
  record,
});

const startLoading = () => ({type: START_LOADING});

const loadingFails = () => ({type: LOADING_FAILS});
