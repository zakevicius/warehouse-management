import { combineReducers } from 'redux';
import ordersReducer from './ordersReducer';
import clientsReducer from './clientsReducer';
import eventsReducer from './eventsReducer';
import responsesReducer from './responsesReducer';
import loadingsReducer from './loadingsReducer';
import authReducer from './authReducer';

export default combineReducers(
    {
        ordersData: ordersReducer,
        clientsData: clientsReducer,
        eventsData: eventsReducer,
        loadingsData: loadingsReducer,
        responses: responsesReducer,
        auth: authReducer
    }
);