const http = require('http');
const https = require('https');

// const request = https.get('http://www.google.com', cb) request.end()


// EXAMPLE OF MAKING GET REQUEST
// const request = http.request(
//     { hostname: 'www.google.com'},
//     (response) => {
//         console.log(`statusCode: ${response.statusCode}`);
//         console.log(response.headers);

//         response.on('data', (chunk) => {
//             console.log('This is a chunk: \n');
//             console.log(chunk.toString());
//         })
//     }
// )

// request.on('error', (err) => {
//     console.error(err);
// })

// request.end();

const data = JSON.stringify({
    username: 'byron80'
});

const options = {
    hostname: 'localhost',
    port: 443,
    path:'/user',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': Buffer.from('myUsername' + ':' + 'myPassword').toString('base64')
    }
}

const request = https.request(
    options,
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

request.write(data)

request.end();