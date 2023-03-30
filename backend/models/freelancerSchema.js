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
  ifOAuth: {
    type: Boolean,
  },

  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  about: {
    type: String,
  },
  profilePicPath: {
    type: String,
  },
  ads: [
    {
      adId: {
        type: Schema.Types.ObjectId,
        ref: "ads",
      },
    },
  ],
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  workingWith: [
    {
      clientId: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        required: true,
      },
      clientName: {
        type: String,
        required: true,
      },
      clientEmail: {
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
