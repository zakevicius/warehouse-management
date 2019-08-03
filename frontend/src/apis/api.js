import axios from 'axios';

const heroku = 'https://logway1-back.herokuapp.com/api/';
const local = 'http://localhost:8000/api';

export default axios.create({
    baseURL: heroku
});