const mongoose = require("mongoose");
const Freelancer = require("./freelancerSchema");

const Schema = mongoose.Schema;

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
  freelancer: Freelancer.schema,
  viewState: {
    type: Boolean,
    default: true,
    required: true,
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
