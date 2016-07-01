import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

function todos(state = [], action) {
    return state;
}

export default combineReducers({
    todos,
    routing
});


