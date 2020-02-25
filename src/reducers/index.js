import { combineReducers } from 'redux';
import app from './appreducer';
import { animelist, mangalist } from './listReducers';

export default combineReducers({
    app,
    animelist,
    mangalist,
});