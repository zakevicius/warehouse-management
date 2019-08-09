import {
  FETCH_LOADINGS,
  FETCH_LOADING,
  CREATE_LOADING,
  NETWORK_ERROR
} from '../action/types';

export default (state = { loadings: [] }, action) => {
  switch (action.type) {
    case FETCH_LOADINGS:
      return { ...state, loadings: action.payload };
    case FETCH_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_LOADING:
      return { ...state, loadings: [...state.loadings, action.payload] };
    case NETWORK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
} 