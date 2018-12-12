/**
 * Created by GrantBroadwater on 12/12/18.
 */
const express = require( 'express' );
const router = express.Router();



router.get( '/', function ( req, res, next ) {
  res.send( 'This is an example of how to extend the functionality of a default endpoint.' );
} );


router.get( '/:widget_id', function ( req, res, next ) {
  
  /* This is an example of how to call the default endpoint */
  
  if ( req.params[ 'widget_id' ].length > 1 ) {
    next();
  } else {
    res.status(400).send( "Widget id's must be longer than 1 character" );
  }
  
} );


router.delete( '/:widget_id', function ( req, res, next ) {
  res.send( 'This is an example of how to override a default endpoint. The widget has not been deleted' );
} );


module.exports = function () {
  return router;
};