import * as type from '../action/types';

export default (state = { orders: [] }, action) => {
    switch (action.type) {
        case type.FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case type.FETCH_ORDER:
            return { ...state, order: action.payload };
        case type.NETWORK_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};