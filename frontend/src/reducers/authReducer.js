import * as types from '../action/types';

const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false
      };
    case types.LOGIN_FAIL:
    case types.AUTH_ERROR:
    case types.LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        loading: false
      };
    case types.USER_LOADED:
      return {
        ...state,
        user: { ...action.payload },
        isAuthenticated: true,
        loading: false
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  };
};