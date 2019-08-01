import api from '../apis/api';
import { history } from '../components/history';
import * as types from './types';
import setAuthToken from '../utils/setAuthToken';

// LOGIN, LOGOUT, SIGNUP

export const login = (data) => async (dispatch) => {
    //Get user data after login
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        await api.get('/auth', config)
            .then((response) => {
                dispatch({ type: types.USER_LOADED, payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
            })
    };

    //Login user
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    await api.post('/auth', data, config)
        .then((response) => {
            dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
            loadUser();
        })
        .catch((err) => {
            console.log(err.response.data.msg);
            dispatch({ type: types.LOGIN_FAIL, payload: err.response.data.msg });
        })
};

export const logout = () => {
    history.push('/login');
    return { type: types.LOG_OUT };
}

// FETCHING ALL DATA

export const fetchData = (typeOfData) => async (dispatch) => {
    let requestType = setRequestType(typeOfData, 'fetchAll');
    await api.get(typeOfData)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
        })
        .catch((error) => {
            console.log(error.message)
            if (error.message === 'Network Error') {
                dispatch({ type: types.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        });
};


// FETCHING ONE RECORD OF DATA BY ID

export const fetchSingleData = (typeOfData, id) => async dispatch => {
    let requestType = setRequestType(typeOfData, 'fetchSingle');
    await api.get(`${typeOfData}/${id}`)
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

export const createData = (typeOfData, data) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'create');
    const errorType = setRequestType(typeOfData, 'error');
    await api.post(`${typeOfData}`, data)
        .then((response) => {
            dispatch({ type: requestType, payload: response.data });
            setTimeout(() => {
                history.push(typeOfData)
            }, 1000);
        })
        .catch(err => {
            dispatch({ type: errorType, payload: err.response.data.msg });
        })
}

// GETTING ID FOR NEW DATA

export const fetchNewID = (clientID) => async dispatch => {
    // Fetching last order's number
    await api.get('/orders')
        .then((response) => {
            if (response.data.length === 0) {
                dispatch({
                    type: types.NEW_ORDER_ID,
                    payload: 1
                });
            } else {
                console.log(response.data)
                const orders = response.data.filter(order => order.clientID === clientID);
                console.log(orders, clientID);
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
        })
        .catch((error) => {
            console.log(error.message)
            if (error.message === 'Network Error') {
                dispatch({ type: types.NETWORK_ERROR, payload: "Network error encountered. Contact your network administrator." });
            }
        });
}

// EVENT HANDLERS
export const setActiveTab = (tab) => {
    return {
        type: types.SET_ACTIVE_TAB,
        payload: tab
    };
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
    }
}

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
                case 'nextId':
                    return types.FETCH_ORDER_ID;
                case 'error':
                    return types.ORDER_ERROR;
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
                case 'nextId':
                    return types.FETCH_CLIENT_ID;
                case 'error':
                    return types.CLIENT_ERROR;
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
                case 'nextId':
                    return types.FETCH_LOADING_ID;
                default:
                    return null;
            };
        default:
            return null;
    }
}