import api from '../apis/api';
import { createBrowserHistory } from 'history';
import * as types from './types';


// FETCHING ALL DATA

export const fetchData = (data) => async (dispatch) => {
    let requestType = setRequestType(data, 'fetchAll');
    console.log(requestType);
    await api.get(data)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
        })
        .catch((error) => {
            if (error.message === 'Network Error') {
                dispatch({ type: types.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        });
};


// FETCHING ONE RECORD OF DATA BY ID

export const fetchSingleData = (data, id) => async dispatch => {
    let requestType = setRequestType(data, 'fetchSingle');
    await api.get(`${data}/${id}`)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
        })
        .catch((error) => {
            if (error.message === 'Network Error') {
                dispatch({ type: types.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        });

}


// CREATING NEW DATA

export const createData = data => async dispatch => {
    let requestType = setRequestType(data, 'create');
    await api.post(`${data}`)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
        })
        .catch(error => {
            if (error.message === 'Network Error') {
                dispatch({ type: types.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        })

}


// GETTING ID FOR NEW DATA

export const fetchNewId = data => async dispatch => {

}



// EVENT HANDLERS
export const setActiveTab = (tab) => {
    return {
        type: types.SET_ACTIVE_TAB,
        payload: tab
    };
};


// PRIVATE FUNCTIONS

function setRequestType(data, type) {
    switch (data) {
        case '/orders':
            switch (type) {
                case 'fetchAll':
                    return types.FETCH_ORDERS;
                case 'fetchSingle':
                    return types.FETCH_ORDER;
                case 'create':
                    return types.CREATE_ORDER;
                case 'nextId':
                    return types.FETCH_ORDER_ID;
                default:
                    return null;
            }
        case '/clients':
            switch (type) {
                case 'fetchAll':
                    return types.FETCH_CLIENTS;
                case 'fetchSingle':
                    return types.FETCH_CLIENT;
                case 'create':
                    return types.CREATE_CLIENT;
                case 'nextId':
                    return types.FETCH_CLIENT_ID;
                default:
                    return null;
            }
        default:
            return null;
    }
}