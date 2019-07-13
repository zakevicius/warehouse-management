import * as type from '../action/types';

export default (state = { orders: [] }, action) => {
    switch (action.type) {
        case type.FETCH_ORDERS:
            return { ...state, orders: action.payload };
        default:
            return state;
    }
};