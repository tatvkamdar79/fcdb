

const passport = require('passport')
const Googlestrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");

passport.serializeUser((user,done) => {
    console.log("cookie injected")
    done(null,{
        "hrithik":"jain"
    });
})

passport.deserializeUser((id,done) => {
    console.log("Cookied retrieved");
    done(null,{
        "hrithik":"jain"
    });
    
    // User.findById(id).then(user => {
    //     done(null,user);
    // });
});


passport.use(new Googlestrategy({
    clientID:process.env.Google_client_id,
    clientSecret:process.env.Google_client_secret,
    callbackURL:'/auth/google/callback'
},async (accessToken,refreshToken,profile,done) => {
    done(null,{
        "hrithik":"jain"
    });

    // const existingUser = await User.findOne({googleId:profile.id});
    // if(existingUser){
    //     done(null,existingUser);
    // }
    // else{
    //     const obj = await new User({googleId:profile.id}).save();
    //     done(null,obj);


    // }
    
    
    
}));

