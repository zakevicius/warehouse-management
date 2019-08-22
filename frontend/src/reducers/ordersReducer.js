import {
    NEW_ORDER_ID,
    FETCH_ORDERS,
    FETCH_ORDER,
    ORDER_ERROR
} from '../action/types';

export default (state = { orders: [] }, action) => {
    switch (action.type) {
        case NEW_ORDER_ID:
            return { ...state, newOrderID: action.payload };
        case FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case FETCH_ORDER:
            return { ...state, order: action.payload };
        case ORDER_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};