import api from '../apis/api';
import { createBrowserHistory } from 'history';
import * as type from './types';

export const fetchData = (data) => async dispatch => {
    const response = await api.get(data);
    let requestType;
    if (data === '/orders') {
        requestType = type.FETCH_ORDERS;
    } else if (data === '/clients') {
        requestType = type.FETCH_CLIENTS;
    }
    dispatch({ type: requestType, payload: response.data });
};

// Event handlers
export const setActiveTab = (tab) => {
    return {
        type: type.SET_ACTIVE_TAB,
        payload: tab
    };
};
