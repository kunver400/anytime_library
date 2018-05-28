
import BOOK_ACTIONS from '../actions/book_actions';

const initState = {
    issueModalVisible: false,
    currentBook: null,
    currentBooks: null
}
const bookReducer = (state=initState, action) => {
    switch (action.type) {
        case BOOK_ACTIONS.ISSUE_BOOK:
        return {
            ...state,
            currentBook: !state.issueModalVisible?action.book:null,
            issueModalVisible: !state.issueModalVisible,
            currentBooks: null
        }
        case BOOK_ACTIONS.ISSUE_BOOKS:
        return {
            ...state,
            currentBooks: !state.issueModalVisible?action.books:null,
            issueModalVisible: !state.issueModalVisible,
            currentBook: null
        }
        default:{
            return state
        }
    }
}
export default bookReducer;