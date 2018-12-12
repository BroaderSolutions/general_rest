/**
 * Created by GrantBroadwater on 12/11/18.
 */

const express = require( 'express' );
const router = express.Router();


module.exports = function () {
  
  
  router.get( '/', function ( req, res, next ) {
    res.send( 'Hello, world!' );
  } );
  
  
  return router;
};
