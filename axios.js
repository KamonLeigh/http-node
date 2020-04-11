const axios = require('axios');
const fs = require('fs');


// Typical way of hiting a end point 
axios.get('www.google.com')
 .then(res =>{
    console.log(res.data);
 })
 .catch(err => console.error(err));


// Using axios to stream data 
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

 axios({
         method: 'post',
         url: 'http://localhost:8080/user',
         data: {
             username: 'leigh'
         },
         transformRequest: (data, headers) => {
             const newData = {
                 username: data.username + "!"
             }

             return JSON.stringify(newData);
         }
     })
     .then((response) => {
        //  response.data.pipe(fs.createWriteStream('google.html'))

        console.log(response.data);
     })
     .catch((error) => {
         console.error(error);
     })

     // You can use transformResponse 


    // Concurrent api calls
     const getMetadata = () => {
         return axios.get('http://localhost:8080/metadata?id=1')
     }

     const getMetadataAgain = () => {
         return axios.get('http://localhost:8080/metadata?id=1')
     }

     axios.all([
         getMetadata(),
         getMetadataAgain()
     ]).then((responseArray) => {
         console.log(responseArray[0].data.description);
         console.log(responseArray[1].data.description);
     })