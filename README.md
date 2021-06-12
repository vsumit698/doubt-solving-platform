# covid19-API-with-UNIT-TESTING-
An API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients

Installation Guide :

1.Open cmd in project folder & run npm install

2.Start server by "node server.js" OR "nodemon"

APIs Guide :

POST "/doctors/register" → For registration of Doctors, Fields required : Name, Username & Password

POST "/doctors/login" → For Login of Doctors, Fields required : Username & Password

POST "/doctors/register_patient" → For Registration of Patients, Fields Required : PHONE NUMBER, Need Token of Logged in Doctor in headers of request

POST "/patients/:id/create_report" → For Creating reports, Fields Required : status, Need Token of Logged in Doctor in headers of request

GET "/patients/:id/all_reports" → For Fetching reports of specific patient, Reports are ordered by oldest to latest.

GET "/reports/:status" → For fetching all the reports of all the patients filtered by a specific status

