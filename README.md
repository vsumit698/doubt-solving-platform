# Doubt-Solving-API

Required API's for supporting soubt solving platform

## APIs Guide :
### Users API's

    1. POST "/doubt-solving/api/v1/user/register" → For registration of Users

      * request body fields  : name, email_id, password, user_type (only allowed -> student, teacher, ta)
      * Sample Response ->
          {
            "status": "success",
            "user_details": {
                "doubt_accept_count": 0,
                "doubt_resolve_count": 0,
                "doubt_escalated_count": 0,
                "avg_doubt_activity_time": 0,
                "_id": "60c781df875c08472438d0ea",
                "name": "sumit",
                "email_id": "vsumit698@gmail.com",
                "__v": 0,
                "user_type": "ta"
            },
            "message": "Successfully Registered"
          }

    2. POST "/doubt-solving/api/v1/user/login" → For login of Users

      * request body fields  : email_id, password, user_type (only allowed -> student, teacher, ta)
      * Sample Response -> 
          {
            "status": "success",
            "message": "Login successfully",
            "access_token": "sample_token",
            "user_details": {
              "_id": "60c784329fe5c62e34610058",
              "name": "sumit verma",
              "email_id": "vsumit698@gmail.com",
              "__v": 0,
              "user_type": "student"
            }
          }

    3. GET "/doubt-solving/api/v1/user/user-list" → For fetching Users list (secured by JWT-Authentication)

      * request query params  : user_type (only allowed -> student, teacher, ta)
### Doubt API's

    1. POST "('/doubt-solving/api/v1/doubt/create-doubt/:studentId" → For Raising Doubt (secured by JWT-Authentication)

      * request body fields  : title, description
      * This route is accessible to user type -> student
      * Sample Response 
        {
          "status": "success",
          "message": "Doubt Created successfully",
          "doubt_detail": {
              "comments": [],
              "recent_ta_id": "",
              "recent_ta_accept_timestamp": 0,
              "resolve_timestamp": 0,
              "escalate_count": 0,
              "_id": "60c7a228e675ae3b2c13be7a",
              "title": "Doubt Heading",
              "description": "How is doubt secription",
              "created_timestamp": 1623695912,
              "student_id": "60c784329fe5c62e34610058",
              "__v": 0
          }
        }

    2. POST "/doubt-solving/api/v1/doubt/:doubtId/add-comment/:studentId" → For adding comment on Doubt (secured by JWT-Authentication)
      * request body fields  : content
      * This route is accessible to user type -> student
      * Sample Response
        {
          "status": "success",
          "message": "Commented successfully on Doubt",
          "doubt_detail": {
              "comments": [
                  {
                      "user_id": "60c59e3aec9eab2e74403bbd",
                      "content": "Great Question"
                  },
                  {
                      "user_id": "60c59e3aec9eab2e74403bbd",
                      "content": "Great Question"
                  }
              ],
              "recent_ta_id": "",
              "recent_ta_accept_timestamp": null,
              "resolve_timestamp": null,
              "escalate_count": 0,
              "_id": "60c5f6e06324ce3bc0a6964c",
              "title": "Doubt Heading",
              "description": "How is doubt secription",
              "created_timestamp": 1623586528,
              "student_id": "60c59e3aec9eab2e74403bbd",
              "__v": 1
          }
        }

    3. GET "/doubt-solving/api/v1/doubt/doubts-list" → For fetching Doubts list (secured by JWT-Authentication)

      * This route is accessible to user type -> student, teacher, ta (teaching assistant)
      * Sample Response
        {
          "status": "success",
          "doubt_list": [
            {
              "comments": [
                  {
                      "user_id": "60c59e3aec9eab2e74403bbd",
                      "content": "This is good doubt"
                  },
                  {
                      "user_id": "60c59e3aec9eab2e74403bbd",
                      "content": "This is bad doubt"
                  }
              ],
              "recent_ta_accept_timestamp": "",
              "resolve_timestamp": "",
              "escalate_count": 0,
              "_id": "60c5d740a8aed6389c1dcf67",
              "title": "Doubt Heading",
              "description": "How is doubt secription",
              "created_timestamp": "1623577714",
              "student_id": "60c59e3aec9eab2e74403bbd",
              "__v": 2
            }
          ]
        }

    4. POST "/doubt-solving/api/v1/doubt/:doubtId/:taAction/:taId" → For performing TA(teaching assistant) action on Doubt(secured by JWT-Authentication)

      * This route is accessible to user type -> ta (teaching assistant)
      * allowed ta-action are ('accept','resolve','escalate')
      * request body fields  : resolve_content (if ta_action is 'resolve')
    5. GET "/doubt-solving/api/v1/doubt/teacher-dashboard" → For getting Teacher dashboard summary (secured by JWT-Authentication)

      * This route is accessible to user type -> teacher

## Installation Guide :

1.Open cmd in project folder & run npm install

2.Start server by "npm start"

