// All of the NPM modules required to start this application
var express = require( 'express' );
var app = express();
var morgan = require('morgan')
var swig =  require('swig')
var routes = require('./routes/');
var bodyParser = require ('body-parser')
var socketio = require('socket.io')


// Middleware
// Network Maintenaince
app.use(morgan('dev'))
// body parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//templating engine
app.engine('html', swig.renderFile)
app.set('view engine', 'swig')
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var io = socketio.listen(server);

app.use('/', routes(io));
app.use(express.static(__dirname + '/public'));



