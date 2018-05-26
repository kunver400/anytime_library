import Axios from 'axios';
import store from '../redux/store';


const usermeta = {
    getIssuedBooks: () => {
        let user = store.getState().rootReducer.user;
        return new Promise((resolve, reject) => {
            let issuedBooks = null;
            Axios.get('/issues.json')
                .then(response => {
                    for (let key in response.data) {
                        if (response.data[key].ukey === user.key)
                            issuedBooks = response.data[key]['issued'];
                    }
                    resolve(issuedBooks);
                })
                .catch(response => {
                    console.log(response);
                    resolve('something went wrong.');
                })
        })
    }
};

export default usermeta;