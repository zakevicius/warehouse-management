import * as type from '../action/types';

export default (state = {}, action) => {
    switch (action.type) {
        case type.FETCH_CLIENTS:
            return { ...state, clients: action.payload }
        default:
            return state;
    }
} 