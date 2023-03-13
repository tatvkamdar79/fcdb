const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const freelancer = new Schema({
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
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  ads: [
    {
      adId: Schema.Types.ObjectId,
      ref: "ads",
    },
  ],
  transactionDetails: {
    accountNumber: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
      required: false,
    },
    upiNumber: {
      type: String,
      required: false,
    },
  },
});
