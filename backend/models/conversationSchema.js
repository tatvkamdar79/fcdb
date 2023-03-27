const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const objectId = Schema.Types.ObjectId;

const conversationSchema = new Schema({
  adId: {
    type: objectId,
    ref: "ads",
    required: true,
  },
  freelancer: {
    type: objectId,
    ref: "freelancers",
    required: true,
  },
  client: {
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
      timestamps: { createdAt: true, updatedAt: false },
    },
  ],
});

const conversation = mongoose.model("conversation", conversationSchema);

module.exports = conversation;
