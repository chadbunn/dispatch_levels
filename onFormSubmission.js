/**
 * Read values coming from the form
 */
function onFormSubmission(e) {
  Logger.log("data!");
  /**
   * Use Google services to get coordinates from a locality string
   */
  //Georeference the submission
  var loc = geocode(e.namedValues.location);
  
  /**
   * Use our own function to post to our table
   */
  postToCartoDB(
    e.namedValues.location[0],
    e.namedValues.coastal[0],
    e.namedValues.inland[0],
    e.namedValues.report[0],
    loc.lat,
    loc.lng
  );
}

/**
 * Geocode using Google's services
 */
function geocode(address) {
  var response = UrlFetchApp.fetch("http://maps.googleapis.com/maps/api/geocode/json?address="+escape(address)+"&sensor=false");
  var respObj=Utilities.jsonParse(response.getContentText());

  var loc = {lat:NaN,lng:NaN};
  try {
    loc = respObj.results[0].geometry.location
  } catch(e) {
    Logger.log("Error geocoding: "+address);
  }
  return loc;
}

/**
 * Insert color into CartoDB
 */
function postToCartoDB(location,coastal,inland,report,latitude,longitude) {
  Logger.log("posting to CartoDB");
  
  /**
   * Keep your key private!
   */
  var cartodb_host = "slu.cartodb.com";   //Your CartoDB domain
  var cartodb_api_key = "62c8173a64100e8f9fa62c1936b19108544fed5c";  //Your CartoDB API KEY
  
  /**
   * Insert NULL as the_geom if no location is provided
   */
  var loc = "";
  if (latitude && longitude) {
    loc = "CDB_LatLng("+latitude+","+longitude+")";
  } else {
    loc="null";
  }
   
  /**
   * Remove all single quotes
   */
  location = location.replace("'","''");
  coastal = coastal.replace("'","''");
  inland = inland.replace("'","''");
  report = report.replace("'","''");
  /**
   * Here is the INSERT statement
   */
  var query = "INSERT INTO dispatch_level(location,named_coastal,named_inland,named_report,the_geom) VALUES('"+location+"','"+coastal.replace(/'/g, "''")+"','"+inland.replace(/'/g, "''")+"','"+report.replace(/'/g, "''")+"',"+loc+")";

  Logger.log("SQL: "+query);  

  
  /**
   * Assemble the POST parameters
   */
  var options = {
    "method" : "post",
    "payload" : {q:query,api_key:cartodb_api_key}
  };

  /**
   * Ship It
   */
  var response = UrlFetchApp.fetch("https://"+cartodb_host+"/api/v1/sql", options);
  var respObj=Utilities.jsonParse(response.getContentText());
  Logger.log("CDB call result: "+response.getContentText());
  
}
