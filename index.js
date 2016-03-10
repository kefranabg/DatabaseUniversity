var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendfile('public/modules/core/views/index.html');
});

require('./server/routes')(app);

var port = process.env.PORT || 8080;
app.listen(port);

console.log("App listening on port " + port);