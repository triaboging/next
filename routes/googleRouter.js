const Router = require('express')
const router = new Router()
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get('/registration/google',
 passport.authenticate('google',{scope : ['email', 'profile']}));


router.get(`/registration/google/callback`,
  passport.authenticate('google', {
      successRedirect: CLIENT_HOME_PAGE_URL,
      failureRedirect: CLIENT_HOME_PAGE_URL
  })

);
router.get("/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});
module.exports = router;