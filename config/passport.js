const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        }
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            console.error(err);
        }
  });
}
    
//Code from Mayan and Trav which was deprecated 4/27/23
//passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user))
// })

//commment on Mayan YT Traversy code
// passport.deserializeUser(async function (id, done) {
//         try {
//             const user = await User.findById(id);
//             done(null, user);
//         } catch (err) {
//             console.error(err);
//         }
//   });


//Dreys code for the function above
// passport.deserializeUser(async(id,done) => {
//         try{
//             let user = await User.findById(id)
//             if(!user){
//                 return done(new Error('user not found'))
//             }
//             done(null, user)
//         } catch (err){
//             console.error(err)
//         }
//     })