const {studentModel,taModel,doubtModel,teacherModel} = require('../models/exportModels');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const validUserTypes = new Set(['student','ta','teacher']);

module.exports.handleUserRegistration = async function(req,res){
    try {

        if(!req.body.name || !req.body.password || !req.body.email_id) {
            return res.status(200).json({
                status : 'failure',
                message : "Name or Password or Email Id (not provided)",
            });
        }

        if(!validUserTypes.has(req.body.user_type)){
            return res.status(200).json({
                status : 'failure',
                message : "User Type is not valid",
            });
        }

        let userTypeModel = studentModel;
        if(req.body.user_type === 'ta'){
            userTypeModel = taModel;
        }else if(req.body.user_type === 'teacher'){
            userTypeModel = teacherModel;
        }
        
        let user = await userTypeModel.findOne({email_id : req.body.email_id});
        if(user){
            return res.status(200).json({
                status : "failure",
                message : "Email Id Already exist"
            });
        }

        // creating user in respesctive type of model based on user type
        let encryptedPassword = await bcrypt.hash(req.body.password,10);
        user = await userTypeModel.create({...req.body,password : encryptedPassword});
        
        res.status(200).json({
            status : 'success',
            user_details : user,
            message : "Successfully Registered",
        });

    } catch (error) {
        console.log('error at SERVER side ',error);
        res.status(500).json({
            message : "error occurred at Server :(",
            error : error
        });

    }

}

module.exports.handleUserLogin = async function(req,res){
    try {
        // console.log(req.body);

        if(!req.body.name || !req.body.password) {
            return res.status(200).json({
                message : "NAME or PASSWORD (not provided)",
            });
        }

        var doctor = await doctorModel.findOne({name : req.body.name});
        if(!doctor){
            const doctor = await doctorModel.create(req.body);
            return res.status(200).json({
                message : "Doctor Successfully Registered :) ",
                doctor : doctor
            });
        }
        res.status(200).json({
            message : "USERNAME is not Available :("
        });
    } catch (error) {
        return res.status(500).json({
            message : "error occurred at Server :(",
            error : error
        });
    }
};

module.exports.getUsersList = async function(req,res){
    try {
        if(!req.body.name || !req.body.password) {
            return res.status(200).json({
                message : "NAME or PASSWORD (not provided)",
            });
        }
        
        var doctor = await doctorModel.findOne({name : req.body.name});
        if(!doctor || doctor.password != req.body.password){
            return res.status(200).json({
                message : "Invalid UserName or Password :("
            });
        }
        res.status(200).json({
            message : "successfully generated token by JWT",
            access_token : jsonwebtoken.sign(doctor.toJSON(),process.env.jwt_key,{expiresIn:'1000000'})
        });
    } catch (error) {
        res.status(500).json({
            message : "error occurred at Server :(",
            error : error
        });
    }

}