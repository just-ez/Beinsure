const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { boolean } = require('webidl-conversions');
const Schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  plan: {
    type: String,
    default: "platinum",
    required: true,
  },
  isPaymentVerified: {
    type: Boolean,
    default: false,
  },
  verifyPaymentRef: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

Schema.pre('save', async function (next) {
    // if (!user.isModified('password')) return next();
 let salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
 next()

})
const USermodel = mongoose.model('user', Schema)

module.exports = USermodel