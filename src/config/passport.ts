import pJwt from 'passport-jwt';
import mongoose from 'mongoose';
import keys from './keys';
import type passport from 'passport';

const User = mongoose.model('users');

const opts = {
  jwtFromRequest: pJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

export default (passport: passport.PassportStatic) => {
  passport.use(new pJwt.Strategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch((err) => console.log(err));
  }));
};