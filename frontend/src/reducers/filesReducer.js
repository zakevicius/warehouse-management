import {
  UPLOAD_FILES,
  ADD_FILE,
  REMOVE_FILE,
  CLEAR_FILES,
  DELETE_FILE,
  FETCH_FILES,
  DOWNLOAD_FILE,
  FILE_ERROR,
  CLEAR_STATE,
  CLEAR_FILE_ERROR,
  FILE_SET_LOADING,
  FILE_UNSET_LOADING
} from "../action/types";

const initialState = {
  files: { photos: [], documents: [] },
  filesToUpload: [],
  status: [],
  load: false,
  imageToShow: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES:
      let photos = action.payload.data.filter(file => file.type === "photo");
      let documents = action.payload.data.filter(
        file => file.type === "document"
      );
      let base64 = action.payload.base64;

      photos.forEach(photo => {
        base64.forEach(base => {
          if (photo._id.toString() === base._id.toString()) {
            photo.src = base.base64Data;
          }
        });
      });

      return {
        ...state,
        files: {
          photos,
          documents
        }
      };
    case DOWNLOAD_FILE:
      return {
        ...state,
        src: action.payload.imageData
      };
    case UPLOAD_FILES:
      return {
        ...state,
        files: {
          photos: [...state.files.photos, ...action.payload.photos],
          documents: [...state.files.documents, ...action.payload.documents]
        },
        status: [...state.status, action.payload]
      };
    case ADD_FILE:
      return {
        ...state,
        filesToUpload: [...state.filesToUpload, action.payload]
      };
    case REMOVE_FILE:
      return {
        ...state,
        filesToUpload: state.filesToUpload.filter(
          file => file.name !== action.payload.name
        )
      };
    case DELETE_FILE:
      return {
        ...state,
        files: {
          photos: state.files.photos.filter(
            file => file._id !== action.payload.id
          ),
          documents: state.files.documents.filter(
            file => file._id !== action.payload.id
          )
        }
      };
    case CLEAR_FILES:
      return { ...state, filesToUpload: [] };
    case FILE_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_FILE_ERROR:
      return { ...state, error: null };
    case FILE_SET_LOADING:
      return { ...state, load: true };
    case FILE_UNSET_LOADING:
      return { ...state, load: false };
    case CLEAR_STATE:
      return { initialState };
    default:
      return state;
  }
};
