import {
    SET_ACTIVE_TAB,
    SET_LOADING,
    UNSET_LOADING
} from '../action/types';

const initialState = {
    activeTab: 'home',
    load: false
}

export default (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return { ...state, activeTab: action.payload };
        case SET_LOADING:
            console.log('load')
            return { ...state, load: true };
        case UNSET_LOADING:
            console.log('unload')
            return { ...state, load: false };
        default:
            return state;
    }
}