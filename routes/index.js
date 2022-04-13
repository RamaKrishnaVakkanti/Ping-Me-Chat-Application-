const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authorization = require('../Controller/authorization');
const config = require('../config/properties.json');
const chatHistory = require('../Controller/chatHistory');
require('../authorization/passport');

router.get('/login',passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/login/redirect',passport.authenticate( 'google', { 
    failureRedirect: '/login'
}),(req, res)=>{
    const token = jwt.sign({data: req.user}, process.env.SECRET_KEY, {expiresIn: '30m'});
    res.redirect(`${config.baseURL}?token=${token}`);
});
router.get('/validate',authorization);
router.get('/chatHistory', chatHistory);
module.exports = router;
