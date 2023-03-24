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
    throw err;
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
    console.log(ad);
    const getClient = Client.findById(req.user._id);
    const getFreelancer = Freelancer.findById(ad.freelancer._id);
    let [client, freelancer] = await Promise.all([getClient, getFreelancer]);
    const adDetails = {
      adId: ad._id,
      adTitle: ad.title,
    };
    client.workingWith.push({
      ...buildObjectDetails("freelancer", freelancer),
      ...adDetails,
    });
    freelancer.workingWith.push({
      ...buildObjectDetails("client", client),
      ...adDetails,
    });
    await client.save();
    await freelancer.save();
    utils.sendSuccess(res, "Ad bought", {});
  } catch (err) {
    utils.sendError(res, "Some error has occurred");
    throw err;
  }
};
