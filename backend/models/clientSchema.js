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
  },

  ifOAuth: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  profilePicPath: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  workingWith: [
    {
      freelancerId: {
        type: Schema.Types.ObjectId,
        ref: "freelancers",
      },
      freelancerName: {
        type: String,
        required: true,
      },
      freelancerEmail: {
        type: String,
        required: true,
      },
      adId: {
        type: Schema.Types.ObjectId,
        ref: "ads",
        required: true,
      },
      adTitle: {
        type: String,
        required: true,
      },
      isAdActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
  bookMarkedAds:[
    {
      type:Schema.Types.ObjectId,
      ref:"ad"
    }
  ]
});

const client = mongoose.model("client", clientSchema);

module.exports = client;
