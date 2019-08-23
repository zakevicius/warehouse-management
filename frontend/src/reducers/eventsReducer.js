import {
    SET_ACTIVE_TAB,
    SET_LOADING,
    UNSET_LOADING,
    SET_ACTIVE_SUB_TAB
} from '../action/types';

const initialState = {
    activeTab: 'home',
    activeSubTab: 'all',
    load: false,
}

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
        default:
            return state;
    }
}