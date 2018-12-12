var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan' );

var apiRouter = require( './routes/api/apiRouter' );
var errorRouter = require( './routes/error' );

var app = express();

var mongoose = require( 'mongoose' );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

mongoose.connect( 'mongodb://localhost/generalrest', { useNewUrlParser: true } );
let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
  console.log( "DB connection established." );
});

app.use( '/api/', apiRouter() );
app.use( errorRouter() );

module.exports = app;
