const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const freelancer = new Schema({
  name: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },

  // ADS

  // ads: [
  //   {
  //     adId: Schema.Types.ObjectId,
  //     ref: "ads",
  //   },
  // ],

  // TRANSACTIONS
  // transactionDetails: {
  //   accountNumber: {
  //     type: String,
  //     required: true,
  //   },
  //   upiId: {
  //     type: String,
  //     required: false,
  //   },
  //   upiNumber: {
  //     type: String,
  //     required: false,
  //   },

  // },
});
