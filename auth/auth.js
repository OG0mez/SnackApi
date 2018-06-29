const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const db = require('../db/db.js')

let jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
jwtOptions.secretOrKey = 'sc2';
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    //we call the database if returns null we fail the authentication
    db.Users.findOne({
        attributes: [
            "id",
            ["is_admin","admin"]
        ],
        where : {
            id : jwt_payload.id
        }
    }).then(result => {
        if (result) {
            next(null, result);
        } else {
            next(null, false)
        }
    });
});

passport.use(strategy);



module.exports = {
    passport,
    jwtOptions
}


