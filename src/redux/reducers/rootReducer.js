
import ROOT_ACTIONS from '../actions/root_actions';

const initState = {
    loginVisible: false
}
const rootReducer = (state=initState, action) => {
    switch (action.type) {
        case ROOT_ACTIONS.TOGGLE_LOGIN_MODAL:
        return {
            ...state,
            loginVisible: action.visible
        }
        default:{
            return state
        }
    }
}
export default rootReducer