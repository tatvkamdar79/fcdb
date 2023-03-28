const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unconfirmedAdSchema = new Schema({
  adId: {
    type: Schema.Types.ObjectId,
    ref: "ads",
  },
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: "freelancers",
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "clients",
  },
  freelancerStatus: {
    type: Boolean,
    default: false,
  },
  clientStatus: {
    type: Boolean,
    default: false,
  },
});

const unconfirmedAd = mongoose.model("unconfirmedAd", unconfirmedAdSchema);

module.exports = unconfirmedAd;
