import * as types from '../action/types';

export default (state = { clients: [] }, action) => {
    switch (action.type) {
        case types.FETCH_CLIENTS:
            return { ...state, clients: action.payload };
        case types.FETCH_CLIENT:
            return { ...state, client: action.payload };
        case types.FETCH_CLIENT_ID:
            return { ...state, newClientId: action.payload };
        case types.CREATE_CLIENT:
            return state;
        case types.CLIENT_ERROR:
            return { ...state, errors: action.payload };
        default:
            return state;
    }
} 