const Conversation = require("../models/conversationSchema");
const Ads = require("../models/adSchema");

module.exports.createMessage = async (
  message,
  senderId,
  recieverId,
  adId,
  senderRole
) => {
  try {
    console.log("In here");
    const clientId = senderRole == "client" ? senderId : recieverId;
    const freelancerId = senderRole == "freelancer" ? senderId : recieverId;
    // const { error, data } = validateConversationSchema({
    //   adId,
    //   clientId,
    //   freelancerId,
    // });

    // if (error) {
    //   return utils.sendError(res, error.details[0].message);
    // }

    const ad = await Ads.findById(adId);
    if (!ad) {
      return utils.sendError(res, "Ad doesn't exist");
    }
    if (ad.freelancer._id.equals(freelancerId) == false) {
      return false;
    }
    console.log("In here 2");
    let conversation = await Conversation.findOne({
      adId: adId,
      clientId: clientId,
      freelancerId: freelancerId,
    });
    console.log("In here 3");
    if (!conversation) {
      conversation = await Conversation.create({
        adId: adId,
        clientId: clientId,
        freelancerId: freelancerId,
      });
    }
    const newMessage = { message: message, sender: senderId };
    conversation.messages.push(newMessage);
    console.log("Created message");
    await conversation.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
