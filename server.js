const http = require('http');
const https= require('https');
const fs = require('fs');
const url = require('url');
const formidable = require('formidable');
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
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        const serialisedJSON = JSON.stringify(metadata);
        res.write(serialisedJSON);
        res.end();

    } else if (req.method === 'POST' && parsedUrl.pathname ==='/user') {
        jsonBody(req, res, (err, body) => {

            if (err) {
                console.log(err);
            } else {

                createUser(body['username']);
            }
        })
    
    } else {
        fs.createReadStream("./index.html").pipe(res)
    }

    
    
});

server.listen(8080, () => {
    console.log('server is running')
});