import {
  SET_ACTIVE_TAB,
  SET_LOADING,
  UNSET_LOADING,
  SET_ACTIVE_SUB_TAB,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_IMAGE_MODAL,
  HIDE_IMAGE_MODAL
} from "../action/types";

const initialState = {
  activeTab: "home",
  activeSubTab: "all",
  load: false,
  showModal: false,
  showImageModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case SET_ACTIVE_SUB_TAB:
      return { ...state, activeSubTab: action.payload };
    case SET_LOADING:
      return { ...state, load: true };
    case UNSET_LOADING:
      return { ...state, load: false };
    case SHOW_MODAL:
    case HIDE_MODAL:
      return { ...state, showModal: action.payload };
    case SHOW_IMAGE_MODAL:
    case HIDE_IMAGE_MODAL:
      return { ...state, showImageModal: action.payload };
    default:
      return state;
  }
};
