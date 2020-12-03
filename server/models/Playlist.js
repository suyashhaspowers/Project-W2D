const mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
  url: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
