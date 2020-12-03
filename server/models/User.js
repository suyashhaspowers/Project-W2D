const mongoose = require('mongoose');
const { unique } = require('webpack-merge');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: '',
    minlength: 8,
    required: true,
  },
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist"
  }]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
