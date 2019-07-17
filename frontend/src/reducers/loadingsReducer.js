import * as types from '../action/types';

export default (state = { loadings: [] }, action) => {
  switch (action.type) {
    case types.FETCH_LOADINGS:
      return { ...state, loadings: action.payload };
    case types.FETCH_LOADING:
      return { ...state, loading: action.payload };
    case types.FETCH_LOADING_ID:
      return { ...state, newLoadingId: action.payload };
    case types.CREATE_LOADING:
      return state;
    case types.NETWORK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
} 