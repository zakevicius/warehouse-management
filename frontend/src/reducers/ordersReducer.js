import {
    NEW_ORDER_ID,
    FETCH_ORDERS,
    FETCH_ORDER,
    ORDER_ERROR,
    FILTER_ORDERS,
    CLEAR_FILTER,
    CLEAR_STATE,
    SORT_ORDERS,
    CLEAR_SORT_ORDERS,
    CLEAR_ORDER_ERROR,
    FETCH_ORDERS_BY_STATUS,
    UPDATE_ORDER
} from '../action/types';

export default (state = { orders: [] }, action) => {
    switch (action.type) {
        case NEW_ORDER_ID:
            return { ...state, newOrderID: action.payload };
        case FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case FETCH_ORDERS_BY_STATUS:
            return { ...state, orders: action.payload };
        case FETCH_ORDER:
            return { ...state, order: action.payload };
        case FILTER_ORDERS:
            return {
                ...state,
                filtered: state.orders.filter(order => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return order.sender.match(regex) ||
                        order.receiver.match(regex) ||
                        order.orderID.match(regex) ||
                        order.additionalID.match(regex) ||
                        order.truck.match(regex) ||
                        order.trailer.match(regex) ||
                        order.date.match(regex)
                })
            };
        case CLEAR_FILTER:
            return { ...state, filtered: null };
        case SORT_ORDERS:
            return { ...state };
        case CLEAR_SORT_ORDERS:
            return { ...state, order: null };
        case ORDER_ERROR:
            return { ...state, error: action.payload };
        case CLEAR_ORDER_ERROR:
            return { ...state, error: null };
        case CLEAR_STATE:
            return { ...state, order: null };
        default:
            return state;
    }
};