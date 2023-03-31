const Conversation = require("../models/conversationSchema");
const Ads = require("../models/adSchema");
const Freelancer = require("../models/freelancerSchema");
const Client = require("../models/clientSchema");
const utils = require("../utils/response");
const validateConversationSchema = require("../models/conversationSchema");

module.exports.createMessage = async (req, res) => {
  try {
    const adId = req.body.adId;
    const clientId = req.body.clientId;
    const freelancerId = req.body.freelancerId;
    const {error,data} = validateConversationSchema({adId,clientId,freelancerId});

    if(error){
      return utils.sendError(res, error.details[0].message);
    }

    const ad = await Ads.findById(adId);
    if (!ad) {
      return utils.sendError(res, "Ad doesn't exist");
    }
    if (ad.freelancer._id.equals(freelancerId) == false) {
      return utils.sendError(
        res,
        "Ad doesn't belong to the freelancer that you are trying to message"
      );
    }
    let conversation = await Conversation.findOne({
      adId: adId,
      clientId: clientId,
      freelancerId: freelancerId,
    });
    if (conversation.length == 0) {
      conversation = await Conversation.create({
        adId: adId,
        clientId: clientId,
        freelancerId: freelancerId,
      });
    }
    const newMessage = { message: req.body.message, sender: req.user._id };
    conversation.messages.push(newMessage);
    await conversation.save();
    utils.sendSuccess(res, "Message sent successfully");
  } catch (err) {
    utils.sendError(res, "Some error occurred");
    console.log(err);
  }
};
