import * as types from '../action/types';

export default (state = { clients: [] }, action) => {
    switch (action.type) {
        case types.FETCH_CLIENTS:
            return { ...state, clients: action.payload };
        case types.FETCH_CLIENT:
            console.log(action.payload)
            return { ...state, client: action.payload };
        case types.FETCH_CLIENT_ID:
            return { ...state, newClientId: action.payload };
        case types.CREATE_CLIENT:
            return state;
        case types.UPDATE_CLIENT:
            return {
                ...state,
                clients: state.clients.map(client => client._id === action.payload._id ? action.payload : client)
            };
        case types.DELETE_CLIENT:
            return {
                ...state,
                clients: state.clients.filter(client => client._id !== action.payload)
            };
        case types.CLIENT_ERROR:
            return { ...state, errors: action.payload };
        default:
            return state;
    }
} 