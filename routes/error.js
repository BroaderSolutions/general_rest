/**
 * Created by GrantBroadwater on 12/11/18.
 */

var express = require( 'express' );
var router = express.Router();

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next({status: 404, message: "Resource not found."});
});

// error handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err);
});

module.exports = router;
