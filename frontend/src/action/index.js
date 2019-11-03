import api from '../apis/api';
import { history } from '../components/history';
import * as types from './types';
import setAuthToken from '../utils/setAuthToken';
import { request } from 'http';

// LOGIN, LOGOUT, SIGNUP, REGISTER
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
            dispatch({ type: types.UNSET_LOADING });
        } catch (err) {
            let message = err.response ? err.response.data.msg : err.message;
            dispatch({ type: types.AUTH_ERROR, payload: message });
            dispatch({ type: types.UNSET_LOADING });
        }
    };

    //Login user
    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.post('/auth', user, config);
        dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
        loadUser();
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        dispatch({ type: types.AUTH_ERROR, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
};

export const logout = () => {
    history.push('/login');
    return { type: types.LOG_OUT };
}

export const register = data => async dispatch => {
    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.post('/users', data);
        dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.msg });
        setTimeout(() => {
            history.goBack();
        }, 2000);
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        dispatch({ type: types.REGISTER_FAIL, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// FETCHING ALL DATA
export const fetchData = (typeOfData, id = null) => async (dispatch) => {
    let requestType = setRequestType(typeOfData, 'fetchAll');

    try {
        let res;
        if (typeOfData === '/files') {
            dispatch({ type: types.FILE_SET_LOADING });
            res = await api.get(`${typeOfData}/${id}`);
            dispatch({ type: types.FILE_UNSET_LOADING });
        } else {
            dispatch({ type: types.SET_LOADING });
            res = await api.get(typeOfData);
            dispatch({ type: types.UNSET_LOADING });
        }
        dispatch({ type: requestType, payload: res.data });

    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType(typeOfData, 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
};

// FETCHING DATA BY STATUS
export const fetchDataByStatus = (status, list, id) => async (dispatch) => {
    dispatch({ type: types.SET_LOADING });
    try {
        let res, finalRes;
        if (!list) {
            res = await api.get('/orders');
            finalRes = res.data.filter(order => order.status === status);
            dispatch({ type: types.FETCH_ORDERS_BY_STATUS, payload: finalRes });
        } else {
            switch (list) {
                case '/clients':
                    res = await api.get(`/clients/${id}`);
                    finalRes = res.data.orders.filter(order => order.status === status);
                    dispatch({ type: types.FETCH_CLIENT_ORDERS_BY_STATUS, payload: finalRes });
                    break;
                default:
                    break;
            }
        }
        dispatch({ type: types.UNSET_LOADING });

    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType('/orders', 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
};

// FETCHING ONE RECORD OF DATA BY ID
export const fetchSingleData = (typeOfData, id) => async dispatch => {
    let requestType = setRequestType(typeOfData, 'fetchSingle');

    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.get(`${typeOfData}/${id}`);
        dispatch({ type: requestType, payload: res.data });
        dispatch({ type: types.UNSET_LOADING });
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType(typeOfData, 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// CREATING NEW DATA
export const createData = (typeOfData, data) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'create');

    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.post(`${typeOfData}`, data);
        dispatch({ type: requestType, payload: res.data });
        setTimeout(() => {
            history.push(`${typeOfData}/page/1`);
        }, 500);
        dispatch({ type: types.UNSET_LOADING });
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType(typeOfData, 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// GETTING ID FOR NEW DATA
export const fetchNewID = (clientID, type) => async dispatch => {
    const requestType = setRequestType(type, 'newID');
    try {
        dispatch({ type: types.SET_LOADING });
        const client = await api.get(`/clients/${clientID}`);
        const res = await api.get(type);
        if (res.data.length === 0) {
            dispatch({
                type: requestType,
                payload: 1
            });
        } else {
            let data;
            switch (type) {
                case '/orders':
                    data = res.data.filter(item => (item.clientID === clientID && item.orderID.replace(/[0-9]/g, "") === client.data.data.orderLetter));
                    break;
                case '/loadings':
                    data = res.data.filter(item => (item.clientID === clientID && item.loadingID.slice(3, 3 + client.data.data.orderLetter.length) === client.data.data.orderLetter));
                    break;
                default:
                    break;
            }

            let arr, result;
            if (data.length !== 0) {

                // if there are already orders/loadings for this client take last id ant increase value by 1
                switch (type) {
                    case '/orders':
                        arr = data.filter(d => d.orderID.slice(0, client.data.data.orderLetter.length) === client.data.data.orderLetter).map(item => item.orderID.slice(client.data.data.orderLetter.length));
                        break;
                    case '/loadings':
                        arr = data.map(item => item.loadingID.slice(client.data.data.orderLetter.length + 3));
                        break;
                    default:
                        return null;
                };
                result = parseInt(arr.sort((a, b) => a - b).slice(-1)) + 1;
                dispatch({
                    type: requestType,
                    payload: result
                });
            } else {
                // if there are no orders for this client return number 1
                dispatch({
                    type: requestType,
                    payload: 1
                });
            }
        }
        dispatch({ type: types.UNSET_LOADING });
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType(type, 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// UPDATING DATA
export const updateData = (typeOfData, data, id, stayOnPage) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'update');

    try {
        const res = await api.put(`${typeOfData}/${id}`, data);
        dispatch({ type: requestType, payload: res.data });

        if (!stayOnPage) {
            setTimeout(() => {
                history.push(`${typeOfData}/${id}${typeOfData === '/clients' ? '/page/1' : ""}`);
            }, 1000);
        }
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType(typeOfData, 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// DELETING DATA
export const removeData = (typeOfData, id) => async dispatch => {
    const requestType = setRequestType(typeOfData, 'remove');

    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.delete(`${typeOfData}/${id}`);
        dispatch({ type: requestType, payload: res.data });
        if (typeOfData !== '/files') {
            setTimeout(() => {
                history.push(`${typeOfData}/page/1`);
            }, 500);
        } else {
            dispatch({ type: types.UNSET_LOADING });
        }
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        let errorType = setErrorType(typeOfData, 'set');
        dispatch({ type: errorType, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// FILTER
export const filterOrders = text => dispatch => {
    dispatch({ type: types.FILTER_ORDERS, payload: text });
}

export const clearFilter = () => dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
}

// SORTING 
export const sortTable = (type, sortType, data, info) => dispatch => {
    let sortedOrders;

    const sortData = (info, column, sortType) => {
        const sortedData = info.sort((a, b) => {
            let numA = parseInt(a[column].replace(/\D/g, ""));
            let numB = parseInt(b[column].replace(/\D/g, ""));
            let letA = a[column].replace(/[0-9]/g, "");
            let letB = b[column].replace(/[0-9]/g, "");

            switch (sortType) {
                case 'ASC':
                    if (letA > letB) { return 1 }
                    else if (letA === letB) {
                        if (numA > numB) { return 1 }
                        else { return -1 }
                    }
                    else { return -1 };
                default:
                    if (letA < letB) { return 1 }
                    else if (letA === letB) {
                        if (numA < numB) { return 1 }
                        else { return -1 }
                    }
                    else { return -1 }
            }
        });
        return sortedData;
    }

    switch (type) {
        case 'orders':
            if (!info) break;
            switch (data) {
                case 'Order':
                    sortedOrders = sortData(info, 'orderID', sortType);
                    break;
                case 'Additional ID':
                    sortedOrders = sortData(info, 'additionalID', sortType);
                    break;
                case 'Date':
                    sortedOrders = sortData(info, 'date', sortType);
                    break;
                case 'Sender':
                    sortedOrders = sortData(info, 'sender', sortType);
                    break;
                case 'Receiver':
                    sortedOrders = sortData(info, 'receiver', sortType);
                    break;
                case 'Truck':
                    sortedOrders = sortData(info, 'truck', sortType);
                    break;
                case 'Trailer':
                    sortedOrders = sortData(info, 'trailer', sortType);
                    break;
                default:
                    break;
            };
            break;
        default:
            break;
    }

    if (sortedOrders) {
        dispatch({ type: types.SORT_ORDERS, payload: sortedOrders });
    }
}

// FILES

export const uploadFiles = (files, id) => async dispatch => {
    const config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    };
    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.post(`/files/${id}`, files, config);
        dispatch({ type: types.UPLOAD_FILES, payload: res.data });
        dispatch({ type: types.UNSET_LOADING });
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        dispatch({ type: types.FILE_ERROR, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

export const addFileToUploadList = (file) => {
    return {
        type: types.ADD_FILE,
        payload: file
    };
};

export const removeFileFromUploadList = (file) => {
    return {
        type: types.REMOVE_FILE,
        payload: file
    };
};

export const clearFiles = () => {
    return {
        type: types.CLEAR_FILES
    }
}

export const downloadFile = (id, filename) => async dispatch => {
    try {
        dispatch({ type: types.SET_LOADING });
        const res = await api.get(`/files/download/${id}`);

        // const file = new Blob([res.data]);
        // const fileURL = URL.createObjectURL(file);   
        const link = document.createElement('a');

        link.href = res.data;
        link.target = '_blank';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        // URL.revokeObjectURL(file);
        dispatch({ type: types.DOWNLOAD_FILE, payload: res.data });
        dispatch({ type: types.UNSET_LOADING });
    } catch (err) {
        let message = err.response ? err.response.data.msg : err.message;
        dispatch({ type: types.FILE_ERROR, payload: message });
        dispatch({ type: types.UNSET_LOADING });
    }
}

// EVENT HANDLERS

export const setActiveTab = (type, tab) => {
    const requestType = setRequestType('tab', type)
    return {
        type: requestType,
        payload: tab
    };
};

export const showModal = () => {
    return {
        type: types.SHOW_MODAL,
        payload: true
    }
}

export const hideModal = () => {
    return {
        type: types.HIDE_MODAL,
        payload: false
    }
}

export const clearState = () => ({ type: types.CLEAR_STATE });

// ERRORS HANDLER

export const setError = (msg, type) => {
    const newType = setErrorType(type, 'set');
    return {
        type: newType,
        payload: msg
    };
};

export const clearError = (type) => {
    const newType = setErrorType(type, 'clear')
    return {
        type: newType
    }
}


// PRIVATE FUNCTIONS

const setErrorType = (type, action) => {
    switch (action) {
        case 'set':
            switch (type) {
                case '/files':
                    return types.FILE_ERROR;
                case '/orders':
                    return types.ORDER_ERROR;
                case '/loadings':
                    return types.LOADING_ERROR;
                case '/clients':
                    return types.CLIENT_ERROR;
                default:
                    return null;
            };
        case 'clear':
            switch (type) {
                case '/files':
                    return types.CLEAR_FILE_ERROR;
                case '/orders':
                    return types.CLEAR_ORDER_ERROR;
                case '/loadings':
                    return types.CLEAR_LOADING_ERROR;
                case '/clients':
                    return types.CLEAR_CLIENT_ERROR;
                default:
                    return null;
            };
        default:
            return null;
    }

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
                case 'newID':
                    return types.NEW_ORDER_ID;
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
                case 'newID':
                    return types.NEW_LOADING_ID;
                default:
                    return null;
            };
        case 'tab':
            switch (requestType) {
                case 'primary':
                    return types.SET_ACTIVE_TAB;
                case 'secondary':
                    return types.SET_ACTIVE_SUB_TAB;
                default:
                    return null;
            };
        case '/files':
            switch (requestType) {
                case 'fetchAll':
                    return types.FETCH_FILES;
                case 'remove':
                    return types.DELETE_FILE;
                default:
                    return null;
            }
        default:
            return null;
    }
}