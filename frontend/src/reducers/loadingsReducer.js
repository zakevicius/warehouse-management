import {
  FETCH_LOADINGS,
  FETCH_LOADING,
  CREATE_LOADING,
  LOADING_ERROR,
  NEW_LOADING_ID,
  CLEAR_STATE,
  CLEAR_LOADING_ERROR,
  UPDATE_ORDER,
  UPDATE_LOADING
} from '../action/types';

export default (state = { loadings: [] }, action) => {
  switch (action.type) {
    case FETCH_LOADINGS:
      return { ...state, loadings: action.payload };
    case FETCH_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_LOADING:
      return { ...state, loadings: [...state.loadings, action.payload] };
    case UPDATE_LOADING:
      return {
        ...state, loading: {
          ...state.loading,
          data: action.payload
        }
      }
    case NEW_LOADING_ID:
      return { ...state, newLoadingID: action.payload };
    case UPDATE_ORDER:
      return {
        ...state, loading: {
          ...state.loading,
          orders: [...state.loading.orders.map(order => order._id !== action.payload.order._id ? order : action.payload.order)]
        }
      }
    case LOADING_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_LOADING_ERROR:
      return { ...state, error: null };
    case CLEAR_STATE:
      return { ...state, loading: null };
    default:
      return state;
  }
} 