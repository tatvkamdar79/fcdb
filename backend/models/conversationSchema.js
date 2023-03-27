const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const objectId = Schema.Types.ObjectId;

const conversationSchema = new Schema({
  adId: {
    type: objectId,
    ref: "ads",
    required: true,
  },
  freelancerId: {
    type: objectId,
    ref: "freelancers",
    required: true,
  },
  clientId: {
    type: objectId,
    ref: "clients",
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
      },
      sender: {
        type: objectId,
      },
      isViewed: {
        type: Boolean,
        default: false,
      },
      timestamps: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const conversation = mongoose.model("conversation", conversationSchema);

module.exports = conversation;
