import {
    FETCH_CLIENTS,
    FETCH_CLIENT,
    CREATE_CLIENT,
    UPDATE_CLIENT,
    DELETE_CLIENT,
    CLIENT_ERROR
} from '../action/types';

export default (state = { clients: [] }, action) => {
    switch (action.type) {
        case FETCH_CLIENTS:
            return { ...state, clients: action.payload };
        case FETCH_CLIENT:
            return { ...state, client: action.payload };
        case CREATE_CLIENT:
            return state;
        case UPDATE_CLIENT:
            return {
                ...state,
                clients: state.clients.map(client => client._id === action.payload._id ? action.payload : client)
            };
        case DELETE_CLIENT:
            return {
                ...state,
                clients: state.clients.filter(client => client._id !== action.payload)
            };
        case CLIENT_ERROR:
            return { ...state, errors: action.payload };
        default:
            return state;
    }
} 