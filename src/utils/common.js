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
        let date = new Date(date_string);
        return date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear();
    }
}

export default common;