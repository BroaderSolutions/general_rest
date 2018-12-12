/**
 * Created by GrantBroadwater on 12/11/18.
 */


const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;


const widgetSchema = new Schema( {
  
  description: String,
  weight: Number
  
} );


const Widget = mongoose.model( 'Widget', widgetSchema );
module.exports = Widget;
module.exports.resourceType = "widget";
module.exports.requiredFields = [ 'description', 'weight' ];