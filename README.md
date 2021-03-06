#dispatch_levels
===============
This repository includes the SQL queries & triggers and Javascript code necessary to populate and update tables in CartoDB via Google Form Submissions.  It is largely based on this tutorial: http://blog.cartodb.com/make-maps-from-data-you-collect-in-google-forms/

**A Note**

Whenever you make a change to the Observations Google form it will reset all the field names in the OBS spreadsheet, so you need to be sure to change them back to the format that the onFormSubmission.js script is using (i.e. lt_temperature, lt_relative_humidity, etc.).  Its easiest to just copy the row of field names, make a change to the form, and then paste the field names back to the OBS spreadsheet.

##SQL Queries

####mostRecentReport

This SQL query is used on the 'obs' table in CartoDB to return only the most recently submitted row from the Observations form.  Do not create a new table from this view. This query is not being used anymore becasue the update SQL queries factor in the newest record value for either lt_dispatch_level or ag_dispatch_level.  However it is useful to see how to call the most recent form submitted.

####updateInland

This SQL query updates the lt_dispatch_level field with the most recently submitted Observations form submission value from named_lt_dispatch_level.

####updateCoastal

This SQL query updates the ag_dispatch_level field with the most recently submitted Observations form submission value from named_ag_dispatch_level.

##SQL Triggers and Functions

####update_inland_dispatch

This is the SQL trigger that updates the *inland* table value for lt_dispatch_level.  It works by running the *indispatch* function every time a new Google form submission occurs.  The *indispatch* function is composed of the *UpdateInland* query.

####update_coastal_dispatch

This is the SQL trigger that updates the *coastal* table value for ag_dispatch_level.  It works by running the *codispatch* function every time a new Google form submission occurs.  The *codispatch* function is composed of the *UpdateCoastal* query.

####Drop Function/Trigger
To delete a function you need to apply this query in the CartoDB SQL console:  
DROP *your_function*()  
To delete a trigger you need to apply this query in the CartoDB SQL sonsole:  
DROP *your_trigger* ON *obs*

You might need to try dropping your triggers and functions if you want to change them to include more fields in the update functions.


