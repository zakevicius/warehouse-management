import api from '../apis/api';
import { history } from '../components/history';
import * as types from './types';
import setAuthToken from '../utils/setAuthToken';

// LOGIN, LOGOUT, SIGNUP
export const login = (user) => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    //Get user data after login
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await api.get('/auth', config);
            dispatch({ type: types.USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
        }
    };

    //Login user
    try {
        setLoading();
        const res = await api.post('/auth', user, config);
        dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
        loadUser();
        unsetLoading();
    } catch (err) {
        console.log(err);
        dispatch({ type: types.AUTH_ERROR, payload: err });
    }
};

export const logout = () => {
    history.push('/login');
    return { type: types.LOG_OUT };
}

// FETCHING ALL DATA
export const fetchData = (typeOfData) => async (dispatch) => {
    let requestType = setRequestType(typeOfData, 'fetchAll');

    try {
        setLoading();
        const res = await api.get(typeOfData);
        dispatch({ type: requestType, payload: res.data });
        unsetLoading();
    } catch (err) {
        dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    }
};

// FETCHING ONE RECORD OF DATA BY ID
export const fetchSingleData = (typeOfData, id) => async dispatch => {
    let requestType = setRequestType(typeOfData, 'fetchSingle');

    try {

        const res = await api.get(`${typeOfData}/${id}`);
        dispatch({ type: requestType, payload: res.data });

    } catch (err) {
        dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    }
}

// CREATING NEW DATA
export const createData = (typeOfData, data) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'create');
    const errorType = setRequestType(typeOfData, 'error');

    try {

        const res = await api.post(`${typeOfData}`, data);
        dispatch({ type: requestType, payload: res.data });


        setTimeout(() => {
            history.push(`${typeOfData}/page/1`);
        }, 1000);
    } catch (err) {
        dispatch({ type: errorType, payload: err.response.data.msg });
    }
}

// GETTING ID FOR NEW DATA
export const fetchNewID = (clientID) => async dispatch => {
    // Fetching last order's number
    try {
        const res = await api.get('/orders');
        if (res.data.length === 0) {
            dispatch({
                type: types.NEW_ORDER_ID,
                payload: 1
            });
        } else {
            const orders = res.data.filter(order => order.clientID === clientID);
            let result = {};
            if (orders.length !== 0) {
                // if there are already orders for this client take last orders number ant increase value by 1
                // result = (orders[0].orderID.slice(1)) + 1;
                result = parseInt(orders.map(order => order.orderID.slice(1)).sort((a, b) => a - b).slice(-1)) + 1;
                dispatch({
                    type: types.NEW_ORDER_ID,
                    payload: result
                });
            } else {
                // if there are no orders for this client return number 1
                dispatch({
                    type: types.NEW_ORDER_ID,
                    payload: 1
                });
            }
        }

    } catch (err) {
        dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    }
}

// UPDATING DATA
export const updateData = (typeOfData, data, id) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'update');

    try {

        const res = await api.put(`${typeOfData}/${id}`, data);
        dispatch({ type: requestType, payload: res.data });


        setTimeout(() => {
            history.push(`${typeOfData}/page/1`);
        }, 1000);
    } catch (err) {
        dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    }
}

// DELETING DATA
export const removeData = (typeOfData, id) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'remove');

    try {

        const res = await api.delete(`${typeOfData}/${id}`);
        dispatch({ type: requestType, payload: res.data });

        setTimeout(() => {
            history.push(`${typeOfData}/page/1`);
        }, 1000);
    } catch (err) {
        dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    }
}

// EVENT HANDLERS
export const setActiveTab = (tab) => {
    return {
        type: types.SET_ACTIVE_TAB,
        payload: tab
    };
};

export const setLoading = () => dispatch => {
    dispatch({ type: types.SET_LOADING });
};

export const unsetLoading = () => dispatch => {
    dispatch({ type: types.UNSET_LOADING });
};

// ERRORS HANDLER
export const setError = (msg, type) => {
    const newType = setErrorType(type);
    return {
        type: newType,
        payload: msg
    };
};


// PRIVATE FUNCTIONS

const setErrorType = type => {
    switch (type) {
        case 'AUTH':
            return types.AUTH_ERROR;
        default:
            return null;
    };
};

const setRequestType = (typeOfData, requestType) => {
    switch (typeOfData) {
        case '/orders':
            switch (requestType) {
                case 'fetchAll':
                    return types.FETCH_ORDERS;
                case 'fetchSingle':
                    return types.FETCH_ORDER;
                case 'create':
                    return types.CREATE_ORDER;
                case 'error':
                    return types.ORDER_ERROR;
                case 'remove':
                    return types.DELETE_ORDER;
                case 'update':
                    return types.UPDATE_ORDER;
                default:
                    return null;
            }
        case '/clients':
            switch (requestType) {
                case 'fetchAll':
                    return types.FETCH_CLIENTS;
                case 'fetchSingle':
                    return types.FETCH_CLIENT;
                case 'create':
                    return types.CREATE_CLIENT;
                case 'error':
                    return types.CLIENT_ERROR;
                case 'remove':
                    return types.DELETE_CLIENT;
                case 'update':
                    return types.UPDATE_CLIENT;
                default:
                    return null;
            }
        case '/loadings':
            switch (requestType) {
                case 'fetchAll':
                    return types.FETCH_LOADINGS;
                case 'fetchSingle':
                    return types.FETCH_LOADING;
                case 'create':
                    return types.CREATE_LOADING;
                case 'remove':
                    return types.DELETE_LOADING;
                case 'update':
                    return types.UPDATE_LOADING;
                default:
                    return null;
            };
        default:
            return null;
    }
}