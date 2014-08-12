/**
 * Read values coming from the form
 */
function onFormSubmission(e) {
  Logger.log("data!");
  /**
   * Use our own function to post to our table
   */
  postToCartoDB(
    e.namedValues.color[0],
    e.namedValues.test[0]
  );
}

/**
 * Insert color into CartoDB
 */
function postToCartoDB(color, test) {
  Logger.log("posting to CartoDB");
  
  /**
   * Keep your key private!
   */
  var cartodb_host = "slu.cartodb.com";   //Your CartoDB domain
  var cartodb_api_key = "62c8173a64100e8f9fa62c1936b19108544fed5c";  //Your CartoDB API KEY
  /**
   * Remove all single quotes
   */
  color = color.replace("'","''");
  test = test.replace("'","''");
  /**
   * Here is the INSERT statement
   */
  var query = "INSERT INTO color_world(named_color, the_geom) VALUES('"+color.replace(/'/g, "''")+"','"+test.replace(/'/g, "''")+"',"+null+")";

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
