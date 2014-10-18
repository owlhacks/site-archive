var express = require('express'),
    path = require('path');

var app = express();

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

app.get('/letmeknow', function(req, res) {

});

app.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'dist', 'pages', '404.html'));
});

app.listen(3000, function() {
    console.log('Server is listening');
});