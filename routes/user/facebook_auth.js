const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport');
const User = require('../../model/User')
const session = require('express-session');
const router = require('express').Router();

router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_API_KEY,
    clientSecret: process.env.FACEBOOK_API_SECRET,
    callbackURL: process.env.CALL_BACK_URL_FACEBOOOK
},
    function (request, accessToken, refreshToken, profile, done) { 
        return done(null, profile);
    }
));

// Auth 
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// Auth Callback
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/facebook/callback/success',
        failureRedirect: '/auth/facebook/callback/failure'
    }));

// Success 
router.get('/auth/facebook/callback/success', (req, res) => {
    res.send(`Welcome ${req.user.displayName}<br><br><button><a href='/'>log out</a></button> `);
});

// failure
router.get('/user/callback/failure', (req, res) => {
    try {
        res.redirect('/');
    } catch (error) {
        console.log(error, "error")
        res.send("Error");
    }
})

module.exports = router