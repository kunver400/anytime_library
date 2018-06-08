
import BOOK_ACTIONS from '../actions/book_actions';

const initState = {
    allBooks: [],
    issueModalVisible: false,
    deleteModalVisible: false,
    currentBook: null,
    currentBooks: []
}
const bookReducer = (state=initState, action) => {
    switch (action.type) {
        case BOOK_ACTIONS.SET_BOOKS:
        return {
            ...state,
            allBooks: action.books,
            currentBook: action.books[0]
        }
        case BOOK_ACTIONS.SET_CURRENT_BOOK:
        return {
            ...state,
            currentBook: action.book
        }
        case BOOK_ACTIONS.ISSUE_BOOK:
        let newState = {
            ...state,
            issueModalVisible: !state.issueModalVisible,
            currentBooks: []
        }
        if(action.book) newState['currentBook'] = action.book
        return newState
        case BOOK_ACTIONS.ISSUE_BOOKS:
        return {
            ...state,
            currentBooks: !state.issueModalVisible?action.books:[],
            issueModalVisible: !state.issueModalVisible,
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