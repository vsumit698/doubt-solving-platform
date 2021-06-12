const {studentModel,taModel,doubtModel,teacherModel} = require('../models/exportModels');

module.exports.registerPatient = async function(req,res){
    
    try {
        if(!req.body.phone){
            return res.status(200).json({
                message : "phone field is not available",
            });
        }
        console.log('user',req.user);
        var patient = await patientModel.findOne({phone:req.body.phone});
        if(patient){
            return res.status(200).json({
                message : "Patient Already Exists",
                patient : patient
            });
        }

        
       
        patient = await patientModel.create({phone : req.body.phone});
        var doctor = await doctorModel.findById(req.user.id);
        doctor.patients.push(patient._id);
        doctor.save();

        res.status(200).json({
            message : "Patient Successfully Registered :)",
            patient : patient
        });
    } catch (error) {
        return res.status(500).json({
            message : "error occurred at Server :(",
            error : error
        });
    }
};

module.exports.getReportByStatus = async function(req,res){
    try {
        let status = req.params.status.toLowerCase();

        if(status!='positive-admit' && status!='negative' && status!='travelled-quarantine' && status!='symptoms-quarantine'){
            return res.status(200).json({
                message : "report status is invalid"
            });
        }
        var reports = await reportModel.find({status : status}).populate('patient','phone');
        if(reports.length==0){
            return res.status(200).json({
                message : "No Reports fot this valid Status :( "
            });
        }
        res.status(200).json({
            message : "Reports Found Successfully :)",
            reports : reports
        });
    } catch (error) {
        return res.status(500).json({
            message : "error occurred at Server :(",
            error : error
        });
    }
};
