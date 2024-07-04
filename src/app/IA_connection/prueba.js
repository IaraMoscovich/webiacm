const axios = require('axios');

const render = 'fastapi-example-endl.onrender.com'; 

axios.get(`http://${render}`)
  .then(response => {
    console.log('Response data:', response.data);
  })
  .catch(error => {
    console.eror('Error:', error.message);
  });