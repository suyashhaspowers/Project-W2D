const Playlist = require('../../models/Playlist');
const User = require('../../models/User');

module.exports = (app) => {
    // #1: Create Playlist

    app.post('/api/playlist/create', (req, res, next) => {
        const {body} = req;
        const {url, thumbnailUrl, userId} = body;
        let {title} = body;

        console.log(body);

        if (!url) {
            return res.send({
                success: false,
                message: 'Error: URL cannot be blank.'
            });
        }
        if (!userId) {
            return res.send({
                sucess: false,
                message: 'Error: UserID cannot be blank.'
            })
        }
        if (!title) {
            title = url;
        }

        // Create playlist object
        const playlist = new Playlist();
        playlist.url = url;
        playlist.thumbnailUrl = thumbnailUrl;
        playlist.title = title;
        playlist.save(async (err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error. Unable to create playlist.' + err,
                });
            }
            User.findByIdAndUpdate(
                userId,
                {$push: {
                    playlists: doc
                }},
                {new: true} 
            , (err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error. Unable to save user.' + err,
                    });
                }
                return res.send({
                    success: true,
                    message: 'Sucessfully saved playlist and added to user.' + err,
                });
            });
            });


    });
    // #2: Read Playlist

    app.get('/api/playlist/get', (req, res, next) => {
        // Example query www.project-w2d.com/api/playlist/get?playlistId=342342342
        const { query } = req;
        const { playlistId } = query;

        if (!playlistId) {
            return res.send({
                success: false,
                message: "PlaylistID must be supplied."
            });
        }

        Playlist.findById(playlistId, (err, playlist) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Unable to find. Error caught: " + err, 
                });
            }

            return res.send({
                success: true,
                message: "Playlist found.",
                playlist: playlist,
            });
        })
    });

    // #3: Delete Playlist
    app.delete('/api/playlist/delete', (req, res) => {
        const {query} = req;
        const {playlistId} = query;

        if (!playlistId) {
            return res.send({
                success: false,
                message: "PlaylistID must be supplied."
            });
        }

        Playlist.findOneAndDelete({
            _id: playlistId
        }, (err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Unable to find and delete. Error: " + err, 
                });
            }
            return res.send({
                success: true,
                message: "Playlist found and successfully deleted."
            });
        });
    });
}