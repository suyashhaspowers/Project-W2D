const mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
  url: {
    type: String,
    default: '',
    required: true
  },
  title: {
    type: String,
    default: '',
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: 'https://comedyforacause.net/wp-content/uploads/2018/04/default-thumbnail.jpg'
  }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
