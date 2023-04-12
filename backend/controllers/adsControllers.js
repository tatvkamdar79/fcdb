const Ads = require("../models/adSchema");
const Freelancer = require("../models/freelancerSchema");
const Client = require("../models/clientSchema");
const UnconfirmedPurchase = require("../models/unconfirmedPurchaseSchema");
const utils = require("../utils/response");
const { response } = require("express");
const pictureController = require("./pictures_controllers");
const validateAdSchema = require("../validators/adSchema");

module.exports.getAdsOnCategoryName = async function (req, res) {
  const categoryName = req.params.categoryName;
  console.log(categoryName);
  try {
    const ads = await Ads.find({ category: categoryName });
    utils.sendSuccess(res, `Ads on category ${categoryName}`, ads);
  } catch (err) {
    utils.sendError(res, err);
  }
};

module.exports.createAd = async function (req, res) {
  if (req.role == "client") {
    return utils.sendError(res, "You are not allowed to create Ads");
  }

  try {
    //Validating the ad object
    const { error, data } = validateAdSchema.validate(req.body);
    if (error) {
      return utils.sendError(res, error.details[0].message);
    }

    const newAd = await Ads.create({
      ...req.body,
      freelancer: req.user,
      coverPicPath: req.uploadedFilePath,
    });
    console.log(newAd);
    const res1 = await Freelancer.updateOne(
      { email: req.user.email },
      { $push: { ads: newAd._id } }
    );
    console.log(res1);
    if (newAd && res1.modifiedCount == 1) {
      utils.sendSuccess(res, "Ad created successfully", newAd);
    } else {
      utils.sendError(res, "Ad creation failed");
    }
  } catch (err) {
    utils.sendError(res, `Some error occurred while creating, ${err}`);
    // console.log(err);
  }
};

function buildObjectDetails(prefix, document) {
  let obj = {};
  obj[prefix + "Id"] = document._id;
  obj[prefix + "Name"] = document.name;
  obj[prefix + "Email"] = document.email;
  return obj;
}

module.exports.deleteAd = async (req, res) => {
  if (req.role == "client") {
    return utils.sendError(res, "You are not allowed to delete Ads");
  }
  try {
    const ad = await Ads.findById(req.params.adId);
    if (!ad) {
      return utils.sendError(res, "Ad not found");
    }
    if (ad.freelancer._id.equals(req.user._id) == false) {
      return utils.sendError(
        res,
        "You are not allowed to delete Ads, only the creator can delete the Ad"
      );
    }
    const activeClients = ad.clientIds.filter((obj) => obj.isActive);
    if (activeClients.length > 0) {
      return utils.sendError(res, "Can't delete Ad that has active clients");
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
          { _id: clientId.id },
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

module.exports.endAdContract = async (req, res) => {
  if (req.role == "freelancer") {
    return utils.sendError(
      res,
      "Only Clients are allowed to end the Ad contract"
    );
  }
  try {
    let ad = await Ads.findById(req.body.adId);
    const isAdPresentAndActive = ad.clientIds.filter(
      (obj) => req.user._id.equals(obj._id) && obj.isActive
    );
    if (isAdPresentAndActive.length == 0) {
      return utils.sendError(res, "Ad is not active");
    }
    let results = await Promise.all([
      Ads.updateOne(
        { _id: ad._id, "clientIds.id": req.user._id },
        { "clientIds.isActive": false }
      ),
      Client.updateOne(
        { _id: req.user._id, "workingWith.adId": ad._id },
        { "workingWith.$.isAdActive": false }
      ),
      Freelancer.updateOne(
        { _id: ad.freelancer._id, "workingWith.adId": ad._id },
        { "workingWith.$.isAdActive": false }
      ),
    ]);
    for (const result of results) {
      if (result.acknowledged == false || result.modifiedCount != 1) {
        return utils.sendError(res, "Some error occurred while updating");
      }
    }
    utils.sendSuccess(res, "Contract resolved successfully");
  } catch (err) {
    utils.sendError(res, "Some error has occurred");
    console.log(err);
  }
};

module.exports.updateAd = async (req, res) => {
  if (req.role == "client") {
    return utils.sendError(res, "You are not allowed to delete Ads");
  }
  console.log("Printing Req.Body", req.body);
  try {
    let ad = await Ads.findById(req.params.adId);
    if (ad.freelancer._id.equals(req.user._id) == false) {
      return utils.sendError(
        res,
        "You are not allowed to delete Ads, only the creator can delete the Ad"
      );
    }
    ad = await Ads.updateOne({ _id: ad._id }, { ...req.body.ad });
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

const confirmAd = async (req, res) => {
  try {
    const ad = await Ads.findById(req.body.adId);
    if (!ad) {
      return utils.sendError(res, "Ad not found");
    }
    const isAdAlreadyBought = ad.clientIds.filter((obj) =>
      obj._id.equals(req.body.clientId)
    );
    if (isAdAlreadyBought.length > 0) {
      return utils.sendError(res, "Ad is already bought");
    }
    const getClient = Client.findById(req.body.clientId);
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

module.exports.buyAd = async (req, res) => {
  const adId = req.body.adId;
  const freelancerId = req.body.freelancerId;
  const clientId = req.body.clientId;
  let ad = await Ads.findById(adId);
  if (!ad.freelancer._id.equals(freelancerId)) {
    return utils.sendError(
      res,
      "Invalid request, ad freelancer and provided freelancer id is different"
    );
  }
  let unconfirmedPurchase = await UnconfirmedPurchase.findOne({
    adId: adId,
    freelancerId: freelancerId,
    clientId: clientId,
  });
  if (unconfirmedPurchase == null) {
    unconfirmedPurchase = await UnconfirmedPurchase.create({
      adId: adId,
      freelancerId: freelancerId,
      clientId: clientId,
    });
  }
  if (req.role == "client") {
    unconfirmedPurchase.clientStatus = "true";
  } else {
    unconfirmedPurchase.freelancerStatus = "true";
  }
  await unconfirmedPurchase.save();
  if (
    unconfirmedPurchase.clientStatus == true &&
    unconfirmedPurchase.freelancerStatus == true
  ) {
    await UnconfirmedPurchase.deleteOne({
      adId: adId,
      freelancerId: freelancerId,
      clientId: clientId,
    });
    return confirmAd(req, res);
  }
  utils.sendSuccess(res, "Confirmation of the order sent", {});
};

module.exports.unconfirmedAds = async (req, res) => {
  console.log("Hello bhai");
  // return;
  const allUnconfirmedAds = await UnconfirmedPurchase.find({
    freelancerId: req.user._id,
  })
    .populate("clientId")
    .populate("adId");
  const correctAds = allUnconfirmedAds.filter((ad) => {
    return ad.adId != null;
  });
  utils.sendSuccess(res, "", correctAds);
};
