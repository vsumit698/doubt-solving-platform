# Installation Guide :

### To Start Backend
1.Open cmd with projectDirectory & run npm install

2.Start server by "npm start"

### To Start Frontend
1.Open cmd with projectDdirectory/frontend & run npm install

2.Start server by "npm start"

# FRONTEND-DOCS
## Frontend Routing Details

* **/signup** To register User
* **/login** To Login User
* **/student/home** For Student To See All Students Doubts, with answers, comments on it.
* **/student/raise-doubt** For Student To Raise Doubt via student with doubt title, description.
* **/ta/home** For TA To see all unresolved doubt list, Ta can accept doubt and resolve it.
* **/ta/resolve-doubt** For TA To solve an accepted doubt.
* **/teacher/home** For Teacher To view dashboard data, which includes overall doubts summary & each TA summary as well

## Component Architecture Of Doubt Solving Platform - 

Component Architecture - https://drive.google.com/file/d/1PeUUy5W8Kfa2mt1XSBRV7cVaXSeDO_Dw/view?usp=share_link

## Backend API calls in Components

  1. App Component - 

    * /doubt-solving/api/v1/user/register
    * /doubt-solving/api/v1/user/login

  2. StudentDoubtRaise - 

    * /doubt-solving/api/v1/doubt/create-doubt/:studentId
  
  3. StudentDoubtList - 

    * /doubt-solving/api/v1/doubt/doubts-list
    * /doubt-solving/api/v1/doubt/:doubtId/add-comment/:studentId 

  4. TaDoubtList - 

    * /doubt-solving/api/v1/doubt/doubts-list
    * /doubt-solving/api/v1/doubt/:doubtId/:taAction/:taId
  
  5. TaSolveDoubt - 

    * /doubt-solving/api/v1/doubt/:doubtId/:taAction/:taId
  
  6. TeacherDashboard - 

    * /doubt-solving/api/v1/doubt/teacher-dashboard
  


# BACKDEND-DOCS
Required API's for supporting soubt solving platform

## APIs Guide :
### Users API's

  1. POST **/doubt-solving/api/v1/user/register** → For registration of Users

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

  2. POST **/doubt-solving/api/v1/user/login** → For login of Users

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

  3. GET **/doubt-solving/api/v1/user/user-list** → For fetching Users list (secured by JWT-Authentication)

    * request query params  : user_type (only allowed -> student, teacher, ta)
### Doubt API's

  1. POST **/doubt-solving/api/v1/doubt/create-doubt/:studentId** → For Raising Doubt (secured by JWT-Authentication)

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

  2. POST **/doubt-solving/api/v1/doubt/:doubtId/add-comment/:studentId** → For adding comment on Doubt (secured by JWT-Authentication)

    * request body fields  : content
    * This route is accessible to user type -> student
    * Sample Response
      {
        "status": "success",
        "message": "Commented successfully on Doubt",
        "doubt_detail": {
            "comments": [
                {
                  "user_id": "60c784329fe5c62e34610058",
                  "content": "Great Question",
                  "user_type": "student",
                  "user_name": "sumit verma"
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
            "__v": 1,
            "asked_student_name": "sumit verma",
          ``"solved_ta_name" : "ta name"
        }
      }

  3. GET **/doubt-solving/api/v1/doubt/doubts-list** → For fetching Doubts list (secured by JWT-Authentication)

    * This route is accessible to user type -> student, teacher, ta (teaching assistant)
    * Sample Response
      {
        "status": "success",
        "doubt_list": [
          {
          "comments": [
              {
                  "user_id": "60c784329fe5c62e34610058",
                  "content": "Great Question",
                  "user_type": "student",
                  "user_name": "sumit verma"
              }
          ],
          "recent_ta_id": "",
          "recent_ta_accept_timestamp": 0,
          "resolve_timestamp": 0,
          "escalate_count": 0,
          "_id": "60c830b60b0c253ac0a3e7b5",
          "title": "Doubt Heading",
          "description": "How is doubt secription",
          "created_timestamp": 1623732406,
          "student_id": "60c784329fe5c62e34610058",
          "__v": 4,
          "asked_student_name": "sumit verma",
          "solved_ta_name" : "ta name"
          }
        ]
      }

  4. POST **/doubt-solving/api/v1/doubt/:doubtId/:taAction/:taId** → For performing TA(teaching assistant) action on Doubt(secured by JWT-Authentication)

    * This route is accessible to user type -> ta (teaching assistant)
    * allowed ta-action are ('accept','resolve','escalate')
    * request body fields  : resolve_content (if ta_action is 'resolve')
    * Sample Response
      {
        "status": "success",
        "message": "TA action accept performed on Doubt",
        "doubt_detail": {
          "comments": [
            {
              "user_id": "60c784329fe5c62e34610058",
              "content": "whoare comment",
              "user_type": "student",
              "user_name": "sumit verma"
            },
            {
              "user_id": "60c784329fe5c62e34610058",
              "content": "greta question",
              "user_type": "student",
              "user_name": "sumit verma"
            }
          ],
          "recent_ta_id": "60c8e50c417b6b4bb0d0c6a6",
          "recent_ta_accept_timestamp": 1623785272,
          "resolve_timestamp": 0,
          "escalate_count": 0,
          "_id": "60c7ca507119f735b81aaf96",
          "title": "hello man",
          "description": "man is hello",
          "created_timestamp": 1623706192,
          "student_id": "60c784329fe5c62e34610058",
          "__v": 2,
          "asked_student_name": "sumit verma"
        }
      } 

  5. GET **/doubt-solving/api/v1/doubt/teacher-dashboard** → For getting Teacher dashboard summary (secured by JWT-Authentication)

    * This route is accessible to user type -> teacher
    * Sample Response
      {
        "status": "success",
        "dashboard_details": {
          "doubts_asked": 3,
          "doubts_resolved": 2,
          "doubts_escalated": 2,
          "avg_doubt_resolution_time": 241,
          "ta_summary_list": [
            {
                "name": "sumit verma (TA)",
                "doubt_accept_count": 18,
                "doubt_resolve_count": 2,
                "doubt_escalated_count": 4,
                "avg_doubt_activity_time": 25.5
            },
            {
                "name": "sunita",
                "doubt_accept_count": 0,
                "doubt_resolve_count": 0,
                "doubt_escalated_count": 0,
                "avg_doubt_activity_time": 0
            }
          ]
        }
      }



