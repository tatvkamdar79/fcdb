const Client = require("../models/clientSchema");
const Freelancer = require("../models/freelancerSchema");
const Ads = require("../models/adSchema");
const utils = require("../utils/response");

module.exports.getAllUsers = async (req, res) => {
  const clients = new Promise((resolve, reject) => {
    resolve(Client.find());
  });

  const freelancers = new Promise((resolve, reject) => {
    resolve(
      Freelancer.find().populate({
        path: "ads",
        model: "ad",
        populate: {
          path: "_id",
        },
      })
    );
  });

  Promise.all([clients, freelancers])
    .then((values) => {
      utils.sendSuccess(res, "Got all users Successfully", {
        clients: values[0],
        freelancers: values[1],
      });
    })
    .catch((err) => {
      utils.sendError(res, "There was an error getting users");
    });
};

module.exports.deleteClient = async (req, res) => {
  console.log(req.body);
  let clientId = req.body.clientId;
  try {
    const response = await Client.findById(clientId);
    console.log(response);
    if (response === null) {
      utils.sendError(res, "Client does not exist!");
    } else if (response.workingWith.length > 0) {
      utils.sendError(
        res,
        "The client is working with Freelancers and cannot be deleted"
      );
    } else {
      let deletedClient = await Client.findByIdAndDelete(clientId);
      console.log(deletedClient);
      if (deletedClient._id.toString() === clientId) {
        console.log("User Deleted Successfully");
        utils.sendSuccess(
          res,
          `Deleted Client with\n E-mail -> ${deletedClient.email},\n name: ${deletedClient.name}\n Successfully`,
          {
            deleteCount: response.deletedCount,
          }
        );
      } else {
        utils.sendError(res, "Failed to Delete Client");
      }
    }
  } catch (err) {
    console.log("Deleting Failed", err);
    utils.sendError(res, "Error n deleting User");
  }
};

module.exports.deleteFreelancer = async (req, res) => {
  let freelancerId = req.body.freelancerId;
  let forcefulDelete = req.body.forcefulDelete;
  try {
    const freelancer = await Freelancer.findById(freelancerId);

    if (freelancer === null) {
      utils.sendError(res, "Freelancer does not exist");
      return;
    }

    if (freelancer.ads.length > 0) {
      utils.sendError(res, "Freelancer has Ads, Delete all Ads First");
      return;
    }

    if (freelancer.workingWith.length > 0) {
      res.sendError(res, "Freelancer has active Clients!");
      return;
    }

    console.log(freelancer);
    utils.sendSuccess(res, "Fethched Freelancer", freelancer);

    // else {
    //   let deletedClient = await Client.findByIdAndDelete(clientId);
    //   console.log(deletedClient);
    //   if (deletedClient._id.toString() === clientId) {
    //     console.log("User Deleted Successfully");
    //     utils.sendSuccess(
    //       res,
    //       `Deleted Client with\n E-mail -> ${deletedClient.email},\n name: ${deletedClient.name}\n Successfully`,
    //       {
    //         deleteCount: response.deletedCount,
    //       }
    //     );
    //   } else {
    //     utils.sendError(res, "Failed to Delete Client");
    //   }
    // }
  } catch (err) {
    console.log("Deleting Failed", err);
    utils.sendError(res, "Error n deleting User");
  }
};
