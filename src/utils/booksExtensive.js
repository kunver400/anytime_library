import Axios from "axios";
import store from "../redux/store";
const booksExtensive = {
    updateFame: (issue_s) => {
        let issuedBooks = store.getState().bookReducer.allBooks;
        issuedBooks = issuedBooks.filter(book => {
            if (issue_s.findIndex(issue => issue.bkey === book.key) !== -1)
                return true;
            else return false;
        })
            .map((book, index) => {
                return {
                    ...book,
                    times_issued: book.times_issued + issue_s[index].units
                };
            });
        EditBooks(issuedBooks);
    },
    getMaxFame: () => {
        let max_issued = store.getState().bookReducer.max_issued;
        return max_issued;
    }

};

const EditBooks = (books) => {
    let newbook = {};
    let data = books.shift();
    newbook[data.key] = {
        title: data.title,
        author: data.author,
        desc: data.desc,
        availablity: data.availablity,
        date_added: data.date_added,
        times_issued: data.times_issued,
        cover: data.cover
    };
    Axios.patch("books.json", newbook)
        .then(() => {
            if(books.length>0)
                EditBooks(books);
        })
        .catch((error)=>{
            console.log("something went wrong",error);
        });
};

export default booksExtensive; 