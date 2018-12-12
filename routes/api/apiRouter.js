/**
 * Created by GrantBroadwater on 12/11/18.
 */

var express = require( 'express' );
var router = express.Router();
var helloWorldRouter = require( './helloWorld' );

router.use( '/helloWorld/', helloWorldRouter );

module.exports = router;
