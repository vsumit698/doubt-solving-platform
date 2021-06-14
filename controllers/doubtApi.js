const {studentModel,taModel,doubtModel,teacherModel} = require('../models/exportModels');
const validTaActionsSet = new Set(['accept','resolve','escalate']);
const timeZone = "Asia/Kolkata";
const moment = require('moment-timezone');

module.exports.addDoubtHandler = async function(req,res){
    try {
        if(!req.body.title || !req.body.description){
            return res.status(200).json({
                status : 'failure',
                message : "Doubt Creation Failed, title or description not found"
            });
        }

        // access only given to student
        if(req.user.user_type !== 'student'){
            return res.status(200).json({
                status : 'failure',
                message : `Doubt Creation Failed, ${req.user.user_type} user-type not allowed`
            });
        }

        if(req.params.studentId !== req.user._id.toString()){
            return res.status(200).json({
                status : 'failure',
                message : "Doubt Creation Failed, Provided Student Id not matches"
            });
        }
        
        let doubtObj = {title : req.body.title,description : req.body.description, created_timestamp : `${moment.tz(timeZone).unix()}`,student_id : req.params.studentId};
        let doubtDoc = await doubtModel.create(doubtObj);
        
        return res.status(200).json({
            status : 'success',
            message : `Doubt Created successfully`,
            doubt_detail : doubtDoc.toJSON()
        });

    }catch (error) {
        return res.status(500).json({
            message : "error occurred at Server" ,
            error : error
        });
    }
};

module.exports.addCommentHandler = async function(req,res){
    try {
        if(!req.body.content){
            return res.status(200).json({
                status : 'failure',
                message : "Comment Creation Failed, Comment content not found"
            });
        }

        // access only given to student
        if(req.user.user_type !== 'student'){
            return res.status(200).json({
                status : 'failure',
                message : `Doubt Creation Failed, ${req.user.user_type} user-type not allowed`
            });
        }

        if(req.params.studentId !== req.user._id.toString()){
            return res.status(200).json({
                status : 'failure',
                message : "Doubt Creation Failed, Provided Student Id not matches"
            });
        }

        let doubtDoc = await doubtModel.findById(req.params.doubtId);

        if(!doubtDoc){
            return res.status(200).json({
                status : 'failure',
                message : `Doubt not exist`
            });
        }
        doubtDoc.comments.push({user_id : req.params.studentId, content : req.body.content, user_type : 'student', user_name : req.user.name});
        doubtDoc.save();
        return res.status(200).json({
            status : 'success',
            message : `Commented successfully on Doubt`,
            doubt_detail : doubtDoc.toJSON()
        });

    }catch (error) {
        console.log('error occured at server ',error);
        return res.status(500).json({
            message : "error occurred at Server" ,
            error : error
        });
    }
};

module.exports.getDoubtsList = async function(req,res){ 
    try {
        // access given to all user types
        let doubtsDocArray = await doubtModel.find();

        return res.status(200).json({
            status : 'success',
            doubt_list : doubtsDocArray
        });

    }catch (error) {
        console.log('error occured at server ',error);
        return res.status(500).json({
            message : "error occurred at Server" ,
            error : error
        });
    }
};

