
import ROOT_ACTIONS from '../actions/root_actions';

const initState = {
    loginVisible: false,
    user: {
        "email": "usdi@ss.com",
        "nickname": "nickfanchuli",
        "password": "qwe",
        "phone": "+864234234234",
        "residence": ["zhejiang", "hangzhou", "xihu"],
        "website": "bobo.bo",
        "isAdmin": true
      }
}
const rootReducer = (state=initState, action) => {
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
        default:{
            return state
        }
    }
}
export default rootReducer