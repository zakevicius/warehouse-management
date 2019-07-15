import { combineReducers } from 'redux';
import ordersReducer from '../reducers/ordersReducer';
import clientsReducer from '../reducers/clientsReducer';
import eventsReducer from '../reducers/eventsReducer';
import responsesReducer from '../reducers/responsesReducer';

export default combineReducers({
    ordersData: ordersReducer,
    clientsData: clientsReducer,
    eventsData: eventsReducer,
    responses: responsesReducer
});