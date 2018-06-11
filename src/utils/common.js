import moment from 'moment';
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
    }
}

export default common;