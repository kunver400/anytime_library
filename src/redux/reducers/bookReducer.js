
import BOOK_ACTIONS from '../actions/book_actions';

const initState = {
    issueModalVisible: false,
    currentBook: null
}
const bookReducer = (state=initState, action) => {
    switch (action.type) {
        case BOOK_ACTIONS.TOGGLE_ISSUE_MODAL:
        return {
            ...state,
            currentBook: !state.issueModalVisible?action.book:null,
            issueModalVisible: !state.issueModalVisible
        }
        default:{
            return state
        }
    }
}
export default bookReducer;