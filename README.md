# Doubt-Solving-API

Required API's for supporting soubt solving platform

## APIs Guide :
### Users API's

    1. POST "/doubt-solving/api/v1/user/register" → For registration of Users

      * request body fields  : name, email_id, password, user_type (only allowed -> student, teacher, ta)

    2. POST "/doubt-solving/api/v1/user/login" → For login of Users

      * request body fields  : email_id, password, user_type (only allowed -> student, teacher, ta)

    3. GET "/doubt-solving/api/v1/user/user-list" → For fetching Users list (secured by JWT-Authentication)

      * request query params  : user_type (only allowed -> student, teacher, ta)
### Doubt API's

    1. POST "('/doubt-solving/api/v1/doubt/create-doubt/:studentId" → For Raising Doubt (secured by JWT-Authentication)

      * request body fields  : title, description
      * This route is accessible to user type -> student

    2. POST "/doubt-solving/api/v1/doubt/:doubtId/add-comment/:studentId" → For adding comment on Doubt (secured by JWT-Authentication)
      * request body fields  : content
      * This route is accessible to user type -> student

    3. GET "/doubt-solving/api/v1/doubt/doubts-list" → For fetching Doubts list (secured by JWT-Authentication)

      * This route is accessible to user type -> student, teacher, ta (teaching assistant)

    4. POST "/doubt-solving/api/v1/doubt/:doubtId/:taAction/:taId" → For performing TA(teaching assistant) action on Doubt(secured by JWT-Authentication)

      * This route is accessible to user type -> ta (teaching assistant)
      * allowed ta-action are ('accept','resolve','escalate')
      * request body fields  : resolve_content (if ta_action is 'resolve')
    5. GET "/doubt-solving/api/v1/doubt/teacher-dashboard" → For getting Teacher dashboard summary (secured by JWT-Authentication)

      * This route is accessible to user type -> teacher

## Installation Guide :

1.Open cmd in project folder & run npm install

2.Start server by "npm start"

