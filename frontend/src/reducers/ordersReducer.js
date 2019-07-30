import * as types from '../action/types';

export default (state = { orders: [] }, action) => {
    switch (action.type) {
        case types.NEW_ORDER_ID:
            console.log(action.payload);
            return { ...state, newOrderID: action.payload };
        case types.FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case types.FETCH_ORDER:
            return { ...state, order: action.payload };
        case types.FETCH_ORDER_ID:
            return { ...state, newOrderId: action.payload };
        case types.NETWORK_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};