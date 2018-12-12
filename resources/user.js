/**
 * Created by GrantBroadwater on 12/11/18.
 */


const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;


const userSchema = new Schema( {
  
  email: String,
  display_name: String,
  
  provider: String,
  provider_uid: String,
  access_token: String
  
} );


const User = mongoose.model( 'User', userSchema );
module.exports = User;
module.exports.resourceType = "user";
module.exports.requiredFields = [ 'email' ];