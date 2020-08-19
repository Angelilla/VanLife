const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

// HELPER FUNCTIONS
const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../helpers/middlewares");

//  POST '/signup'
router.post('/signup', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {

    const { username, email, password } = req.body;
    try {
        const usernameExists = await User.findOne({ username }, "username");
        const emailExists = await User.findOne({ email }, "email");
        //console.log(usernameExists, emailExists)
        if (usernameExists || emailExists) return next(createError(400));
        else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashPass = bcrypt.hashSync(password, salt);
            const newUser = await User.create({ username, email, password: hashPass });

            req.session.currentUser = newUser;
            res
            .status(200) 
            .json(newUser);
        }
    }
    catch (error) {
        next(error);
    }
});

//  POST '/login'
router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            next(createError(404));
        } else if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.status(200).json(user);
            return;
        } else {
            next(createError(401));
        }
    }
    catch (error) {
        next(error);
    }
});

// POST '/logout'
router.post("/logout", isLoggedIn(), (req, res, next) => {
    req.session.destroy();
    res
      .status(204) 
      .send();
    return;
});


module.exports = router;