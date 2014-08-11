/**
 * Read values coming from the form
 */
function onFormSubmission(e) {
  Logger.log("data!");
  /**
   * Use Google services to get coordinates from a locality string
   */
  //Georeference the submission
  var loc = geocode(e.namedValues.LT_Location);
  
  /**
   * Use our own function to post to our table
   */
  LTpostToCartoDB(
    e.namedValues.LT_Location[0],
    e.namedValues.LT_Temperature[0],
    e.namedValues.LT_Relative_Humidity[0],
    e.namedValues.LT_Ignition_Component[0],
    e.namedValues.LT_Spread_Component[0],
    e.namedValues.LT_Burning_Index[0],
    e.namedValues.LT_Dispatch_Level[0],
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
function LTpostToCartoDB(LT_Location,LT_Temperature,LT_Relative_Humidity,LT_Ignition_Component,LT_Spread_Component,LT_Burning_Index,LT_Dispatch_Level,latitude,longitude) {
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
  LT_Location = LT_Location.replace("'","''");
  LT_Temperature = LT_Temperature.replace("'","''");
  LT_Relative_Humidity = LT_Relative_Humidity.replace("'","''");
  LT_Ignition_Component = LT_Ignition_Component.replace("'","''");
  LT_Spread_Component = LT_Spread_Component.replace("'","''");
  LT_Burning_Index = LT_Location.replace("'","''");
  LT_Dispatch_Level = LT_Dispatch_Level.replace("'","''");
  
  /**
   * Here is the INSERT statement
   */
  var query = "INSERT INTO LT_Observations(LT_Location,named_LT_Temperature,named_LT_Relative_Humidity,named_LT_Ignition_Component,named_LT_Spread_Component,named_LT_Burning_Index,named_LT_Dispatch_Level,the_geom) VALUES('"+LT_Location+"','"+LT_Temperature.replace(/'/g, "''")+"','"+LT_Relative_Humidity.replace(/'/g, "''")+"','"+LT_Ignition_Component.replace(/'/g, "''")+"','"+LT_Spread_Component.replace(/'/g, "''")+"','"+LT_Burning_Index.replace(/'/g, "''")+"','"+LT_Dispatch_Level.replace(/'/g, "''")+"',"+loc+")";

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
