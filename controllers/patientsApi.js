const {studentModel,taModel,doubtModel,teacherModel} = require('../models/exportModels');

module.exports.createReport = async function(req,res){
    
    try {
        var patient = await patientModel.findById(req.params.id);
        if(patient){
            
            let status = req.body.status.toLowerCase();
            if(status!='positive-admit' && status!='negative' && status!='travelled-quarantine' && status!='symptoms-quarantine'){
                return res.status(200).json({
                    message : "report status is invalid"
                });
            }
            var report = await reportModel.create({
                doctor : req.user.name,
                patient : patient._id,
                status : status
            });
            
            patient.reports.push(report._id);
            patient.save();

            return res.status(200).json({
                message : "Patient Report Created :)",
                report : report
            });
        }
        res.status(200).json({
            message : "Patient Not Found :("
        });
    } catch (error) {
        return res.status(500).json({
            message : "error occurred at Server :(" ,
            error : error
        });
    }
};
module.exports.getReportByPatient = async function(req,res){
    try {
        var patient = await patientModel.findById(req.params.id);
        if(patient){

            var patient = await patient.populate('reports','status doctor').execPopulate();

            return res.status(200).json({
                message : "Patient Reports Found ",
                patient : patient
            });
        }
        res.status(200).json({
            message : "Patient Not Found :("
        });
    }catch (error) {
        return res.status(500).json({
            message : "error occurred at Server :(" ,
            error : error
        });
    }
};