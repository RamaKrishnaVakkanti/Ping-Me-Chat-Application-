const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authorization = require('../Controller/authorization');
require('../authorization/passport');

router.get('/login',passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/login/redirect',passport.authenticate( 'google', { 
    failureRedirect: '/login'
}),(req, res)=>{
    const token = jwt.sign({data: req.user}, process.env.SECRET_KEY, {expiresIn: '30m'});
    res.redirect(`https://ping-me-chat-app.herokuapp.com?token=${token}`);
});
router.get('/validate',authorization);
module.exports = router;
