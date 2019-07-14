import * as type from '../action/types';

export default (state = {}, action) => {
    switch (action.type) {
        case type.FETCH_CLIENTS:
            return { ...state, clients: action.payload };
        case type.FETCH_CLIENT:
            return { ...state, client: action.payload };
        case type.NETWORK_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
} 