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
    unique: true,
  },
  recoveryEmail: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  ifOAuth: {
    type: Boolean,
  },

  password: {
    type: String,
    required: this.ifOAuth ? false : true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  ads: [
    {
      adId: Schema.Types.ObjectId,
      unique: true,
      ref: "ads",
    },
  ],
  workingWith: [
    {
      clientDetails: {
        clientId: {
          type: Schema.Types.ObjectId,
          ref: "clients",
          required: true,
        },
      },
      adDetails: {
        adId: {
          type: Schema.Types.ObjectId,
          ref: "ads",
          required: true,
        },
      },
    },
  ],
  transactionDetails: {
    accountNumber: {
      type: String,
      required: true,
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
