const Playlist = require('../../models/Playlist');
const User = require('../../models/User');

module.exports = (app) => {
    // #1. Get User Data
    app.get('/api/user/get', (req, res) => {
        const {query} = req;
        const { userId } = query;

        if (!userId) {
            return res.send({
                success: false,
                message: "UserId must be supplied."
            });
        }

        User.findById(userId, (err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Cannot find User. Error: " + err,
                });
            }
            return res.send({
                success: true,
                message: "User found!",
                user: user,
            });
        })
    });
}