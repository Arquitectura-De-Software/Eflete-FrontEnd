 var http = require('http');
 var fs = require('fs');
 var path = require('path');

 http.createServer(function (request, response) {

    console.log('request starting for ');
    console.log(request);

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    console.log(filePath);
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

 }).listen(process.env.PORT || 5000);

 console.log('Server running.....');