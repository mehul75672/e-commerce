const GoogleStrategy = require("passport-google-oauth2").Strategy
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


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALL_BACK_URL_GOOGLE
},
  function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));


router.get('/', (req, res) => {
  res.send("<button><a href='/user'>Login With Google</a></button>")
});

// Auth 
router.get('/user', passport.authenticate('google', {
  scope:
      ['email', 'profile']
}));

// Auth Callback
router.get('/user/callback',
  passport.authenticate('google', {
      successRedirect: '/user/callback/success',
      failureRedirect: '/user/callback/failure'
  }));

// Success 
router.get('/user/callback/success', (req, res) => {
 
  if (!req.user)
      res.redirect('/user/callback/failure');
  res.send(`Welcome ${req.user.email}<br><br><image src="${req.user.picture}" height="20%" width="20%"> <br><br><button><a href='/'>log out</a></button> `);
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

module.exports=router