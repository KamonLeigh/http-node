const http = require('http');
const https= require('https');
const fs = require('fs');
const url = require('url');
const textBody = require("body")
const jsonBody = require("body/json")
const formBody = require("body/form")
const anyBody = require("body/any")
const {fetchImageMetadata, createUser } = require('./services')

const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
});

server.on('request', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);

    if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = fetchImageMetadata(id);

        console.log(req.headers);
    };

    jsonBody(req, res,(err, body) => {

        if (err) {
            console.log(err);
        } else {

            createUser(body['username']);
        }
    })
    res.end('This was a https server')
});

server.listen(443, () => {
    console.log('server is running')
});