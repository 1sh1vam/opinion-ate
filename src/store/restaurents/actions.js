export const STORE_RESTAURENTS = 'STORE_RESTAURENTS';
export const START_LOADING = 'START_LOADING';
export const LOADING_FAILS = 'LOADING_FAILS';

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

const storeRestaurents = records => ({
  type: STORE_RESTAURENTS,
  records,
});

const startLoading = () => ({type: START_LOADING});

const loadingFails = () => ({type: LOADING_FAILS});
