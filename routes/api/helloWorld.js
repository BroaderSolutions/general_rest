/**
 * Created by GrantBroadwater on 12/11/18.
 */

const express = require( 'express' );
const router = express.Router();

router.get( '/', function ( req, res, next ) {
  res.send( 'Hello, world!' );
} );

module.exports = function () {
  return router;
};
