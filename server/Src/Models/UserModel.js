const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide First Name of User'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide Email of User'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    select: false,
  },
  profilePic: {
    type: String,
    default: 'http://localhost:3002/default.jpg',
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePass = async function (userPass, dbPass) {
  return await bcrypt.compare(userPass, dbPass);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
