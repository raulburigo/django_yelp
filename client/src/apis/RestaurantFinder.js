import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export default axios.create({
    baseURL: 'https://yelp-like-app.herokuapp.com/api/v1/restaurants/'
});
