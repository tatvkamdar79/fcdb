
const FreeLancer = require("../models/freelancerSchema")
const Client = require("../models/clientSchema");
const utils = require("../utils/response");

module.exports.getPicture = async (req,res) => {

    if(req.role=='client'){
        try{
            const profilePicPath = await Client.findById(req.user.id,{"profilePicPath":1,"_id":0});
            console.log(profilePicPath);
            res.json(JSON.stringify({url:profilePicPath.profilePicPath}));

        }
        catch(err){
            console.log(err);
            return utils.sendError(res,err);
        }
    }
    else{
        try{
            const profilePicPath = await FreeLancer.findById(req.user.id,{"profilePicPath":1,"_id":0});
            res.json(JSON.stringify({url:profilePicPath.profilePicPath}));

        }
        catch(err){
            console.log(err);
            return utils.sendError(res,err);
        }
    }


}

module.exports.postPicture = async (req,res) => {
    console.log(req.uploadedFilePath);
    if(req.fileValidationError){
        console.log("file not valid")
        return utils.sendError(res,req.fileValidationError);
    }
    if(req.role=="client"){
        try{
            const client_id = req.user.id;
            await Client.findByIdAndUpdate(client_id,{$set:{
                profilePicPath: req.uploadedFilePath
            }})
        }
        catch(err){
            console.log(err);
            return utils.sendError(res,err);
        }
    }
    else{
        try{
            const freelancer_id = req.user.id;
            await FreeLancer.findByIdAndUpdate(freelancer_id,{$set:{
                profilePicPath: req.uploadedFilePath
            }})
        }
        catch(err){
            console.log(err);
            return utils.sendError(res,err);
        }
    }
    console.log("Posting pic!")   
    res.send("Posted picture successfully")
}