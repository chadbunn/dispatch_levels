dispatch_levels
===============
This repository includes the SQL queries and Javascript code necessary to populate and update tables in CartoDB via Google Form Submissions.  It is largely based on this tutorial: http://blog.cartodb.com/make-maps-from-data-you-collect-in-google-forms/

Whenever you make a change to the Observations form it will reset all the field names in the OBS spreadsheet, so you need to be sure to change them back to the format that the onFormSubmission.js script is using (i.e. lt_temperature, lt_relative_humidity, etc.).  Its easiest to just copy the row of field names, make a change to the form, and then paste the field names back to the OBS spreadsheet.
