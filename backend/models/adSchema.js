const mongoose = require("mongoose");
const Freelancer = require("./freelancerSchema");
const Schema = mongoose.Schema;

const l = {
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
};

const adSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  links: [
    {
      type: String,
      required: false,
    },
  ],
  freelancer: l,
  viewState: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
  },
  category: {
    type: String,
    required: true,
  },
});

const ad = mongoose.model("ad", adSchema);

module.exports = ad;
