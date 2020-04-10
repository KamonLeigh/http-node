const http = require('http');
const https= require('https');
const fs = require('fs');
const path = require('path');
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
const imgFolder = path.join(__dirname, '/images');
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
    
    } else if( req.method === 'POST' && parsedUrl.pathname === '/upload') {
        
        
        const form = new formidable.IncomingForm({
            uploadDir: imgFolder,
            keepExtensions: true,
            multiple: true,
            maxFileSize: 5 * 1024 * 1024
        });


        // form.parse(req, (err, fields, files) => {
        //     if(err) {
        //         res.statusCode = 500;
        //         res.end('Error');
        //     }

        //     res.statusCode = 200;
        //     res.end('done');
        // });

        form.parse(req)
            .on('fileBegin', (name, file) => {
                console.log('Our upload has started!');
            })
            .on('file', (name, file) => {
                console.log('Field + file pair has been received');
            })
             .on('field', (name, field) => {
                 console.log('Field received ');
                 console.log(name, field);
             })
             .on('progress', (bytesReceived, bytesExpected) => {
                console.log(bytesReceived + '/' + bytesExpected);
             })
             .on('error', (err) => {
                 console.error(err);
                 req.resume();
             })
             .on('aborted', () =>  {
                 console.error('Request aborted by the user')
             })
             .on('end', () => {
                 console.log('Done - request fully received');
                 res.end('success')
             })
    } else {
        fs.createReadStream("./index.html").pipe(res)
    }

    
    
});

server.listen(8080, () => {
    console.log('server is running')
});