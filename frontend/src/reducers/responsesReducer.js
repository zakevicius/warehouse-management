import * as types from '../action/types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_CLIENT:
            return { ...state, apiResponse: action.payload }
        default:
            return state;
    }
}