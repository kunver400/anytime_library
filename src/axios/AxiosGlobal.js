import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://anytime-lib.firebaseio.com/'
});

export default instance;