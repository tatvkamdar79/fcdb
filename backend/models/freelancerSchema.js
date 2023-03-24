const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const freelancerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  about: {
    type: String,
    required: true,
  },
  ads: [
    {
      type: Schema.Types.ObjectId,
      ref: "ad",
    },
  ],
  workingWith: [
    {
      clientId: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        required: true,
      },
      adId: {
        type: Schema.Types.ObjectId,
        ref: "ads",
        required: true,
      },
    },
  ],
  transactionDetails: {
    accountNumber: {
      type: String,
      required: false,
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

const freelancer = mongoose.model("freelancer", freelancerSchema);

module.exports = freelancer;
