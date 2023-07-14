const axios = require('axios');

function makeTestRequest() {
  // define access parameters
  const accessToken = process.env.SPHERE_ENGINE_ACCESS_TOKEN;
  const endpoint = process.env.SPHERE_ENGINE_ENDPOINT;

  // send request
  axios.get(`https://${endpoint}/api/v4/test?access_token=${accessToken}`)
    .then(response => {
      console.log(response.data.message); // test message in JSON
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Invalid access token');
        }
      } else {
        console.log(error);
        console.log('Connection problem');
      }
    });
}

module.exports = makeTestRequest;