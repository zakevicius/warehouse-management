import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOG_OUT,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../action/types';

const initialState = {
  user: {},
  isAuthenticated: false,
  error: null,
  token: localStorage.getItem('token')
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    case USER_LOADED:
      return {
        ...state,
        user: { ...action.payload },
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerMsg: action.payload,
        newUserCreated: 'success'
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerMsg: action.payload,
        newUserCreated: 'fail'
      };
    default:
      return state;
  };
};