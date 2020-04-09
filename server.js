const http = require('http');
const https= require('https');
const fs = require('fs');
const url = require('url');
const textBody = require("body")
const jsonBody = require("body/json")
const formBody = require("body/form")
const anyBody = require("body/any")
const {fetchImageMetadata, createUser } = require('./services')

// const server = https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem')
// });

const server = http.createServer();

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);

    if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = fetchImageMetadata(id);

        console.log(req.headers);
    } else if (req.method === 'POST' && parsedUrl.pathname ==='/user') {
        jsonBody(req, res, (err, body) => {

            if (err) {
                console.log(err);
            } else {

                createUser(body['username']);
            }
        })
    
    } else {
        res.statusCode = 404;
        res.setHeader('X-Powered-By', 'Node');
        res.end();
    }

    
    
});

server.listen(8080, () => {
    console.log('server is running')
});