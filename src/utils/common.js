import moment from "moment";
import store from "../redux/store";
import ROOT_ACTIONS from "../redux/actions/root_actions";
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
    getSortedBooks: (books,sorter) => {
        let sortedBoooks = [...books];
        for(let i = 0;i<sortedBoooks.length;i++) {
            for(let j=i;j<sortedBoooks.length;j++) {
                if(sortedBoooks[i][sorter]<sortedBoooks[j][sorter]) {
                    let temp = sortedBoooks[i];
                    sortedBoooks[i] = sortedBoooks[j];
                    sortedBoooks[j] = temp;
                }
            }
        }
        return sortedBoooks;
    },
    formatDate: (date_string) => {
        let date = new moment(date_string);
        return date.format("MMM Do YY");
    },
    toggleSpinny: () => {
        store.dispatch({ type: ROOT_ACTIONS.TOGGLE_SPINNY });
    }
};

export default common;