import { combineReducers } from "redux";
import { reducer as form } from 'redux-form'
import auth from '../Auth/auth.reducer'
export default combineReducers({
    auth,
    form
});