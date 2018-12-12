/**
 * Created by GrantBroadwater on 12/11/18.
 */


let express = require( 'express' );
let router = express.Router();
let resources = require( '../../resources/resources' );
let mongoose = require( 'mongoose' );


module.exports = function () {
  
  /* For each listed resource */
  for( let i = 0; i < resources.resourceList.length; i++ ) {
    
    /* The type of resource */
    const resourceType = resources.resourceList[ i ];
    
    /* The model for the corresponding resource */
    let ResourceModel = resources[ resourceType ];
    
    
    /* Check for custom endpoints */
    if ( ResourceModel.getRouter ) {
      router.use( '/' + resourceType, ResourceModel.getRouter() );
    }
    
    
    /* GET endpoint for resource */
    router.get( '/' + resourceType + '/:resource_id', function ( req, res, next ) {
      
      /* The id of the resource to return */
      let resource_id = req.params[ 'resource_id' ];
      
      /* Check if the id is valid */
      if ( !mongoose.Types.ObjectId.isValid( resource_id ) ) {
        next( { status: 400, message: resource_id + " is not a valid " + resourceType + " id."} );
        return;
      }
      
      /* Retrieve the document  */
      ResourceModel.findById( resource_id, function ( error, document ) {
        
        if ( error ) {
          next( { status: 500, message: "Error retrieving " + resourceType + " from database." } );
          console.error( error );
          return;
        }
        
        res.send( document );
        
      } );
    } );
    
    
    /* POST endpoint for resource */
    router.post( '/' + resourceType, function ( req, res, next ) {
      
      /* Get the resource to be created */
      let newResource = req.body;
      
      /* Check new resource has all the required fields */
      let requiredFields = ResourceModel.requiredFields;
      
      for ( let i = 0; i < requiredFields.length; i++ ) {
        if ( !newResource[ requiredFields[ i ] ] ) {
          next( { status: 400, message: resourceType + " requires field " + requiredFields[ i ] + "." } );
          return;
        }
      }
      
      /* If a resource id is specified */
      if ( newResource._id ) {
        
        /* DB upsert */
        ResourceModel.findOneAndUpdate(
          { _id: newResource._id },
          newResource,
          { upsert: true },
          function ( error, document ) {
            
            if ( error ) {
              next( { status: 500, message: "Error retrieving " + resourceType + " from database." } );
              return;
            }
            
            res.send( {
              newValue: newResource,
              oldValue: document
            } );
            
          } );
      }
      /* If no id was specified */
      else {
        
        /* Create new document from provided data */
        let resourceDocumentInstance = new ResourceModel( newResource );
        resourceDocumentInstance.save( function ( error ) {
          
          if ( error ) {
            next( { status: 500, message: "Error creating " + resourceType + " in database." } );
            return;
          }
          
          res.send( resourceDocumentInstance._doc );
          
        } );
      }
    } );
    
    
    /* DELETE endpoint for resource */
    router.delete( '/' + resourceType + '/:resource_id', function ( req, res, next ) {
  
      /* The id of the resource to delete */
      let resource_id = req.params[ 'resource_id' ];
  
      /* Check if the id is valid */
      if ( !mongoose.Types.ObjectId.isValid( resource_id ) ) {
        next( { status: 400, message: resource_id + " is not a valid " + resourceType + " id."} );
        return;
      }
      
      ResourceModel.findByIdAndDelete( resource_id, function ( error, document ) {
        
        if ( error ) {
          next( { status: 500, message: "Error deleting " + resourceType + " " + resource_id + " from database." } );
          return;
        }
        
        res.send( { oldValue: document } );
        
      } );
    } );
  }
  
  return router;
};