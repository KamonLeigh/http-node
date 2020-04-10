const axios = require('axios');
const fs = require('fs');

// axios.get('www.google.com')
//  .then(res =>{
//     console.log(res.data);
//  })
//  .catch(err => console.error(err));

axios({
    method: 'get',
    url: 'http://www.google.com',
    responseType: 'stream'
})
 .then((response) => {
     response.data.pipe(fs.createWriteStream('google.html'))
 })
 .catch((error) => {
     console.error(error);
 })