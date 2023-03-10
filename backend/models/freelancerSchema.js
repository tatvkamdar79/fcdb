const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const freelancer = new Schema({
  name: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  ads: [
    
  ]
});
