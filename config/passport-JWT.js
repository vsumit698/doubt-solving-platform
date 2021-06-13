const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;

const extractJWT = require('passport-jwt').ExtractJwt;
const {studentModel,taModel,teacherModel} = require('../models/exportModels');

var optionsObj = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.jwt_key
};

passport.use(new jwtStrategy(optionsObj,function(JWTpayload,done){
    let userTypeModel = studentModel;
    if(JWTpayload.user_type === 'ta'){
        userTypeModel = taModel;
    }else if(JWTpayload.user_type === 'teacher'){
        userTypeModel = teacherModel;
    }

    userTypeModel.findById(JWTpayload._id,function(error,userDoc){
        if(error){
            console.log("error found while finding userDoc at JWT authentication",error);
        }
        if(userDoc){
            let userObj = userDoc.toJSON();
            userObj.user_type = JWTpayload.user_type;
            return done(null,userObj);
        }
        return done(null,false);
    });

}));

module.exports = passport;