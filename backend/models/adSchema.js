const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ad = new Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  links: [
    {
      type: String,
      required: false,
    },
  ],
  freelancerId: {
    type: mongoose.ObjectId,
    ref: "freelancers",
  },
  viewState: {
    type: Boolean,
    default: true,
    require: true,
  },
});
