const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;

const extractJWT = require('passport-jwt').ExtractJwt;
const studentModel = require('../models/studentModel');

var opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.jwt_key
};

passport.use(new jwtStrategy(opts,function(JWTpayload,done){
    console.log('querying db to find doctor');
    studentModel.findById(JWTpayload._id,function(error,doctor){
        if(error){
            console.log("error found while finding doctor at JWT",error);
        }
        if(doctor){
            return done(null,doctor);
        }
        return done(null,false);
    });

}));

module.exports = passport;