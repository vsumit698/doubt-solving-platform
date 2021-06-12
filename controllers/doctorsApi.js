const {studentModel,taModel,doubtModel,teacherModel} = require('../models/exportModels');
const jsonwebtoken = require('jsonwebtoken');

module.exports.registerDoctor = async function(req,res){
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

module.exports.loginDoctor = async function(req,res){
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