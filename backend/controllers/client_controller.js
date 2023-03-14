const Client = require("../models/clientSchema");

module.exports.yes = (req, res) => {
  console.log("YESSS");
};

module.exports.signUp = async function (req, res) {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      try {
        const newClient = await Client.create(req.body);
        console.log("In here");
        if (!newClient) {
          return res.json({
            status: 200,
            message: "Some error occurred",
          });
        } else {
          return res.json({
            status: 200,
            message: "User created successfully",
          });
        }
      } catch (err) {
        return res.json({
          status: 200,
          message: "Some error occurred",
        });
      }
    }
  } catch (err) {
    return res.json({
      status: 200,
      message: "Some error occurred",
    });
  }
};
