const { renderSync } = require('node-sass');
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    // Sign In / Sign-Up API
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const { googleId } = body;
        let { email } = body;

        console.log(body);

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!googleId) {
            return res.send({
                success: false,
                message: 'Error: Google ID cannot be blank.'
            });
        }
        email = email.toLowerCase();

        // Step 1. Check to see that user exists w/ same email
        // If they do, create session
        // If they do not, crete user and then create session

        let userId = null;
        let initMessage = "";

        User.find({
            email: email,
            googleId: googleId,
        }, async (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error. Cannot find user. ' + err,
                });
            } else if (users.length === 0) {
                // Create user instance
                // Step 2. Save
                const newUser = new User();
                newUser.email = email;
                newUser.googleId = googleId;
                try {
                    const user = await newUser.save()
                    userId = user._id;
                    initMessage = "Sign Up Successful. ";
                } catch (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Could not create account. ' + err,
                    });
                }
            } else if (users.length > 1) {
                return res.send({
                    success: false,
                    message: 'Error: Duplicate accounts exist under this email.'
                });
            } 

            if (userId === null) {
                const user = users[0];
                userId = user._id;
            }

            // Step 3. Create User Session
            let userSession = new UserSession();
            userSession.userId = userId;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error. Unable to sign-in.' + err,
                    });
                }

                return res.send({
                    success: true,
                    message: initMessage + 'Valid sign in!',
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