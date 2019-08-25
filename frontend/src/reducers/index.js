import { combineReducers } from 'redux';
import ordersReducer from './ordersReducer';
import clientsReducer from './clientsReducer';
import eventsReducer from './eventsReducer';
import loadingsReducer from './loadingsReducer';
import authReducer from './authReducer';
import filesReducer from './filesReducer';

export default combineReducers(
    {
        ordersData: ordersReducer,
        clientsData: clientsReducer,
        eventsData: eventsReducer,
        loadingsData: loadingsReducer,
        auth: authReducer,
        filesData: filesReducer
    }
);