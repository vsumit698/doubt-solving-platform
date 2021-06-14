const {studentModel,taModel,doubtModel,teacherModel} = require('../models/exportModels');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const validUserTypes = new Set(['student','ta','teacher']);
const expireTime = 60*60;

module.exports.handleUserRegistration = async function(req,res){
    try {

        if(!req.body.name || !req.body.password || !req.body.email_id) {
            return res.status(200).json({
                status : 'failure',
                message : "Registration Failed, Name or Password or Email Id (not provided)",
            });
        }

        if(!validUserTypes.has(req.body.user_type)){
            return res.status(200).json({
                status : 'failure',
                message : "Registration Failed, User Type is not valid",
            });
        }

        let userTypeModel = studentModel;
        if(req.body.user_type === 'ta'){
            userTypeModel = taModel;
        }else if(req.body.user_type === 'teacher'){
            userTypeModel = teacherModel;
        }
        
        let userDoc = await userTypeModel.findOne({email_id : req.body.email_id});
        if(userDoc){
            return res.status(200).json({
                status : "failure",
                message : "Email Id Already exist"
            });
        }

        // creating user in respesctive type of model based on user type
        let encryptedPassword = await bcrypt.hash(req.body.password,10);
        userDoc = await userTypeModel.create({...req.body,password : encryptedPassword});

        let userObj = userDoc.toJSON();
        delete userObj.password
        userObj.user_type = req.body.user_type;

        res.status(200).json({
            status : 'success',
            user_details : userObj,
            message : "Successfully Registered",
        });

    } catch (error) {
        console.log('error at SERVER side ',error);
        res.status(500).json({
            status : "failure",
            message : "error occurred at Server",
            error : error
        });
    }

}

module.exports.handleUserLogin = async function(req,res){
    try {
        if(!req.body.email_id || !req.body.password) {
            return res.status(200).json({
                status : 'failure',
                message : "Login Failed Name or Password (not provided)",
            });
        }

        if(!validUserTypes.has(req.body.user_type)){
            return res.status(200).json({
                status : 'failure',
                message : "Login Failed, User Type is not valid",
            });
        }

        let userTypeModel = studentModel;
        if(req.body.user_type === 'ta'){
            userTypeModel = taModel;
        }else if(req.body.user_type === 'teacher'){
            userTypeModel = teacherModel;
        }
        
        var userDoc = await userTypeModel.findOne({email_id : req.body.email_id});
        if(!userDoc || !bcrypt.compareSync(req.body.password, userDoc.password)){
            return res.status(200).json({
                status : 'failure',
                message : "Login Failed, Invalid EmailId or Password"
            });
        }
        let userObj = userDoc.toJSON();
        delete userObj.password
        userObj.user_type = req.body.user_type;
        res.status(200).json({
            status : "success",
            message : "Login successfully",
            access_token : jsonwebtoken.sign(userObj,process.env.jwt_key,{expiresIn: expireTime}),
            user_details : userObj,
        });

    } catch (error) {
        console.log('error at SERVER side ',error);
        res.status(500).json({
            status : "failure",
            message : "error occurred at Server",
            error : error
        });
    }
};

module.exports.getUsersList = async function(req,res){
    try {
        if(!validUserTypes.has(req.query.user_type)) {
            return res.status(200).json({
                status:'failure',
                message : "Request Failed, User Type is not valid",
            });
        }

        let userTypeModel = studentModel;
        if(req.query.user_type === 'ta'){
            userTypeModel = taModel;
        }else if(req.query.user_type === 'teacher'){
            userTypeModel = teacherModel;
        }
        
        var usersDocsArray = await userTypeModel.find();
        let usersObjArray = [];
        let userObj;
        for(let userDoc of usersDocsArray){
           userObj = userDoc.toJSON();
           // deleting password field while sending user list to client
           delete userObj.password;
           usersObjArray.push(userObj);
        }
        res.status(200).json({
            status : 'success',
            users_list : usersObjArray,
        });
    } catch (error) {
        console.log('error at SERVER side ',error);
        res.status(500).json({
            status : "failure",
            message : "error occurred at Server",
            error : error
        });
    }

}