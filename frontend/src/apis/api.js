import axios from 'axios';

const heroku = 'https://safe-fjord-78411.herokuapp.com';
const local = 'http://localhost:8000/api';

export default axios.create({
    baseURL: local
});