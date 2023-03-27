const Ads = require("../models/adSchema");
const Freelancer = require("../models/freelancerSchema");
const Client = require("../models/clientSchema");
const utils = require("../utils/response");

module.exports.getAdsOnCategoryName = async function (req, res) {
  const categoryName = req.params.categoryName;
  try {
    const ads = await Ads.find({ category: categoryName });
    utils.sendSuccess(res, `Ads on category ${categoryName}`, ads);
  } catch (err) {
    utils.sendError(res, err);
  }
};

module.exports.createAd = async function (req, res) {
  try {
    const newAd = await Ads.create({ ...req.body, freelancer: req.user });
    const res1 = await Freelancer.updateOne(
      { email: req.user.email },
      { $push: { ads: newAd._id } }
    );
    if (newAd && res1.modifiedCount == 1) {
      utils.sendSuccess(res, "Ad created successfully", newAd);
    } else {
      utils.sendError(res, "Ad creation failed");
    }
  } catch (err) {
    utils.sendError(res, `Some error occurred while creating, ${err}`);
    console.log(err);
  }
};

function buildObjectDetails(prefix, document) {
  let obj = {};
  obj[prefix + "Id"] = document._id;
  obj[prefix + "Name"] = document.name;
  obj[prefix + "Email"] = document.email;
  return obj;
}

module.exports.buyAd = async (req, res) => {
  if (req.role == "freelancer") {
    return utils.sendError(res, "You are not allowed to buy Ads");
  }
  try {
    const ad = await Ads.findById(req.params.adId);
    if (!ad) {
      return utils.sendError(res, "Ad not found");
    }
    const isAdAlreadyBought = ad.clientIds.filter((id) =>
      id.equals(req.user._id)
    );
    if (isAdAlreadyBought.length > 0) {
      return utils.sendError(res, "Ad is already bought");
    }
    const getClient = Client.findById(req.user._id);
    const getFreelancer = Freelancer.findById(ad.freelancer._id);
    let [client, freelancer] = await Promise.all([getClient, getFreelancer]);
    const adDetails = {
      adId: ad._id,
      adTitle: ad.title,
    };
    ad.clientIds.push(client._id);
    client.workingWith.push({
      ...buildObjectDetails("freelancer", freelancer),
      ...adDetails,
    });
    freelancer.workingWith.push({
      ...buildObjectDetails("client", client),
      ...adDetails,
    });
    await Promise.all([ad.save(), client.save(), freelancer.save()]);
    utils.sendSuccess(res, "Ad bought", {});
  } catch (err) {
    utils.sendError(res, "Some error has occurred");
    console.log(err);
  }
};

module.exports.deleteAd = async (req, res) => {
  if (req.role == "client") {
    return utils.sendError(res, "You are not allowed to delete Ads");
  }
  try {
    const ad = await Ads.findById(req.params.adId);
    if (ad.freelancer._id.equals(req.user._id) == false) {
      return utils.sendError(
        res,
        "You are not allowed to delete Ads, only the creator can delete the Ad"
      );
    }
    let promises = [
      Freelancer.updateOne(
        { _id: req.user._id },
        { $pull: { ads: { adId: ad._id } } }
      ),
    ];
    for (const clientId of ad.clientIds) {
      promises.push(
        Client.updateOne(
          { _id: clientId },
          { $pull: { workingWith: { adId: ad._id } } }
        )
      );
    }
    const result = await Promise.all([
      ...promises,
      Ads.deleteOne({ _id: req.params.adId }),
    ]);
    // Check for result and success of query
    utils.sendSuccess(res, "Ad Deleted", {});
  } catch (err) {
    utils.sendError(res, "Some error has occurred");
    console.log(err);
  }
};

module.exports.updateAd = async (req, res) => {
  if (req.role == "client") {
    return utils.sendError(res, "You are not allowed to delete Ads");
  }
  try {
    let ad = await Ads.findById(req.params.adId);
    if (ad.freelancer._id.equals(req.user._id) == false) {
      return utils.sendError(
        res,
        "You are not allowed to delete Ads, only the creator can delete the Ad"
      );
    }
    ad = await Ads.updateOne({ _id: ad._id }, { ...req.body });
    const newAd = await Ads.findById(req.params.adId);
    if (ad.modifiedCount == 1) utils.sendSuccess(res, "Ad Updated", { newAd });
    else
      utils.sendError(res, "Some error occurred while updating the Ad", {
        newAd,
      });
  } catch (err) {
    utils.sendError(res, "Some error has occurred");
    console.log(err);
  }
};

module.exports.getClientsOnAd = async (req, res) => {
  let clients = [];
  for (const obj of req.user.workingWith) {
    if (obj.adId.equals(req.params.adId) && obj.isAdActive) {
      clients.push({
        clientId: obj.clientId,
        clientName: obj.clientName,
        clientEmail: obj.clientEmail,
      });
    }
  }
  utils.sendSuccess(res, `Clients on Ad ${req.params.adId}`, clients);
};

module.exports.getAd = async (req, res) => {
  let ad = await Ads.findById(req.params.adId);
  if (ad) {
    utils.sendSuccess(res, `Ad ${ad.title}`, ad);
  } else {
    utils.sendError(res, "No such Ad found");
  }
};
