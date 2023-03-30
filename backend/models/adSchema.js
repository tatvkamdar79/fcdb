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
  coverPicPath: {
    type: String,
  },
  links: [
    {
      type: String,
      required: false,
    },
  ],
  freelancer: Freelancer.schema,
  clientIds: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "clients",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
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
  shortDescription: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
  revisions: {
    type: Number,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const ad = mongoose.model("ad", adSchema);

module.exports = ad;
