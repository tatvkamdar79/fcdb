

const passport = require('passport')
const Googlestrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require("mongoose");

const User = mongoose.model('users');
passport.serializeUser((user,done) => {
    console.log("cookie injected")
    done(null,user.id);
})

passport.deserializeUser((id,done) => {
    console.log("Cookied retrieved");
    User.findById(id).then(user => {
        done(null,user);
    });
});


passport.use(new Googlestrategy({
    clientID:keys.Google_client_id,
    clientSecret:keys.Google_client_secret,
    callbackURL:'/auth/google/callback'
},async (accessToken,refreshToken,profile,done) => {
    const existingUser = await User.findOne({googleId:profile.id});
    if(existingUser){
        done(null,existingUser);
    }
    else{
        const obj = await new User({googleId:profile.id}).save();
        done(null,obj);


    }
    
    
    
}));

