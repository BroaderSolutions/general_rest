/**
 * Created by GrantBroadwater on 12/11/18.
 */


const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const getCustomWidgetRouter = require( '../routes/api/widget' );

const widgetSchema = new Schema( {
  
  description: String,
  weight: Number
  
} );


const Widget = mongoose.model( 'Widget', widgetSchema );
module.exports = Widget;
module.exports.resourceType = "widget";
module.exports.requiredFields = [ 'description', 'weight' ];

/* Add the line below to customize the endpoint for this resource */
module.exports.getRouter = getCustomWidgetRouter;