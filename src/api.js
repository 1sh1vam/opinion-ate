import axios from 'axios';
import {API_KEY} from './config';

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/${API_KEY}`,
});

const api = {
  loadRestaurents() {
    return client.get('/restaurants').then(response => {
      console.log(response.data);
      return response.data;
    });
  },

  createRestaurent(name) {
    return client.post('/restaurants', {name}).then(response => response.data);
  },
};

export default api;
