const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('../db/db.js');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass'
},
    (user, password, cb) => {
        return _.findUser(user, password)
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'incorrect user or password' });
                }
                return cb(null, user, { message: 'Logged In Successfully' });
            }).catch(err => cb(err))

    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'sc2'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return _.Users.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));
