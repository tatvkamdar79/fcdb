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

  ifOAuth: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const client = mongoose.model("client", clientSchema);

module.exports = client;