module.exports.taActionHandler = async function(req,res){
    try {
        if(!validTaActionsSet.has(req.params.taAction) || (req.params.taAction==='resolve' && !req.body.resolve_content)){
            return res.status(200).json({
                status : 'failure',
                message : "TA action credentials are invalid"
            });
        }

        // access only given to ta
        if(req.user.user_type !== 'ta'){
            return res.status(200).json({
                status : 'failure',
                message : `Doubt Creation Failed, ${req.user.user_type} user-type not allowed`
            });
        }

        if(req.params.taId !== req.user._id.toString()){
            return res.status(200).json({
                status : 'failure',
                message : `TA Action ${req.params.taAction} Discarded, Provided TA Id not matches`
            });
        }

        let doubtDoc = await doubtModel.findById(req.params.doubtId);

        if(!doubtDoc){
            return res.status(200).json({
                status : 'failure',
                message : `Doubt not exist`
            });
        }
        let taDoc = await taModel.findById(req.params.taId);
        
        if(req.params.taAction === 'accept' && doubtDoc.recent_ta_id==='' && doubtDoc.recent_ta_accept_timestamp===0 && doubtDoc.resolve_timestamp===0){
            // ta accept action is valid
            taDoc.doubt_accept_count += 1;
            doubtDoc.recent_ta_id = req.params.taId;
            doubtDoc.recent_ta_accept_timestamp = moment.tz(timeZone).unix();

        }else if(req.params.taAction === 'resolve' && doubtDoc.resolve_timestamp===0 && doubtDoc.recent_ta_id===req.params.taId && doubtDoc.recent_ta_accept_timestamp !== 0 ){
            // ta resolve action is valid
            taDoc.doubt_resolve_count += 1;
            doubtDoc.resolve_timestamp = moment.tz(timeZone).unix();
            doubtDoc.comments.push({user_id : req.params.taId, content : req.body.resolve_content, user_type : 'ta', user_name : taDoc.name});

            let taAvgDoubtActivityTime = taDoc.avg_doubt_activity_time;
            let currDoubtActivityTime = doubtDoc.resolve_timestamp - doubtDoc.recent_ta_accept_timestamp;

            taAvgDoubtActivityTime = ((taAvgDoubtActivityTime * (taDoc.doubt_resolve_count-1)) + currDoubtActivityTime)/taDoc.doubt_resolve_count;

            taDoc.avg_doubt_activity_time = taAvgDoubtActivityTime;

        }else if(req.params.taAction === 'escalate' && doubtDoc.resolve_timestamp===0 && doubtDoc.recent_ta_id===req.params.taId && doubtDoc.recent_ta_accept_timestamp !== 0){
            // ta escalate action is valid
            taDoc.doubt_escalated_count += 1;
            doubtDoc.escalate_count += 1;
            // changes needed to make it escalate
            doubtDoc.recent_ta_id = '';
            doubtDoc.recent_ta_accept_timestamp = 0;
        }else{
            // Invalid Action
            return res.status(200).json({
                status : 'failure',
                message : `TA action ${req.params.taAction} Invalid`
            });
        }

        taDoc.save();
        doubtDoc.save();
        
        return res.status(200).json({
            status : 'success',
            message : `TA action ${req.params.taAction} performed on Doubt`,
            doubt_detail : doubtDoc.toJSON()
        });

    }catch (error) {
        console.log('error occured at server ',error);
        return res.status(500).json({
            message : "error occurred at Server" ,
            error : error
        });
    }
};

module.exports.getTeacherDashboardData = async function(req,res){
    try {

        // access only given to teacher
        if(req.user.user_type !== 'teacher'){
            return res.status(200).json({
                status : 'failure',
                message : `Dashboard Data Access not Allowed for user-type ${req.user.user_type}`
            });
        }

        let dashboardDetails = {};

        let doubtsDocArray = await doubtModel.find();
        let totalDoubtResolutionTime = 0,doubtsResolved=0,doubtsEscalated=0;

        for(let doubtDocItem of doubtsDocArray){
            
            if(doubtDocItem.resolve_timestamp!==0 && doubtDocItem.created_timestamp!==0){

                totalDoubtResolutionTime += (doubtDocItem.resolve_timestamp - doubtDocItem.created_timestamp);
                doubtsResolved++;

            }
            if(doubtDocItem.escalate_count>0){
                doubtsEscalated ++;
            }
            
        }

        dashboardDetails.doubts_asked = doubtsDocArray.length;
        dashboardDetails.doubts_resolved = doubtsResolved;
        dashboardDetails.doubts_escalated = doubtsEscalated;
        dashboardDetails.avg_doubt_resolution_time = totalDoubtResolutionTime / doubtsResolved;

        dashboardDetails.ta_summary_list = [];

        let taDocArray = await taModel.find();
        
        for(let taDoc of taDocArray){
            dashboardDetails.ta_summary_list.push({
                doubt_accept_count : taDoc.doubt_accept_count,
                doubt_resolve_count : taDoc.doubt_resolve_count,
                doubt_escalated_count : taDoc.doubt_escalated_count,
                avg_doubt_activity_time : taDoc.avg_doubt_activity_time
            }); 
        }

        return res.status(200).json({
            status : 'success',
            dashboard_details : dashboardDetails
        });

    }catch (error) {
        console.log('error occured at server ',error);
        return res.status(500).json({
            message : "error occurred at Server" ,
            error : error
        });
    }
};
