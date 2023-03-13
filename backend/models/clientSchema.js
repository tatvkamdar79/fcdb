const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  recoveryEmail: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  ifOAuth: {
    type: Boolean,
  },

  password: {
    type: String,
    required: this.ifOAuth ? false : true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const client = mongoose.model("client", clientSchema);

module.exports = client;
