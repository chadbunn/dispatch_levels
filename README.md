dispatch_levels
===============
This repository includes the SQL queries and Javascript code necessary to populate and update tables in CartoDB via Google Form Submissions.  It is largely based on this tutorial: http://blog.cartodb.com/make-maps-from-data-you-collect-in-google-forms/

Whenever you make a change to the Observations form it will reset all the field names in the OBS spreadsheet, so you need to be sure to change them back to the format that the onFormSubmission.js script is using (i.e. lt_temperature, lt_relative_humidity, etc.).  Its easiest to just copy the row of field names, make a change to the form, and then paste the field names back to the OBS spreadsheet.

**mostRecentReport**

This SQL query is used on the 'obs' table in CartoDB to return only the most recently submitted row from the Observations form.  Do not create a new table from this view. This query is not being used anymore becasue the update SQL queries factor in the newest record value for either lt_dispatch_level or ag_dispatch_level.  However it is useful to see how to call the most recent form submitted.

**updateInland**

This SQL query updates the lt_dispatch_level field with the most recently submitted Observations form submission value from named_lt_dispatch_level.

**updateCoastal**

This SQL query updates the ag_dispatch_level field with the most recently submitted Observations form submission value from named_ag_dispatch_level.
