const mongoose = require('mongoose');
const { unique } = require('webpack-merge');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: '',
    unique: true,
    required: true,
  },
  googleId: {
    type: String,
    default: '',
    unique: true,
    required: true,
  },
  totalDonations: {
    type: Number,
    default: 0,
  },
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist"
  }]
});

module.exports = mongoose.model('User', UserSchema);
