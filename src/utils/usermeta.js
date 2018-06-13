import Axios from 'axios';
import store from '../redux/store';
import BOOK_ACTIONS from '../redux/actions/book_actions';


const usermeta = {
    getIssuedBooks: () => {
        let user = store.getState().rootReducer.user;
        return new Promise((resolve, reject) => {
            let issuedBooks = null,thisKey = null;
            Axios.get('/issues.json')
                .then(response => {
                    for (let key in response.data) {
                        if (response.data[key].ukey === user.key)
                        {
                            issuedBooks = response.data[key]['issued'];
                            thisKey = key;
                        }
                    }
                    store.dispatch({ type: BOOK_ACTIONS.SET_ISSUE_KEY,issueKey: thisKey});
                    resolve({issuedBooks: issuedBooks, key: thisKey});
                })
                .catch(response => {
                    console.log(response);
                    resolve('something went wrong.');
                })
        })
    }
};

export default usermeta;