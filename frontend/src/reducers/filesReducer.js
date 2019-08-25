import {
  UPLOAD_FILES,
  ADD_FILE,
  REMOVE_FILE,
  CLEAR_FILES,
  DELETE_FILE
} from '../action/types';

const initialState = {
  files: [],
  status: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return { ...state, status: [...state.status, action.payload] };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case REMOVE_FILE:
      return { ...state, files: [...state.files.filter(file => file.name !== action.payload.name)] };
    case DELETE_FILE:
      return { ...state, files: [...state.files.filter(file => file.name !== action.payload.name)] };
    case CLEAR_FILES:
      return { ...state, files: [] };
    default:
      return state;
  }
}