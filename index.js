var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon');

var subscribe = require('./routes/subscribe');

var app = express();

app.set('port', process.env.PORT || 80);
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'dist', 'pages', 'index.html'));
});

app.get('/sponsor.pdf', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'files', 'sponsor.pdf'));
});

app.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'dist', 'pages', '404.html'));
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
