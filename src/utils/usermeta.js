import Axios from "axios";
import store from "../redux/store";
import BOOK_ACTIONS from "../redux/actions/book_actions";
import ROOT_ACTIONS from "../redux/actions/root_actions";

const usermeta = {
    getIssuedBooks: () => {
        let user = store.getState().rootReducer.user;
        return new Promise((resolve) => {
            let issuedBooks = null, thisKey = null;
            Axios.get("/issues.json")
                .then(response => {
                    for (let key in response.data) {
                        if (response.data[key].ukey === user.key) {
                            issuedBooks = response.data[key]["issued"];
                            thisKey = key;
                        }
                    }
                    store.dispatch({ type: BOOK_ACTIONS.SET_ISSUE_KEY, issueKey: thisKey });
                    resolve({ issuedBooks: issuedBooks, key: thisKey });
                })
                .catch(response => {
                    console.log(response);
                    resolve("something went wrong.");
                });
        });
    },
    subscribeAuthor: (author) => {
        return new Promise((resolve, reject) => {
            let user = store.getState().rootReducer.user;
            let newUsers = {};
            if (user.subs && user.subs.length > 0) {
                if (user.subs.indexOf(author) === -1) {
                    user.subs.push(author);
                }
                else reject("already subbed");
            }
            else {
                user["subs"] = [author];
            }
            newUsers[user.key] = user;
            Axios.patch("user.json", newUsers)
                .then(() => {
                    store.dispatch({ type: ROOT_ACTIONS.UPDATE_USER, user: user });
                    resolve(true);
                })
                .catch((error) => {
                    console.log("something went wrong", error);
                });
        });
    },
    unsubscribeAuthor: (author) => {
        return new Promise((resolve) => {
            let user = store.getState().rootReducer.user;
            let newUsers = {};
            if (user.subs && user.subs.length > 0 && user.subs.indexOf(author) !== -1) {
                user.subs.splice(user.subs.indexOf(author), 1);
            }
            else return false;
            newUsers[user.key] = user;
            Axios.patch("user.json", newUsers)
                .then(() => {
                    store.dispatch({ type: ROOT_ACTIONS.UPDATE_USER, user: user });
                    resolve(true);
                })
                .catch((error) => {
                    console.log("something went wrong", error);
                });
        });

    }
};

export default usermeta;