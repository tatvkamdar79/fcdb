const Ads = require("../models/adSchema");
const Freelancer = require("../models/freelancerSchema");
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
