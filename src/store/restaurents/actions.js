export const STORE_RESTAURENTS = 'STORE_RESTAURENTS';

export const loadRestaurents = () => (dispatch, getState, api) => {
  api.loadRestaurents().then(records => {
    dispatch(storeRestaurents(records));
  });
};

const storeRestaurents = records => ({
  type: STORE_RESTAURENTS,
  records,
});
