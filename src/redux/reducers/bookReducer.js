
import BOOK_ACTIONS from '../actions/book_actions';

const initState = {
    issueModalVisible: false,
    deleteModalVisible: false,
    currentBook: null,
    currentBooks: []
}
const bookReducer = (state=initState, action) => {
    switch (action.type) {
        case BOOK_ACTIONS.ISSUE_BOOK:
        return {
            ...state,
            currentBook: !state.issueModalVisible?action.book:null,
            issueModalVisible: !state.issueModalVisible,
            currentBooks: []
        }
        case BOOK_ACTIONS.ISSUE_BOOKS:
        return {
            ...state,
            currentBooks: !state.issueModalVisible?action.books:[],
            issueModalVisible: !state.issueModalVisible,
            currentBook: null
        }
        case BOOK_ACTIONS.TOGGLE_ISSUE_MODAL:
        return {
            ...state,
            issueModalVisible: !state.issueModalVisible,
        }
        case BOOK_ACTIONS.DELETE_BOOKS:
        return {
            ...state,
            currentBooks: !state.deleteModalVisible?action.books:[],
            deleteModalVisible: !state.deleteModalVisible
        }
        case BOOK_ACTIONS.TOGGLE_DELETE_MODAL:
        return {
            ...state,
            deleteModalVisible: !state.deleteModalVisible
        }
        default:{
            return state
        }
    }
}
export default bookReducer;