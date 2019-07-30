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

        await api.get('/api/auth', config)
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
    await api.post('/api/auth', data, config)
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

export const fetchData = (data) => async (dispatch) => {
    let requestType = setRequestType(data, 'fetchAll');
    await api.get(data)
        .then((response) => {
            console.log(response)
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
            setTimeout(() => {
                history.push(data)
            }, 1000);
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

const setRequestType = (data, type) => {
    switch (data) {
        case '/api/orders':
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
        case '/api/clients':
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
        case '/api/loadings':
            switch (type) {
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