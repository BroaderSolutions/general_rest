/**
 * Created by GrantBroadwater on 12/11/18.
 */

const express = require( 'express' );
const router = express.Router();
const helloWorldRouter = require( './helloWorld' );
const resourceRouter = require( './resources' );

router.use( '/helloWorld/', helloWorldRouter() );
router.use( '/', resourceRouter() );

module.exports = function () {
  return router;
};
