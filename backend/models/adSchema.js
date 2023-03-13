const mongoose = required("mongoose");

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
  freelancerId: {
    type: mongoose.ObjectId,
    ref: "freelancers",
  },
  viewState: {
    type: Boolean,
    default: true,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
  },
  maxPrice: {
    type: Number,
    required: true,
    min: this.minPrice,
    max: 100000,
  },
});

const ad = mongoose.model("ad", adSchema);

module.exports = ad;
