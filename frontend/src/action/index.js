import api from '../apis/api';
import { createBrowserHistory } from 'history';
import * as type from './types';

export const fetchData = (data) => async (dispatch) => {
    let requestType;
    if (data === '/orders') {
        requestType = type.FETCH_ORDERS;
    } else if (data === '/clients') {
        requestType = type.FETCH_CLIENTS;
    }
    await api.get(data)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
        })
        .catch((error) => {
            if (error.message === 'Network Error') {
                dispatch({ type: type.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        });
};

export const fetchSingleData = (data, id) => async dispatch => {
    let requestType;
    if (data === '/order') {
        requestType = type.FETCH_ORDER;
    } else if (data === '/client') {
        requestType = type.FETCH_CLIENT;
    }
    await api.get(`${data}/${id}`)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
        })
        .catch((error) => {
            if (error.message === 'Network Error') {
                dispatch({ type: type.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        });

}

// Event handlers
export const setActiveTab = (tab) => {
    return {
        type: type.SET_ACTIVE_TAB,
        payload: tab
    };
};
