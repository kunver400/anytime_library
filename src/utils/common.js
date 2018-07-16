import moment from 'moment';
import store from '../redux/store';
import ROOT_ACTIONS from '../redux/actions/root_actions';
const common = {
    formatBooks: (data) => {
        let books = [];
        for (let key in data) {
            books.push({
                ...data[key],
                key: key
            });
        }
        return books;
    },
    formatDate: (date_string) => {
        let date = new moment(date_string);
        return date.format("MMM Do YY");
    },
    toggleSpinny: () => {
        store.dispatch({ type: ROOT_ACTIONS.TOGGLE_SPINNY});
    }
}

export default common;