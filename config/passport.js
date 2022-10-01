const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user.mode");
const bcrypt = require("bcrypt");


passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.find({email});
      console.log(user);
      if (user.length === 0) {
        return done(null, false, { message: "user not found" });
      }

      if (!bcrypt.compare(password, user[0].password)) {
        return done(null, false, { message: "password not match" });
      }

      return done(null, user);
    } catch (error) {
      console.log(error);
    }
  })
);

passport.serializeUser(function (user, done) {
    console.log(user,done);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(id);
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
    
  }
});
