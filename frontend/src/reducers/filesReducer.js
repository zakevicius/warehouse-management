import {
  UPLOAD_FILES,
  ADD_FILE,
  REMOVE_FILE,
  CLEAR_FILES,
  DELETE_FILE,
  FETCH_FILES,
  DOWNLOAD_FILE,
  FILE_ERROR
} from '../action/types';

const initialState = {
  files: { photos: [], documents: [] },
  filesToUpload: [],
  status: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES:
      return {
        ...state,
        files: {
          photos: action.payload.filter(file => file.type === 'photo'),
          documents: action.payload.filter(file => file.type === 'document')
        }
      };
    case DOWNLOAD_FILE:
      return state;
    case UPLOAD_FILES:
      console.log(action.payload)
      return {
        ...state,
        files: {
          photos: [...state.files.photos, ...action.payload.photos],
          documents: [...state.files.documents, ...action.payload.documents]
        },
        status: [...state.status, action.payload]
      };
    case ADD_FILE:
      return { ...state, filesToUpload: [...state.filesToUpload, action.payload] };
    case REMOVE_FILE:
      return { ...state, filesToUpload: [state.filesToUpload.filter(file => file.name !== action.payload.name)] };
    case DELETE_FILE:
      return {
        ...state,
        files: {
          photos: state.files.photos.filter(file => file._id !== action.payload.id),
          documents: state.files.documents.filter(file => file._id !== action.payload.id)
        }
      };
    case CLEAR_FILES:
      return { ...state, filesToUpload: [] };
    case FILE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}