import { combineReducers } from 'redux';

import ROOT_ACTIONS from '../actions/root_actions';
import bookReducer from './bookReducer';


const initState = {
    collapsed: window.innerWidth < 992,
    loginVisible: false,
    user: {
        "email": "usdi@ss.com",
        "isAdmin": true,
        "nickname": "nickfanchuli",
        "password": "qwe",
        "phone": "+864234234234",
        "residence": ["zhejiang", "hangzhou", "xihu"],
        "website": "bobo.bo",
        "key": "-LCSPcllpbb2ciD4L8Tm"
    }
}
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case ROOT_ACTIONS.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                loginVisible: action.visible
            }
        case ROOT_ACTIONS.LOG_USER_IN:
            return {
                ...state,
                user: action.user
            }
        case ROOT_ACTIONS.LOG_USER_OUT:
            return {
                ...state,
                user: null
            }
        case ROOT_ACTIONS.TOGGLE_SIDER:
            return {
                ...state,
                collapsed: !state.collapsed
            }
        default: {
            return state
        }
    }
}


export default combineReducers({
    rootReducer,
    bookReducer
})