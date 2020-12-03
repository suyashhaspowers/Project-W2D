const { renderSync } = require('node-sass');
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
var validator = require("email-validator");


module.exports = (app) => {
    // Sign up API
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password
        } = body;

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        let lower_email = email.toLowerCase();

        // Step 1. Verify email doesn't exost

        User.find({
            email: lower_email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error. Cannot find any user.'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: A user with this email already exists.'
                });
            }
            // Step 2. Validate Email
            if (!validator.validate(email)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid email address'
                });
            }

            // Step 3. Save
            const newUser = new User();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = lower_email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Could not create account.'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Sign up succesful.'
                });
            });
        });
    });

    // Sign In API
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const { password } = body;
        let { email } = body;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        email = email.toLowerCase();

        // Step 1. Check to see that user exists w/ same email

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error. Cannot find user.'
                });
            } else if (users.length === 0) {
                return res.send({
                    sucess: false,
                    message: 'Error: A user under this email does not exist.'
                });
            } else if (users.length > 1) {
                return res.send({
                    success: false,
                    message: 'Error: Duplicate accounts exist under this email.'
                });
            }

            const user = users[0]; 

            // Step 2. Validate password entry in the form

            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid password.'
                });
            }

            // Step 3. Create User Session
            let userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error. Unable to sign-in.'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in!',
                    token: doc._id,
                });
            });
        });
    });

    // Verfy session API
    app.get('/api/account/verify', (req, res, next) => {
        // Step 1. Get the token from the query
        const { query } = req;
        const { token } = query;
        // ?token=test
        // ex. www.project-w2d.com/api/account/verify?token=test

        // Step 2. Verify token exists and is one of a kind

        UserSession.find({
            _id: token
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error. Unable to find user session.'
                });
            }

            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid token verification.'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Token verified.'
                });
            }
        })

    });

    // Log out and delete session API
    app.get('/api/account/logout', (req, res, next) => {
        // Step 1. Get the token from the query
        const { query } = req;
        const { token } = query;

        // Step 2. Delete user session if session document exists
        UserSession.deleteOne({
            _id: token,
        }, (err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error. Failed to sign out.'
                });
            }

            return res.send({
                success: true,
                message: 'User sucessfully logged out.'
            });
        })
    });
};