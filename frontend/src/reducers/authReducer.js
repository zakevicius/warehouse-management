import * as types from '../action/types';

export default (state = { user: {}, isAuthenticated: false }, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
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
        error: action.payload
      };
    case types.USER_LOADED:
      console.log(action.payload);
      return { ...state, user: { ...action.payload }, isAuthenticated: true };
    default:
      return state;
  }
} 