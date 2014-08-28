/**
 * Read values coming from the form
 */
function onFormSubmission(e) {
  Logger.log("data!");
  /**
   * Use our own function to post to our table
   */
  postToCartoDB(
    e.namedValues.lt_temperature[0],
    e.namedValues.lt_relative_humidity[0],
    e.namedValues.lt_ignition_component[0],
    e.namedValues.lt_spread_component[0],
    e.namedValues.lt_burning_index[0],
    e.namedValues.lt_dispatch_level[0],
    e.namedValues.lp_temperature[0],
    e.namedValues.lp_relative_humidity[0],
    e.namedValues.lp_ignition_component[0],
    e.namedValues.lp_spread_component[0],
    e.namedValues.lp_burning_index[0],
    e.namedValues.lp_dispatch_level[0],
    e.namedValues.ag_temperature[0],
    e.namedValues.ag_relative_humidity[0],
    e.namedValues.ag_ignition_component[0],
    e.namedValues.ag_spread_component[0],
    e.namedValues.ag_burning_index[0],
    e.namedValues.ag_dispatch_level[0],
    e.namedValues.report[0],
    e.namedValues.timestamp[0]
  );
}

/**
 * Insert color into CartoDB
 */
function postToCartoDB(lt_temperature,lt_relative_humidity,lt_ignition_component,lt_spread_component,lt_burning_index,lt_dispatch_level,lp_temperature,lp_relative_humidity,lp_ignition_component,lp_spread_component,lp_burning_index,lp_dispatch_level,ag_temperature,ag_relative_humidity,ag_ignition_component,ag_spread_component,ag_burning_index,ag_dispatch_level,report,timestamp
) {
  Logger.log("posting to CartoDB");
  
  /**
   * Keep your key private!
   */
  var cartodb_host = "slu.cartodb.com";   //Your CartoDB domain
  var cartodb_api_key = "6e8538f81acbdc7aac8ffccbb2f4cff92a7bd05e";  //Your CartoDB API KEY
  
  /**
   * Remove all single quotes
   */
  lt_temperature = lt_temperature.replace("'","''");
  lt_relative_humidity = lt_relative_humidity.replace("'","''");
  lt_ignition_component = lt_ignition_component.replace("'","''");
  lt_spread_component = lt_spread_component.replace("'","''");
  lt_burning_index = lt_burning_index.replace("'","''");
  lt_dispatch_level = lt_dispatch_level.replace("'","''");
  lp_temperature = lp_temperature.replace("'","''");
  lp_relative_humidity = lp_relative_humidity.replace("'","''");
  lp_ignition_component = lp_ignition_component.replace("'","''");
  lp_spread_component = lp_spread_component.replace("'","''");
  lp_burning_index = lp_burning_index.replace("'","''");
  lp_dispatch_level = lp_dispatch_level.replace("'","''");
  ag_temperature = ag_temperature.replace("'","''");
  ag_relative_humidity = ag_relative_humidity.replace("'","''");
  ag_ignition_component = ag_ignition_component.replace("'","''");
  ag_spread_component = ag_spread_component.replace("'","''");
  ag_burning_index = ag_burning_index.replace("'","''");
  ag_dispatch_level = ag_dispatch_level.replace("'","''");
  report = report.replace("'","''");
  timestamp = timestamp.replace("'","''");
  /**
   * Here is the INSERT statement
   */
  var query = "INSERT INTO obs(named_lt_temperature,named_lt_relative_humidity,named_lt_ignition_component,named_lt_spread_component,named_lt_burning_index,named_lt_dispatch_level,named_lp_temperature,named_lp_relative_humidity,named_lp_ignition_component,named_lp_spread_component,named_lp_burning_index,named_lp_dispatch_level,named_ag_temperature,named_ag_relative_humidity,named_ag_ignition_component,named_ag_spread_component,named_ag_burning_index,named_ag_dispatch_level,named_report,named_timestamp,the_geom) VALUES('"+lt_temperature.replace(/'/g, "''")+"','"+lt_relative_humidity.replace(/'/g, "''")+"','"+lt_ignition_component.replace(/'/g, "''")+"','"+lt_spread_component.replace(/'/g, "''")+"','"+lt_burning_index.replace(/'/g, "''")+"','"+lt_dispatch_level.replace(/'/g, "''")+"','"+lp_temperature.replace(/'/g, "''")+"','"+lp_relative_humidity.replace(/'/g, "''")+"','"+lp_ignition_component.replace(/'/g, "''")+"','"+lp_spread_component.replace(/'/g, "''")+"','"+lp_burning_index.replace(/'/g, "''")+"','"+lp_dispatch_level.replace(/'/g, "''")+"','"+ag_temperature.replace(/'/g, "''")+"','"+ag_relative_humidity.replace(/'/g, "''")+"','"+ag_ignition_component.replace(/'/g, "''")+"','"+ag_spread_component.replace(/'/g, "''")+"','"+ag_burning_index.replace(/'/g, "''")+"','"+ag_dispatch_level.replace(/'/g, "''")+"','"+report.replace(/'/g, "''")+"','"+timestamp.replace(/'/g, "''")+"',"+null+")";

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
