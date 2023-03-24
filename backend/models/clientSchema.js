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
  workingWith: [
    {
      freelancerId: {
        type: Schema.Types.ObjectId,
        ref: "freelancers",
        required: true,
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
    },
  ],
});

const client = mongoose.model("client", clientSchema);

module.exports = client;
