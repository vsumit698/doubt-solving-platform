# Doubt-Solving-API

Required API's for supporting soubt solving platform

## APIs Guide :
### Users API's

POST "/doubt-solving/api/v1/user/register" → For registration of Users

  * request body fields  : name, email_id, password, user_type (only allowed -> student, teacher, ta)

POST "/doubt-solving/api/v1/user/login" → For login of Users

  * request body fields  : email_id, password, user_type (only allowed -> student, teacher, ta)

GET "/doubt-solving/api/v1/user/user-list" → For fetching Users list (secured by JWT-Authentication)

  * request query params  : user_type (only allowed -> student, teacher, ta)
### Doubt API's

POST "/patients/:id/create_report" → For Creating reports, Fields Required : status, Need Token of Logged in Doctor in headers of request

GET "/patients/:id/all_reports" → For Fetching reports of specific patient, Reports are ordered by oldest to latest.

GET "/reports/:status" → For fetching all the reports of all the patients filtered by a specific status

## Installation Guide :

1.Open cmd in project folder & run npm install

2.Start server by "npm start"

