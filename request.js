const http = require('http');
const https = require('https');

// const request = https.get('http://www.google.com', cb) request.end()


const request = http.request(
    { hostname: 'www.google.com'},
    (response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response.headers);

        response.on('data', (chunk) => {
            console.log('This is a chunk: \n');
            console.log(chunk.toString());
        })
    }
)

request.on('error', (err) => {
    console.error(err);
})

request.end();