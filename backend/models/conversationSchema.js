const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const objectId = Schema.Types.ObjectId;

const conversationSchema = new Schema({
  adId: {
    type: objectId,
    red: "ads",
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
        required: true,
      },
      sender: {
        type: objectId,
        enum: [this.freelancer, this.client],
        require: true,
      },
      timestamps: { createdAt: true, updatedAt: false },
    },
  ],
});

const conversation = mongoose.model("conversation", conversationSchema);

module.exports = conversation;
