import * as types from '../action/types';

export default (state = { activeTab: 'home' }, action) => {
    switch (action.type) {
        case types.SET_ACTIVE_TAB:
            return { ...state, activeTab: action.payload }
        default:
            return state;
    }
}